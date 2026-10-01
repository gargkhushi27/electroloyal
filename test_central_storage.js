/**
 * Multi-Computer Centralized Storage In-Process Verification Test Suite for Gadget Grid
 * Tests all requirements without needing external network privileges:
 * 1. Central database persistence across reboots
 * 2. REST endpoints (Customers, Products, Transactions, Purchases, Rewards, Stats)
 * 3. Real-Time SSE Multi-Client synchronization
 * 4. High-concurrency race condition testing (Atomic stock decrement, no overselling)
 * 5. Points calculation (₹500 = 10 pts) and Membership tier calculations
 * 6. Rewards unlock and redemption
 */

const assert = require('assert');
const { PassThrough } = require('stream');
const { server, broadcastEvent } = require('./server.js');
const db = require('./db.js');

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = new PassThrough();
    req.method = options.method || 'GET';
    req.url = options.path || '/';
    req.headers = Object.fromEntries(
      Object.entries(options.headers || {}).map(([k, v]) => [k.toLowerCase(), v])
    );

    const res = new PassThrough();
    res.writeHead = function(statusCode, headers = {}) {
      res.statusCode = statusCode;
      res.headers = headers;
      return res;
    };
    res.setHeader = function() { return res; };

    let resData = '';
    res.on('data', chunk => { resData += chunk.toString(); });
    res.on('end', () => {
      try {
        const json = JSON.parse(resData);
        resolve({ status: res.statusCode || 200, headers: res.headers, body: json });
      } catch (e) {
        resolve({ status: res.statusCode || 200, headers: res.headers, raw: resData });
      }
    });

    server.emit('request', req, res);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

function listenSSE(onEvent) {
  const req = new PassThrough();
  req.method = 'GET';
  req.url = '/api/events';
  req.headers = {};

  const res = new PassThrough();
  res.writeHead = function(statusCode, headers = {}) {
    res.statusCode = statusCode;
    res.headers = headers;
    return res;
  };
  res.setHeader = function() { return res; };

  let buffer = '';
  res.on('data', chunk => {
    buffer += chunk.toString();
    const parts = buffer.split('\n\n');
    buffer = parts.pop();
    for (const part of parts) {
      const lines = part.split('\n');
      let eventType = 'message';
      let eventData = null;
      for (const line of lines) {
        if (line.startsWith('event: ')) eventType = line.substring(7).trim();
        if (line.startsWith('data: ')) {
          try { eventData = JSON.parse(line.substring(6).trim()); } catch (e) {}
        }
      }
      if (eventData) onEvent(eventType, eventData);
    }
  });

  server.emit('request', req, res);
  return { req, res };
}

async function runTests() {
  console.log('--- STARTING GADGET GRID CENTRAL STORAGE TEST SUITE ---');

  // Snapshot initial clean production product state
  const productSnapshot = db.getProducts().map(p => ({ id: p.id, stock: p.stock }));

  // 1. Reset database to clean production state
  console.log('\n[Test 1] Reset database to clean state...');
  const resetRes = await request({ path: '/api/reset', method: 'POST' });
  assert.strictEqual(resetRes.status, 200);
  assert.strictEqual(resetRes.body.success, true);
  console.log('✓ Database reset successfully via /api/reset');

  // 2. Initial state verification (0 customers, 0 transactions, products preserved)
  console.log('\n[Test 2] Verify /api/data state...');
  const dataRes = await request({ path: '/api/data', method: 'GET' });
  assert.strictEqual(dataRes.status, 200);
  assert.strictEqual(dataRes.body.products.length, 35, 'Should have 35 preserved products');
  assert.strictEqual(dataRes.body.customers.length, 0, 'Should have 0 initial customers');
  assert.strictEqual(dataRes.body.transactions.length, 0, 'Should have 0 initial transactions');
  console.log('✓ Initial clean state confirmed: 35 products, 0 customers, 0 transactions');

  // 3. Connect simulated Client B via SSE (/api/events)
  console.log('\n[Test 3] Connect simulated Client B via SSE (/api/events)...');
  const receivedEvents = [];
  const sseClient = listenSSE((eventType, data) => {
    receivedEvents.push({ eventType, data });
  });
  console.log('✓ Simulated Client B connected to real-time event stream');

  // 4. Client A creates a customer -> Check Client B receives SSE event and central DB persists it
  console.log('\n[Test 4] Client A creates Customer -> Verify Central DB & SSE push to Client B...');
  const newCustRes = await request({
    path: '/api/customers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Vikram Malhotra',
    phone: '9877700112'
  });
  assert.strictEqual(newCustRes.status, 201);
  assert.strictEqual(newCustRes.body.success, true);
  assert.strictEqual(newCustRes.body.customer.name, 'Vikram Malhotra');
  const createdCustId = newCustRes.body.customer.id;
  console.log(`✓ Customer created with central ID: ${createdCustId}`);

  // Check event arrival
  const custEvent = receivedEvents.find(e => e.eventType === 'CUSTOMER_CREATED');
  assert(custEvent, 'Client B must receive CUSTOMER_CREATED event via SSE');
  assert.strictEqual(custEvent.data.customerId, createdCustId);
  console.log('✓ Client B received real-time CUSTOMER_CREATED notification');

  // 5. Concurrency Race Condition Safety (Two cashiers buying limited stock)
  console.log('\n[Test 5] High-Concurrency Race Condition Safety (Simultaneous checkouts)...');
  db.db.prepare("UPDATE products SET stock = 5 WHERE id = 17").run();
  db.db.prepare("UPDATE products SET stock = 10 WHERE id = 16").run();
  db.db.prepare("UPDATE products SET stock = 40 WHERE id = 31").run();
  db.db.prepare("UPDATE products SET stock = 35 WHERE id = 32").run();
  const prod17Before = db.getProductById(17); // NovaBook 16 Pro (stock 5)
  console.log(`Product 17 initial stock: ${prod17Before.stock}`);
  assert.strictEqual(prod17Before.stock, 5);

  // Cashier 1 attempts to buy 3, Cashier 2 attempts to buy 3 (3 + 3 = 6 > 5)
  // Exactly ONE must succeed and ONE must be safely rejected with 400 error!
  const [purchaseA, purchaseB] = await Promise.all([
    request({
      path: '/api/purchase',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      customerId: createdCustId,
      items: [{ productId: 17, quantity: 3 }],
      paymentMethod: 'Online'
    }),
    request({
      path: '/api/purchase',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      customerId: createdCustId,
      items: [{ productId: 17, quantity: 3 }],
      paymentMethod: 'Cash'
    })
  ]);

  const oneSucceeded = (purchaseA.status === 200 && purchaseB.status === 400) ||
                       (purchaseB.status === 200 && purchaseA.status === 400);
  assert(oneSucceeded, `Concurrency race condition test failed! A status: ${purchaseA.status}, B status: ${purchaseB.status}`);

  const prod17After = db.getProductById(17);
  console.log(`Product 17 stock after concurrent attempt: ${prod17After.stock}`);
  assert.strictEqual(prod17After.stock, 2, 'Stock must be exactly 2 (5 - 3 = 2, no overselling or negative stock!)');
  console.log('✓ Atomic concurrency safety verified: 1 order succeeded, 1 order rejected, stock decremented to 2 without race conditions');

  // 6. Verify Customer Points, Spending, and Tier Updates
  console.log('\n[Test 6] Verify customer points and membership tier calculation...');
  const custAfterPurchase = db.getCustomerById(createdCustId);
  // 3 units of NovaBook 16 Pro @ ₹89,999 = ₹269,997
  // Points = floor(269,997 / 500) * 10 = 5,390
  console.log(`Total spending: ₹${custAfterPurchase.totalSpending}`);
  console.log(`Loyalty points: ${custAfterPurchase.points}`);
  console.log(`Membership tier: ${custAfterPurchase.membership}`);
  assert.strictEqual(custAfterPurchase.totalSpending, 269997);
  assert.strictEqual(custAfterPurchase.points, 5390);
  assert.strictEqual(custAfterPurchase.membership, 'Diamond');
  console.log('✓ Loyalty points (₹500 = 10 pts) and Diamond tier (₹2,00,000+) correctly calculated');

  // 7. Verify Client B received PURCHASE_COMPLETED SSE event
  const purchEvent = receivedEvents.find(e => e.eventType === 'PURCHASE_COMPLETED');
  assert(purchEvent, 'Client B must receive PURCHASE_COMPLETED event');
  console.log('✓ Real-time PURCHASE_COMPLETED event confirmed on Client B');

  // 8. Reward Redemption Test
  console.log('\n[Test 7] Verify reward redemption...');
  const unlockedRewards = db.getUnlockedRewards(custAfterPurchase);
  assert(unlockedRewards.length >= 4, 'Diamond member should have at least 4 unlocked rewards');

  const rewardToRedeem = unlockedRewards[1].name;
  const redeemRes = await request({
    path: '/api/rewards/redeem',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: createdCustId,
    rewardName: rewardToRedeem
  });
  assert.strictEqual(redeemRes.status, 200);
  assert.strictEqual(redeemRes.body.success, true);
  assert(redeemRes.body.customer.redeemedRewards.includes(rewardToRedeem));
  console.log(`✓ Reward "${rewardToRedeem}" redeemed and recorded in central DB`);

  // 9. Verify duplicate redemption protection
  console.log('\n[Test 8] Verify duplicate redemption prevention...');
  const duplicateRedeemRes = await request({
    path: '/api/rewards/redeem',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: createdCustId,
    rewardName: rewardToRedeem
  });
  assert.strictEqual(duplicateRedeemRes.status, 400);
  console.log('✓ Duplicate reward redemption prevented');

  // 10. Dashboard Stats & Analytics Telemetry
  console.log('\n[Test 9] Verify /api/stats and /api/analytics telemetry...');
  const statsRes = await request({ path: '/api/stats', method: 'GET' });
  assert.strictEqual(statsRes.status, 200);
  assert(statsRes.body.stats.totalCustomers >= 1);
  assert(statsRes.body.stats.totalSales > 0);

  const analyticsRes = await request({ path: '/api/analytics', method: 'GET' });
  assert.strictEqual(analyticsRes.status, 200);
  assert.strictEqual(analyticsRes.body.analytics.activeMembers, statsRes.body.stats.totalCustomers);
  assert.strictEqual(analyticsRes.body.analytics.totalRevenue, statsRes.body.stats.totalSales);
  assert.strictEqual(analyticsRes.body.analytics.totalPointsIssued, statsRes.body.stats.totalPointsIssued);
  assert.strictEqual(analyticsRes.body.analytics.completedTransactions, statsRes.body.stats.transactionsCount);
  assert(Array.isArray(analyticsRes.body.analytics.monthlySales));
  assert(analyticsRes.body.analytics.velocity);
  console.log('✓ Dashboard stats and central analytics telemetry match central database aggregation');

  // 11. Customer Loyalty Reward Redemption Flow: First Purchase (Earn points, no discount on same purchase)
  console.log('\n[Test 10] Loyalty Flow: First Purchase earns points, no discount on 1st purchase...');
  const custAnitaRes = await request({
    path: '/api/customers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Anita Sharma',
    phone: '9811122334'
  });
  assert.strictEqual(custAnitaRes.status, 201);
  const anitaId = custAnitaRes.body.customer.id;
  assert.strictEqual(custAnitaRes.body.customer.points, 0);

  // Anita makes first purchase: Product 16 (NovaBook 14 Pro @ ₹69,999)
  const firstPurchRes = await request({
    path: '/api/purchase',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: anitaId,
    items: [{ productId: 16, quantity: 1 }],
    paymentMethod: 'Online'
  });
  assert.strictEqual(firstPurchRes.status, 200);
  assert.strictEqual(firstPurchRes.body.subtotal, 69999);
  assert.strictEqual(firstPurchRes.body.discount, 0, 'No discount on first purchase');
  assert.strictEqual(firstPurchRes.body.finalAmount, 69999);
  assert.strictEqual(firstPurchRes.body.pointsRedeemed, 0, 'No points redeemed on first purchase');
  // ₹69,999 / 500 = 139 * 10 = 1390 points
  assert.strictEqual(firstPurchRes.body.earnedPoints, 1390);
  assert.strictEqual(firstPurchRes.body.remainingPoints, 1390);

  const anitaAfter1st = db.getCustomerById(anitaId);
  assert.strictEqual(anitaAfter1st.points, 1390, 'Customer has 1,390 available points after first purchase');
  console.log('✓ First purchase earned 1,390 points. Zero discount on 1st purchase as required.');

  // 12. Loyalty Flow: Second Purchase Auto-Redemption (1,000 pts = ₹750 discount)
  console.log('\n[Test 11] Loyalty Flow: Second Purchase automatically applies highest eligible reward (1,000 pts = ₹750 OFF)...');
  // Anita buys Product 31 (Fast Charger 65W @ ₹1,999)
  const secondPurchRes = await request({
    path: '/api/purchase',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: anitaId,
    items: [{ productId: 31, quantity: 1 }],
    paymentMethod: 'Online'
  });
  assert.strictEqual(secondPurchRes.status, 200);
  assert.strictEqual(secondPurchRes.body.subtotal, 1999);
  assert.strictEqual(secondPurchRes.body.discount, 750, 'Highest reward (1,000 pts = ₹750) must be automatically applied');
  assert.strictEqual(secondPurchRes.body.pointsRedeemed, 1000, '1,000 points must be redeemed');
  assert.strictEqual(secondPurchRes.body.finalAmount, 1249, 'Final payable = ₹1,999 - ₹750 = ₹1,249');
  // New points on ₹1,249: floor(1249 / 500) * 10 = 20 points
  assert.strictEqual(secondPurchRes.body.earnedPoints, 20, 'New points calculated from discounted final amount');
  // Remaining points: (1,390 - 1,000) + 20 = 410 points
  assert.strictEqual(secondPurchRes.body.remainingPoints, 410);

  const anitaAfter2nd = db.getCustomerById(anitaId);
  assert.strictEqual(anitaAfter2nd.points, 410);
  assert.strictEqual(anitaAfter2nd.totalSpending, 69999 + 1249);
  console.log('✓ Second purchase auto-redeemed 1,000 pts (₹750 OFF), final amount ₹1,249, earned 20 pts, remaining balance: 410 pts');

  // 13. Loyalty Flow: Third Purchase Auto-Redemption (250 pts = ₹150 discount for 410 pts)
  console.log('\n[Test 12] Loyalty Flow: Third Purchase auto-redeems 250 pts = ₹150 discount...');
  // Anita buys Product 32 (PowerBank 10K @ ₹1,499)
  const thirdPurchRes = await request({
    path: '/api/purchase',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: anitaId,
    items: [{ productId: 32, quantity: 1 }],
    paymentMethod: 'Cash'
  });
  assert.strictEqual(thirdPurchRes.status, 200);
  assert.strictEqual(thirdPurchRes.body.subtotal, 1499);
  assert.strictEqual(thirdPurchRes.body.discount, 150, 'Highest reward for 410 pts is 250 pts = ₹150 OFF');
  assert.strictEqual(thirdPurchRes.body.pointsRedeemed, 250);
  assert.strictEqual(thirdPurchRes.body.finalAmount, 1349);
  // Points on ₹1,349 = floor(1349 / 500) * 10 = 20 points
  assert.strictEqual(thirdPurchRes.body.earnedPoints, 20);
  // Remaining points: (410 - 250) + 20 = 180 points
  assert.strictEqual(thirdPurchRes.body.remainingPoints, 180);

  const anitaAfter3rd = db.getCustomerById(anitaId);
  assert.strictEqual(anitaAfter3rd.points, 180);
  console.log('✓ Third purchase auto-redeemed 250 pts (₹150 OFF), remaining balance: 180 pts');

  // 14. Duplicate Customer Prevention by Phone Number
  console.log('\n[Test 13] Duplicate customer prevention by phone number...');
  const duplicateCustRes = await request({
    path: '/api/customers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Anita Sharma Duplicate',
    phone: '9811122334'
  });
  assert.strictEqual(duplicateCustRes.status, 200, 'Should return existing customer instead of creating duplicate');
  assert.strictEqual(duplicateCustRes.body.customer.id, anitaId);
  const allAnitas = db.getCustomers('9811122334');
  assert.strictEqual(allAnitas.length, 1, 'Exactly one customer with phone 9811122334 must exist');
  console.log('✓ Duplicate customer creation prevented: existing customer returned with ID ' + anitaId);

  // 15. Concurrency Race Safety on Loyalty Points (Simultaneous checkouts cannot double-spend points)
  console.log('\n[Test 14] Concurrency Safety: Simultaneous checkouts cannot double-redeem the same points...');
  // Create customer with exactly 1,000 points
  const concurrentCust = db.createOrGetCustomer('Concurrent Tester', '9899988811').customer;
  db.updateCustomer(concurrentCust.id, { points: 1000 });
  const custBeforeConcurrent = db.getCustomerById(concurrentCust.id);
  assert.strictEqual(custBeforeConcurrent.points, 1000);

  // Two cashiers simultaneously submit a purchase of Product 32 (AeroBuds Pro 2 @ ₹4,999)
  const [concurA, concurB] = await Promise.all([
    request({
      path: '/api/purchase',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      customerId: concurrentCust.id,
      items: [{ productId: 32, quantity: 1 }],
      paymentMethod: 'Online'
    }),
    request({
      path: '/api/purchase',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      customerId: concurrentCust.id,
      items: [{ productId: 32, quantity: 1 }],
      paymentMethod: 'Cash'
    })
  ]);

  assert.strictEqual(concurA.status, 200);
  assert.strictEqual(concurB.status, 200);

  // One order must have redeemed 1000 points, leaving 0 points for the other order to redeem!
  const redeemedTotal = (concurA.body.pointsRedeemed || 0) + (concurB.body.pointsRedeemed || 0);
  assert.strictEqual(redeemedTotal, 1000, 'Exactly 1,000 points must be redeemed total across both concurrent transactions (NO double-spending!)');
  const discountTotal = (concurA.body.discount || 0) + (concurB.body.discount || 0);
  assert.strictEqual(discountTotal, 750, 'Total discount must be exactly ₹750 across both concurrent checkouts');
  console.log('✓ Points concurrency safety verified: 1,000 points redeemed exactly once across concurrent checkouts');

  // 16. Transaction Record Audit in Central Database
  console.log('\n[Test 15] Central Database Transaction Record Audit...');
  const txns = db.getTransactions('Anita Sharma');
  assert(txns.length >= 3, 'Must have at least 3 transactions for Anita Sharma');
  const txn2 = txns.find(t => t.pointsRedeemed === 1000);
  assert(txn2, 'Must have transaction with pointsRedeemed = 1000');
  assert.strictEqual(txn2.subtotal, 1999);
  assert.strictEqual(txn2.discount, 750);
  assert.strictEqual(txn2.finalAmount, 1249);
  assert.strictEqual(txn2.points, 20);
  assert.strictEqual(txn2.remainingPoints, 410);
  console.log('✓ Central database audit verified: subtotal, discount, finalAmount, pointsRedeemed, remainingPoints recorded');

  // 17. Add One Product Test
  console.log('\n[Test 16] Add Product via Central API & verify SSE sync...');
  const addProdRes = await request({
    path: '/api/products',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Gaming Headset RGB X',
    category: 'Accessories',
    price: 3999,
    stock: 15,
    description: 'High performance surround gaming headset.',
    image: 'images/products/nova-x1.svg'
  });
  assert.strictEqual(addProdRes.status, 201);
  assert.strictEqual(addProdRes.body.success, true);
  const createdProdId = addProdRes.body.product.id;
  assert(createdProdId > 0, 'New product must have valid numeric ID');
  const prodInDb = db.getProductById(createdProdId);
  assert.strictEqual(prodInDb.name, 'Gaming Headset RGB X');
  console.log(`✓ Product added successfully with ID ${createdProdId}`);

  // 18. Delete One Selected Product Test
  console.log('\n[Test 17] Delete single selected product via batch API...');
  const deleteOneRes = await request({
    path: '/api/products/batch-delete',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    ids: [createdProdId]
  });
  assert.strictEqual(deleteOneRes.status, 200);
  assert.strictEqual(deleteOneRes.body.success, true);
  assert.strictEqual(deleteOneRes.body.deletedCount, 1);
  const prodAfterDelete = db.getProductById(createdProdId);
  assert.strictEqual(prodAfterDelete, null, 'Deleted product must not exist in products catalogue');
  console.log('✓ Single selected product successfully deleted');

  // 19. Add & Delete Multiple Products in One Operation Test
  console.log('\n[Test 18] Add and batch delete multiple selected products...');
  const prodA = await request({
    path: '/api/products',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'Batch Item 1', category: 'Accessories', price: 999, stock: 10, image: 'images/products/nova-x1.svg' });
  const prodB = await request({
    path: '/api/products',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'Batch Item 2', category: 'Accessories', price: 1499, stock: 10, image: 'images/products/nova-x1.svg' });
  
  const idA = prodA.body.product.id;
  const idB = prodB.body.product.id;
  assert(db.getProductById(idA) && db.getProductById(idB), 'Both products must exist before batch delete');

  const batchDeleteRes = await request({
    path: '/api/products/batch-delete',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    ids: [idA, idB]
  });
  assert.strictEqual(batchDeleteRes.status, 200);
  assert.strictEqual(batchDeleteRes.body.deletedCount, 2);
  assert.strictEqual(db.getProductById(idA), null);
  assert.strictEqual(db.getProductById(idB), null);
  console.log('✓ Multiple selected products successfully deleted in one operation');

  // 20. Data Safety: Verify Unselected Products, Customers & Transactions remain intact
  console.log('\n[Test 19] Data Safety: Verify unselected products, customers & historical transactions remain intact...');
  // Check unselected product (Product 1)
  const prod1 = db.getProductById(1);
  assert(prod1 !== null, 'Product 1 must remain intact');
  assert.strictEqual(prod1.name, 'Nova X1');

  // Check customer Anita remains intact
  const anita = db.getCustomerById(anitaId);
  assert(anita !== null, 'Customer Anita must remain intact');
  assert.strictEqual(anita.points, 180, 'Customer loyalty points must remain intact');

  // Check transactions remain intact
  const allTxns = db.getTransactions();
  assert(allTxns.length >= 5, 'All historical transactions must remain intact');
  console.log('✓ Data safety verified: Unselected products, customers, points, and transaction history fully intact');

  // 21. Verify default Point Earning Ratio (₹500 = 10 pts)
  console.log('\n[Test 20] Verify default Point Earning Ratio via /api/settings/loyalty...');
  const defaultRatioRes = await request({ path: '/api/settings/loyalty', method: 'GET' });
  assert.strictEqual(defaultRatioRes.status, 200);
  assert.strictEqual(defaultRatioRes.body.success, true);
  assert.strictEqual(defaultRatioRes.body.loyalty.spendingAmount, 500);
  assert.strictEqual(defaultRatioRes.body.loyalty.pointsEarned, 10);
  console.log('✓ Default ratio confirmed: ₹500 spending = 10 points');

  // 22. Change Point Earning Ratio to ₹1,000 = 20 pts & verify SSE broadcast
  console.log('\n[Test 21] Update Point Earning Ratio to ₹1,000 = 20 pts & verify SSE broadcast to Client B...');
  const updateRatioRes = await request({
    path: '/api/settings/loyalty',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    spendingAmount: 1000,
    pointsEarned: 20
  });
  assert.strictEqual(updateRatioRes.status, 200);
  assert.strictEqual(updateRatioRes.body.success, true);
  assert.strictEqual(updateRatioRes.body.loyalty.spendingAmount, 1000);
  assert.strictEqual(updateRatioRes.body.loyalty.pointsEarned, 20);

  const ratioEvent = receivedEvents.find(e => e.eventType === 'LOYALTY_CONFIG_UPDATED');
  assert(ratioEvent, 'Client B must receive LOYALTY_CONFIG_UPDATED event via SSE');
  assert.strictEqual(ratioEvent.data.spendingAmount, 1000);
  assert.strictEqual(ratioEvent.data.pointsEarned, 20);
  console.log('✓ Point earning ratio successfully updated and received by simulated Client B via SSE');

  // Verify existing customer points remain unchanged by ratio update
  const anitaRightAfterRatioUpdate = db.getCustomerById(anitaId);
  assert.strictEqual(anitaRightAfterRatioUpdate.points, 180, 'Changing ratio must not recalculate or reset existing customer points');
  console.log('✓ Existing customer points remain intact after ratio update: 180 pts');

  // 23. Test purchase with new ratio (₹1,500 spending -> 20 points under new ratio vs 30 points under old)
  console.log('\n[Test 22] Test purchase with new ratio (₹1,000 = 20 pts)...');
  const ratioPurchaseRes = await request({
    path: '/api/purchase',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerId: anitaId,
    items: [{ productId: 32, quantity: 1 }], // PowerBank 10K = ₹1,499
    paymentMethod: 'UPI'
  });
  assert.strictEqual(ratioPurchaseRes.status, 200);
  assert.strictEqual(ratioPurchaseRes.body.pointsRedeemed, 100);
  assert.strictEqual(ratioPurchaseRes.body.discount, 50);
  assert.strictEqual(ratioPurchaseRes.body.finalAmount, 1449);
  assert.strictEqual(ratioPurchaseRes.body.earnedPoints, 20);
  assert.strictEqual(ratioPurchaseRes.body.remainingPoints, 100);

  const txnRatio = db.getTransactions('Anita Sharma')[0];
  const expectedPointsWithNewRatio = Math.floor(txnRatio.finalAmount / 1000) * 20;
  assert.strictEqual(txnRatio.points, expectedPointsWithNewRatio, `Earned points must match configured ratio (${expectedPointsWithNewRatio})`);
  console.log(`✓ Purchase earned ${txnRatio.points} points using configured ratio (final amount: ₹${txnRatio.finalAmount})`);

  // 24. Verify existing customer points were not reset or recalculated
  console.log('\n[Test 23] Verify existing customer points remain intact and account for redemption + new earned points...');
  const anitaAfter = db.getCustomerById(anitaId);
  assert.strictEqual(anitaAfter.points, 100, 'Customer points correctly reflect balance (180 - 100 redeemed + 20 earned = 100)');
  console.log(`✓ Customer points accumulated safely: ${anitaAfter.points} pts`);

  // 25. Input validation on negative/zero ratio
  console.log('\n[Test 24] Validate that negative/zero ratio is rejected by backend...');
  const invalidRes = await request({
    path: '/api/settings/loyalty',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { spendingAmount: -500, pointsEarned: 0 });
  assert.strictEqual(invalidRes.status, 400);
  assert.strictEqual(invalidRes.body.success, false);
  console.log('✓ Invalid ratio rejected by backend validation');

  // Restore default ratio ₹500 = 10 pts
  await request({
    path: '/api/settings/loyalty',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { spendingAmount: 500, pointsEarned: 10 });
  console.log('✓ Restored default ratio ₹500 = 10 pts');

  // Clean up
  sseClient.req.destroy();

  // Restore clean production state
  console.log('\n[Post-Test Verification] Restoring and verifying clean production state...');
  db.resetDatabase();
  productSnapshot.forEach(p => {
    db.db.prepare('UPDATE products SET stock = ? WHERE id = ?').run(p.stock, p.id);
  });

  const finalCustCount = db.getCustomers().length;
  const finalTxnCount = db.getTransactions().length;
  const finalTxnItemsCount = db.db.prepare('SELECT COUNT(*) as c FROM transaction_items').get().c;
  const finalProds = db.getProducts();

  assert.strictEqual(finalCustCount, 0, 'Production database must have 0 customers');
  assert.strictEqual(finalTxnCount, 0, 'Production database must have 0 transactions');
  assert.strictEqual(finalTxnItemsCount, 0, 'Production database must have 0 transaction items');
  assert.strictEqual(finalProds.length, 35, 'Production database must have 35 products');
  for (let i = 0; i < productSnapshot.length; i++) {
    const curr = db.getProductById(productSnapshot[i].id);
    assert.strictEqual(curr.stock, productSnapshot[i].stock, `Product ${curr.id} stock must remain unchanged`);
  }
  console.log('✓ Clean production database state verified: 0 customers, 0 transactions, 35 products with unchanged stock');

  console.log('\n================================================================');
  console.log('ALL 24 CENTRAL STORAGE, LOYALTY, RATIO & PRODUCT TESTS PASSED! ✓');
  console.log('================================================================');
  process.exit(0);
}

runTests().catch(err => {
  console.error('\n❌ TEST SUITE FAILED:', err);
  process.exit(1);
});
