/**
 * Central Server & API for Gadget Grid
 * Multi-Computer Data Server with Real-Time SSE Sync
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const db = require('./db.js');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Active SSE client connections for real-time synchronization
const sseClients = new Set();
let dataVersion = Date.now();

function broadcastEvent(eventType, payload = {}) {
  dataVersion = Date.now();
  const eventPayload = JSON.stringify({ type: eventType, ...payload, version: dataVersion, timestamp: Date.now() });
  // Write both named event and generic message for universal browser EventSource compatibility
  const message = `event: ${eventType}\ndata: ${eventPayload}\n\n` +
                  `data: ${eventPayload}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(message);
    } catch (e) {
      sseClients.delete(res);
    }
  }
}

// Heartbeat every 25s to keep connections alive
setInterval(() => {
  for (const res of sseClients) {
    try {
      res.write(': ping\n\n');
    } catch (e) {
      sseClients.delete(res);
    }
  }
}, 25000).unref();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-cache'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res, parsedUrl) {
  let pathname = parsedUrl.pathname;
  if (pathname === '/') pathname = '/index.html';

  const safePath = path.normalize(path.join(__dirname, pathname));
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('File Not Found');
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isNoCache = (ext === '.html' || ext === '.js' || ext === '.css' || ext === '.json');

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': isNoCache ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600',
      'Pragma': isNoCache ? 'no-cache' : 'public',
      'Expires': isNoCache ? '0' : '3600'
    });

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const host = (req.headers && req.headers.host) ? req.headers.host : 'localhost';
  const parsedUrl = new URL(req.url, `http://${host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // -------------------------------------------------------------------------
  // REST API ROUTING
  // -------------------------------------------------------------------------

  if (pathname.startsWith('/api/')) {
    try {
      // 1. SSE Real-Time Sync Stream
      if (pathname === '/api/events' && method === 'GET') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'X-Accel-Buffering': 'no'
        });
        res.write(`data: ${JSON.stringify({ type: 'CONNECTED', version: dataVersion })}\n\n`);
        sseClients.add(res);

        req.on('close', () => {
          sseClients.delete(res);
        });
        return;
      }

      // 2. Health & Version Check
      if (pathname === '/api/health' && method === 'GET') {
        return sendJson(res, 200, { status: 'ok', version: dataVersion, time: Date.now() });
      }

      // 3. Central Comprehensive State (Single Roundtrip)
      if (pathname === '/api/data' && method === 'GET') {
        const customers = db.getCustomers();
        const products = db.getProducts();
        const transactions = db.getTransactions();
        const stats = db.getStats();
        return sendJson(res, 200, {
          success: true,
          version: dataVersion,
          customers,
          products,
          transactions,
          stats,
          loyaltyConfig: db.getLoyaltyConfig()
        });
      }

      // 4. Customers API
      if (pathname === '/api/customers' && method === 'GET') {
        const q = parsedUrl.searchParams.get('q') || '';
        const customers = db.getCustomers(q);
        return sendJson(res, 200, { success: true, customers });
      }

      if (pathname === '/api/customers' && method === 'POST') {
        const body = await parseJsonBody(req);
        const result = db.createOrGetCustomer(body);
        if (!result.isExisting) {
          broadcastEvent('CUSTOMER_CREATED', { customerId: result.customer.id });
        }
        const statusCode = result.isExisting ? 200 : 201;
        return sendJson(res, statusCode, { success: true, ...result });
      }

      if (pathname.startsWith('/api/customers/') && method === 'GET') {
        const id = pathname.replace('/api/customers/', '');
        const customer = db.getCustomerById(id);
        if (!customer) return sendJson(res, 404, { error: 'Customer not found' });
        return sendJson(res, 200, { success: true, customer });
      }

      if (pathname.startsWith('/api/customers/') && method === 'PUT') {
        const id = pathname.replace('/api/customers/', '');
        const body = await parseJsonBody(req);
        const updated = db.updateCustomer(id, body);
        broadcastEvent('CUSTOMER_UPDATED', { customerId: id });
        return sendJson(res, 200, { success: true, customer: updated });
      }

      if (pathname.startsWith('/api/customers/') && method === 'DELETE') {
        const id = pathname.replace('/api/customers/', '');
        db.deleteCustomer(id);
        broadcastEvent('CUSTOMER_DELETED', { customerId: id });
        return sendJson(res, 200, { success: true, id });
      }

      // 5. Products API
      if (pathname === '/api/products' && method === 'GET') {
        const products = db.getProducts();
        return sendJson(res, 200, { success: true, products });
      }

      if (pathname === '/api/products' && method === 'POST') {
        const body = await parseJsonBody(req);
        const created = db.createProduct(body);
        broadcastEvent('PRODUCT_CREATED', { productId: created.id });
        return sendJson(res, 201, { success: true, product: created });
      }

      if (pathname.startsWith('/api/products/') && method === 'PUT') {
        const id = parseInt(pathname.replace('/api/products/', ''), 10);
        const body = await parseJsonBody(req);
        const updated = db.updateProduct(id, body);
        broadcastEvent('PRODUCT_UPDATED', { productId: id });
        return sendJson(res, 200, { success: true, product: updated });
      }

      if (pathname.startsWith('/api/products/') && method === 'DELETE') {
        const id = parseInt(pathname.replace('/api/products/', ''), 10);
        db.deleteProduct(id);
        broadcastEvent('PRODUCT_DELETED', { productId: id });
        return sendJson(res, 200, { success: true, id });
      }

      // Batch Delete Products API
      if ((pathname === '/api/products/batch-delete' || pathname === '/api/products/delete-batch') && method === 'POST') {
        const body = await parseJsonBody(req);
        const { ids } = body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return sendJson(res, 400, { error: 'Please provide an array of product IDs to delete.' });
        }
        const result = db.deleteProducts(ids);
        broadcastEvent('PRODUCTS_DELETED', { deletedIds: result.deletedIds, count: result.deletedCount });
        return sendJson(res, 200, result);
      }

      if (pathname === '/api/products' && method === 'DELETE') {
        const body = await parseJsonBody(req);
        const { ids } = body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return sendJson(res, 400, { error: 'Please provide an array of product IDs to delete.' });
        }
        const result = db.deleteProducts(ids);
        broadcastEvent('PRODUCTS_DELETED', { deletedIds: result.deletedIds, count: result.deletedCount });
        return sendJson(res, 200, result);
      }

      // 6. Transactions API
      if (pathname === '/api/transactions' && method === 'GET') {
        const q = parsedUrl.searchParams.get('q') || '';
        const transactions = db.getTransactions(q);
        return sendJson(res, 200, { success: true, transactions });
      }

      // 7. Atomic Multi-Computer Purchase API
      if (pathname === '/api/purchase' && method === 'POST') {
        const body = await parseJsonBody(req);
        const result = db.executePurchaseAtomic(body);
        broadcastEvent('PURCHASE_COMPLETED', {
          transactionId: result.transaction.transactionId,
          customerId: result.customer.id
        });
        return sendJson(res, 200, result);
      }

      // 8. Reward Redemption API
      if (pathname === '/api/rewards/redeem' && method === 'POST') {
        const body = await parseJsonBody(req);
        const { customerId, rewardName } = body;
        const updatedCustomer = db.redeemReward(customerId, rewardName);
        broadcastEvent('REWARD_REDEEMED', { customerId, rewardName });
        return sendJson(res, 200, { success: true, customer: updatedCustomer });
      }

      // 9. Dashboard Statistics API
      if (pathname === '/api/stats' && method === 'GET') {
        const stats = db.getStats();
        return sendJson(res, 200, { success: true, stats });
      }

      // 10. Loyalty Settings API
      if (pathname === '/api/settings/loyalty' && method === 'GET') {
        const config = db.getLoyaltyConfig();
        return sendJson(res, 200, { success: true, loyalty: config });
      }

      if ((pathname === '/api/settings/loyalty' || pathname === '/api/config/loyalty') && (method === 'PUT' || method === 'POST')) {
        const body = await parseJsonBody(req);
        const { spendingAmount, pointsEarned } = body;
        if (!spendingAmount || !pointsEarned || Number(spendingAmount) <= 0 || Number(pointsEarned) <= 0) {
          return sendJson(res, 400, { success: false, error: 'Spending amount and points must be positive numbers.' });
        }
        const updated = db.updateLoyaltyConfig(spendingAmount, pointsEarned);
        dataVersion++;
        broadcastEvent('LOYALTY_CONFIG_UPDATED', updated);
        return sendJson(res, 200, { success: true, loyalty: updated });
      }

      // 11. Database Reset API
      if (pathname === '/api/reset' && method === 'POST') {
        db.resetDatabase();
        broadcastEvent('DATA_RESET', {});
        return sendJson(res, 200, { success: true });
      }

      return sendJson(res, 404, { error: 'Endpoint not found' });

    } catch (err) {
      console.error(`API Error on ${method} ${pathname}:`, err.message);
      return sendJson(res, 400, { success: false, error: err.message });
    }
  }

  // -------------------------------------------------------------------------
  // STATIC FILE SERVING
  // -------------------------------------------------------------------------
  serveStatic(req, res, parsedUrl);
});

// Start the Central Server
if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`Gadget Grid Central Database Server running!`);
    console.log(`Local Access:   http://localhost:${PORT}`);
    console.log(`Network Access: http://${HOST}:${PORT}`);
    console.log(`SQLite DB:      ${db.DB_PATH}`);
    console.log(`Multi-Computer Real-Time Sync (SSE): Enabled`);
    console.log(`=======================================================`);
  });
}

module.exports = { server, broadcastEvent };
