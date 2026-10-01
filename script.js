/* ==========================================================================
   Gadget Grid - Electronics Retail Customer Loyalty Management System
   Vanilla JavaScript Application Logic
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. GLOBAL STATE & CONSTANTS
// --------------------------------------------------------------------------

// Dynamic Relative API URL Base (always points to the host serving the app)
const API_BASE = (typeof window !== "undefined" && window.location && window.location.origin && window.location.origin !== "null")
  ? window.location.origin
  : "";

// Default Product List (35 Fictional Electronics Products)
const DEFAULT_PRODUCTS = [
  { id: 1, name: "Nova X1", category: "Smartphones", price: 24999, image: "images/products/nova-x1.svg", stock: 25, description: "Sleek budget smartphone with 6.5-inch AMOLED screen and dual camera.", specifications: ["6.5 inch AMOLED Display", "128 GB Storage", "8 GB RAM", "4500 mAh Battery"], eligibleMembership: "Bronze", membershipOffer: "5% OFF for Silver members" },
  { id: 2, name: "Nova X1 Pro", category: "Smartphones", price: 34999, image: "images/products/nova-x1-pro.svg", stock: 20, description: "Flagship performance with 108MP camera and ultra-fast charging.", specifications: ["6.7 inch 120Hz Display", "256 GB Storage", "12 GB RAM", "5000 mAh Battery"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 3, name: "PixelEdge 8", category: "Smartphones", price: 42999, image: "images/products/pixeledge-8.svg", stock: 15, description: "Clean Android experience with advanced AI photography capabilities.", specifications: ["6.4 inch OLED Display", "128 GB Storage", "8 GB RAM", "4600 mAh Battery"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 4, name: "PixelEdge 8 Pro", category: "Smartphones", price: 59999, image: "images/products/pixeledge-8-pro.svg", stock: 10, description: "Ultimate photography power with telephoto lens and titanium frame.", specifications: ["6.7 inch LTPO OLED", "512 GB Storage", "12 GB RAM", "5050 mAh Battery"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },
  { id: 5, name: "SoundPods Lite", category: "Earbuds & Headphones", price: 1499, image: "images/products/soundpods-lite.svg", stock: 50, description: "Lightweight true wireless earbuds with deep bass and 20h playback.", specifications: ["Bluetooth 5.3", "20 Hours Battery", "IPX4 Water Resistance", "USB-C Fast Charge"], eligibleMembership: "Bronze", membershipOffer: "Free Carrying Case" },
  { id: 6, name: "SoundPods Pro", category: "Earbuds & Headphones", price: 2999, image: "images/products/soundpods-pro.svg", stock: 35, description: "Active Noise Cancellation earbuds with HD sound clarity.", specifications: ["Active Noise Cancellation", "30 Hours Battery", "Wireless Charging Case", "Dual Mics"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 7, name: "AirBeat Max", category: "Earbuds & Headphones", price: 4999, image: "images/products/airbeat-max.svg", stock: 25, description: "Over-ear wireless headphones with cushioned earcups and deep bass.", specifications: ["40mm Dynamic Drivers", "40 Hours Battery", "Foldable Design", "Aux Cable Included"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 8, name: "AirBeat Max Pro", category: "Earbuds & Headphones", price: 7999, image: "images/products/airbeat-max-pro.svg", stock: 12, description: "Studio-grade wireless headphones with lossless spatial audio support.", specifications: ["Spatial Audio", "Hybrid ANC", "50 Hours Battery", "Premium Memory Foam"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 9, name: "FitWatch S", category: "Smartwatches", price: 2999, image: "images/products/fitwatch-s.svg", stock: 30, description: "Fitness tracker watch with SpO2, Heart Rate, and 14-day battery.", specifications: ["1.4 inch HD Display", "14 Day Battery Life", "50+ Sports Modes", "5ATM Waterproof"], eligibleMembership: "Bronze", membershipOffer: "Extra Strap Included" },
  { id: 10, name: "FitWatch Pro", category: "Smartwatches", price: 5999, image: "images/products/fitwatch-pro.svg", stock: 22, description: "Smartwatch with Bluetooth calling, GPS tracking, and AMOLED screen.", specifications: ["1.78 inch AMOLED Screen", "Built-in GPS", "Bluetooth Calling", "Heart & Sleep Tracking"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 11, name: "SmartWatch Ultra", category: "Smartwatches", price: 9999, image: "images/products/smartwatch-ultra.svg", stock: 15, description: "Rugged smartwatch with sapphire glass and multi-sport endurance metrics.", specifications: ["Rugged Titanium Alloy Case", "Dual-Band GPS", "100m Water Resistance", "Off-line Maps"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 12, name: "Boom Mini", category: "Speakers", price: 1999, image: "images/products/boom-mini.svg", stock: 40, description: "Pocket-sized Bluetooth speaker with surprising bass output.", specifications: ["5W RMS Output", "12 Hours Playtime", "IP67 Dust & Waterproof", "Carabiner Clip"], eligibleMembership: "Bronze", membershipOffer: "Basic offer eligible" },
  { id: 13, name: "Boom 360", category: "Speakers", price: 3999, image: "images/products/boom-360.svg", stock: 20, description: "360-degree room-filling sound speaker with party light effects.", specifications: ["20W Surround Audio", "RGB Light Ring", "Party Connect Mode", "18 Hours Battery"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 14, name: "Boom Max", category: "Speakers", price: 6999, image: "images/products/boom-max.svg", stock: 15, description: "Heavy bass outdoor speaker with built-in powerbank capability.", specifications: ["60W Output", "Powerbank USB Port", "Dual Passive Radiators", "24 Hours Playtime"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 15, name: "NovaBook 14", category: "Laptops", price: 49999, image: "images/products/novabook-14.svg", stock: 10, description: "Ultra-thin aluminum laptop powered by 12th Gen Quad-Core processor.", specifications: ["14 inch Full HD IPS", "512 GB NVMe SSD", "16 GB DDR5 RAM", "Intel i5 Processor"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 16, name: "NovaBook 14 Pro", category: "Laptops", price: 69999, image: "images/products/novabook-14-pro.svg", stock: 8, description: "Professional creator laptop with 2.8K OLED screen and dedicated GPU.", specifications: ["14 inch 2.8K OLED 90Hz", "1 TB NVMe SSD", "16 GB RAM", "RTX 3050 Graphics"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },
  { id: 17, name: "NovaBook 16 Pro", category: "Laptops", price: 89999, image: "images/products/novabook-16-pro.svg", stock: 5, description: "Ultimate workstation laptop with 16-inch display and octa-core processor.", specifications: ["16 inch 165Hz QHD+", "2 TB NVMe SSD", "32 GB RAM", "RTX 4060 Graphics"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },
  { id: 18, name: "Tab Lite", category: "Tablets", price: 14999, image: "images/products/tab-lite.svg", stock: 25, description: "10.1-inch entertainment tablet with quad speakers.", specifications: ["10.1 inch Full HD", "64 GB Storage", "4 GB RAM", "7000 mAh Battery"], eligibleMembership: "Bronze", membershipOffer: "Free Flip Case" },
  { id: 19, name: "Tab Air", category: "Tablets", price: 24999, image: "images/products/tab-air.svg", stock: 18, description: "Sleek lightweight tablet with stylus support for students and creative work.", specifications: ["10.9 inch 2K Display", "128 GB Storage", "6 GB RAM", "Stylus Pen Included"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 20, name: "Tab Pro", category: "Tablets", price: 39999, image: "images/products/tab-pro.svg", stock: 10, description: "High-performance tablet with 120Hz display and laptop-class chip.", specifications: ["11.5 inch 120Hz OLED", "256 GB Storage", "8 GB RAM", "Keyboard Dock Compatible"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 21, name: "KeyLite Wireless", category: "Keyboards", price: 1499, image: "images/products/keylite-wireless.svg", stock: 35, description: "Compact quiet wireless membrane keyboard with multi-device Bluetooth.", specifications: ["Bluetooth & 2.4GHz Receiver", "Low Profile Keys", "2 Year Battery Life"], eligibleMembership: "Bronze", membershipOffer: "Standard Warranty" },
  { id: 22, name: "KeyPro Mechanical", category: "Keyboards", price: 3499, image: "images/products/keypro-mechanical.svg", stock: 20, description: "Tenkeyless mechanical gaming keyboard with hot-swappable tactile switches.", specifications: ["Hot-Swappable Switches", "TKL Layout", "Detachable Type-C Cable"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 23, name: "KeyPro RGB", category: "Keyboards", price: 5499, image: "images/products/keypro-rgb.svg", stock: 14, description: "Full-size mechanical keyboard with per-key RGB backlighting and volume dial.", specifications: ["Custom RGB Lighting", "Dedicated Media Controls", "PBT Double-shot Keycaps"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 24, name: "Mouse Lite", category: "Mice", price: 799, image: "images/products/mouse-lite.svg", stock: 45, description: "Silent click ergonomic wireless mouse for daily office tasks.", specifications: ["1600 DPI Sensor", "Silent Switches", "18 Month Battery"], eligibleMembership: "Bronze", membershipOffer: "Standard Warranty" },
  { id: 25, name: "Mouse Pro", category: "Mice", price: 1499, image: "images/products/mouse-pro.svg", stock: 30, description: "Ergonomic productivity mouse with hyper-fast scroll wheel.", specifications: ["4000 DPI Sensor", "Ergonomic Thumb Rest", "Multi-Device Switching"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 26, name: "Gaming Mouse X", category: "Mice", price: 2999, image: "images/products/gaming-mouse-x.svg", stock: 22, description: "Ultra-lightweight gaming mouse with 26K DPI optical sensor.", specifications: ["59g Lightweight", "26,000 DPI Sensor", "PTFE Feet & Paracord Cable"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 27, name: "GamePad S", category: "Gaming", price: 2999, image: "images/products/gamepad-s.svg", stock: 25, description: "Wireless game controller compatible with PC, Android, and consoles.", specifications: ["Dual Vibration Motors", "Hall Effect Joysticks", "15 Hours Battery"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 28, name: "GamePad Pro", category: "Gaming", price: 4999, image: "images/products/gamepad-pro.svg", stock: 15, description: "Pro controller with customizable back paddles and mechanical tactile buttons.", specifications: ["4 Remappable Back Paddles", "Adjustable Trigger Locks", "RGB Indicator"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 29, name: "Gaming Headset X", category: "Gaming", price: 3999, image: "images/products/gaming-headset-x.svg", stock: 18, description: "7.1 Surround sound gaming headset with noise-canceling boom mic.", specifications: ["50mm Neodymium Drivers", "7.1 Virtual Surround Sound", "Cooling Gel Earpads"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 30, name: "Fast Charger 25W", category: "Accessories", price: 999, image: "images/products/fast-charger-25w.svg", stock: 60, description: "USB-C PD fast wall charger for phones and accessories.", specifications: ["25W Power Delivery", "Compact GaN Tech", "Multi-layer Safety"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 31, name: "Fast Charger 65W", category: "Accessories", price: 1999, image: "images/products/fast-charger-65w.svg", stock: 40, description: "Dual-port USB-C fast charger for laptops, tablets, and phones simultaneously.", specifications: ["65W Dual Type-C", "GaN Fast Charge", "Universal Compatibility"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 32, name: "PowerBank 10K", category: "Accessories", price: 1499, image: "images/products/powerbank-10k.svg", stock: 35, description: "Compact 10,000 mAh portable powerbank with 22.5W fast output.", specifications: ["10,000 mAh Capacity", "22.5W Fast Charge", "Dual USB + Type-C"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 33, name: "PowerBank 20K", category: "Accessories", price: 2499, image: "images/products/powerbank-20k.svg", stock: 25, description: "High-capacity 20,000 mAh powerbank capable of charging laptops.", specifications: ["20,000 mAh Capacity", "45W Power Delivery", "LED Digital Display"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 34, name: "USB-C Hub", category: "Accessories", price: 1999, image: "images/products/usbc-hub.svg", stock: 30, description: "7-in-1 USB-C multiport adapter with 4K HDMI, USB 3.0, and 100W PD.", specifications: ["4K@60Hz HDMI", "100W Pass-Through PD", "SD/TF Card Reader"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 35, name: "Wireless Charging Pad", category: "Accessories", price: 1499, image: "images/products/wireless-charging-pad.svg", stock: 25, description: "Fast 15W Qi wireless charging pad with non-slip rubber surface.", specifications: ["15W Qi Fast Charge", "LED Charging Indicator", "Foreign Object Detection"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" }
];

const INITIAL_CUSTOMERS = [];
const INITIAL_TRANSACTIONS = [];

let customers = [];
let products = [];
let transactions = [];
let cart = [];
let currentSelectedCustomerId = null;
let currentSelectedProductId = null;

// --------------------------------------------------------------------------
// 2. LOCAL STORAGE MANAGEMENT
// --------------------------------------------------------------------------

function loadData() {
  var storedCust = localStorage.getItem("gadgetgrid_customers") || localStorage.getItem("electroloyal_customers");
  var storedProd = localStorage.getItem("gadgetgrid_products") || localStorage.getItem("electroloyal_products");
  var storedTxn = localStorage.getItem("gadgetgrid_transactions") || localStorage.getItem("electroloyal_transactions");
  var storedCart = localStorage.getItem("gadgetgrid_cart") || localStorage.getItem("electroloyal_cart");
  var storedLoyalty = localStorage.getItem("gadgetgrid_loyalty_config");
  if (storedLoyalty) {
    try {
      var parsedL = JSON.parse(storedLoyalty);
      if (parsedL.spendingAmount > 0 && parsedL.pointsEarned > 0) {
        loyaltyConfig = parsedL;
      }
    } catch (e) {}
  }

  if (storedCust) { customers = JSON.parse(storedCust); } else { customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS)); saveCustomers(); }
  if (storedProd) { products = JSON.parse(storedProd); } else { products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)); saveProducts(); }

  var needsSave = false;
  for (var i = 0; i < products.length; i++) {
    if (!products[i].productId) { products[i].productId = "PRD-" + String(i + 1).padStart(6, '0'); needsSave = true; }
  }
  if (needsSave) saveProducts();

  if (storedTxn) { transactions = JSON.parse(storedTxn); } else { transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS)); saveTransactions(); }
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      cart = [];
    }
  } else {
    cart = [];
  }

  // Ensure all cart items have full product fields populated
  cart.forEach(function(item) {
    item.quantity = parseInt(item.quantity, 10) || 1;
    var p = products.find(function(prod) { return String(prod.id) === String(item.productId || item.id); });
    if (p) {
      item.productId = p.id;
      item.id = p.id;
      item.name = item.name || p.name;
      item.productName = item.productName || p.name;
      item.price = item.price || p.price;
      item.image = item.image || p.image;
    }
  });
}

function saveCustomers() { localStorage.setItem("gadgetgrid_customers", JSON.stringify(customers)); }
function saveProducts() { localStorage.setItem("gadgetgrid_products", JSON.stringify(products)); }
function saveTransactions() { localStorage.setItem("gadgetgrid_transactions", JSON.stringify(transactions)); }
function saveCart() { localStorage.setItem("gadgetgrid_cart", JSON.stringify(cart)); }
function saveDataAll() { saveCustomers(); saveProducts(); saveTransactions(); saveCart(); }

function renderActiveView() {
  var activePage = document.querySelector(".page-view.active");
  var pageId = activePage ? activePage.id.replace("view-", "") : "dashboard";
  if (pageId === "dashboard") renderDashboard();
  else if (pageId === "customers") renderCustomersTable();
  else if (pageId === "products") renderProductsGrid();
  else if (pageId === "product-detail" && currentSelectedProductId) viewProductDetail(currentSelectedProductId);
  else if (pageId === "customer-profile" && currentSelectedCustomerId) viewCustomerProfile(currentSelectedCustomerId);
  else if (pageId === "rewards") renderRewardsPage();
  else if (pageId === "transactions") renderTransactionsTable();
  else if (pageId === "analytics") renderAnalyticsView();
  else renderDashboard();

  // Keep dashboard KPI counts updated in memory/background
  var elCust = document.getElementById("dashTotalCustomers");
  if (elCust) elCust.textContent = customers.length;
}

function syncFromServer(callback) {
  if (typeof fetch !== "function") {
    if (typeof callback === "function") callback(false);
    return;
  }
  fetch(API_BASE + '/api/data', { cache: 'no-cache' })
    .then(function(res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function(data) {
      if (data && data.success) {
        if (Array.isArray(data.customers)) {
          customers = data.customers;
          saveCustomers();
        }
        if (Array.isArray(data.products)) {
          products = data.products;
          saveProducts();
        }
        if (Array.isArray(data.transactions)) {
          transactions = data.transactions;
          saveTransactions();
        }
        if (Array.isArray(cart) && cart.length > 0) {
          cart.forEach(function(item) {
            var p = products.find(function(prod) { return String(prod.id) === String(item.productId || item.id); });
            if (p) {
              item.name = p.name;
              item.productName = p.name;
              item.price = p.price;
              item.image = p.image;
            }
          });
          saveCart();
          updateCartBadge();
        }
        if (data.loyaltyConfig) {
          loyaltyConfig = data.loyaltyConfig;
          localStorage.setItem("gadgetgrid_loyalty_config", JSON.stringify(loyaltyConfig));
          updateLoyaltySettingsUI();
        }
        renderActiveView();
        if (typeof callback === "function") callback(true);
      }
    })
    .catch(function(err) {
      if (typeof callback === "function") callback(false, err);
    });
}

var sseConnection = null;
function initRealTimeSync() {
  if (typeof EventSource === "undefined") return;
  if (sseConnection) return;

  try {
    sseConnection = new EventSource(API_BASE + '/api/events');
    sseConnection.onmessage = function(event) {
      try {
        var evt = JSON.parse(event.data);
        if (evt.type === 'CONNECTED') return;
        syncFromServer();
      } catch (e) {
        syncFromServer();
      }
    };
    sseConnection.addEventListener('PURCHASE_COMPLETED', function() { syncFromServer(); });
    sseConnection.addEventListener('CUSTOMER_CREATED', function() { syncFromServer(); });
    sseConnection.addEventListener('CUSTOMER_UPDATED', function() { syncFromServer(); });
    sseConnection.addEventListener('CUSTOMER_DELETED', function() { syncFromServer(); });
    sseConnection.addEventListener('PRODUCT_CREATED', function() { syncFromServer(); });
    sseConnection.addEventListener('PRODUCT_UPDATED', function() { syncFromServer(); });
    sseConnection.addEventListener('PRODUCT_DELETED', function() { syncFromServer(); });
    sseConnection.addEventListener('PRODUCTS_DELETED', function() { syncFromServer(); });
    sseConnection.addEventListener('REWARD_REDEEMED', function() { syncFromServer(); });
    sseConnection.addEventListener('DATA_RESET', function() { syncFromServer(); });
    sseConnection.addEventListener('LOYALTY_CONFIG_UPDATED', function(e) {
      try {
        var parsed = JSON.parse(e.data);
        var cfg = parsed.data || parsed;
        if (cfg && cfg.spendingAmount && cfg.pointsEarned) {
          loyaltyConfig = { spendingAmount: Number(cfg.spendingAmount), pointsEarned: Number(cfg.pointsEarned) };
          localStorage.setItem("gadgetgrid_loyalty_config", JSON.stringify(loyaltyConfig));
          updateLoyaltySettingsUI();
          renderActiveView();
        }
      } catch(err) {
        syncFromServer();
      }
    });

    sseConnection.onerror = function() {
      try { sseConnection.close(); } catch(e) {}
      sseConnection = null;
      setTimeout(initRealTimeSync, 3000);
    };
  } catch (err) {
    console.warn("Real-time SSE setup error:", err);
  }

  // Periodic polling fallback every 3 seconds for continuous multi-device sync
  setInterval(function() {
    if (document.visibilityState === "visible") {
      syncFromServer();
    }
  }, 3000);

  // Focus, visibility, and network reconnect triggers
  window.addEventListener('focus', function() { syncFromServer(); });
  window.addEventListener('pageshow', function() { syncFromServer(); });
  window.addEventListener('online', function() { syncFromServer(); });
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) syncFromServer();
  });
}

// --------------------------------------------------------------------------
// 3. CORE BUSINESS CALCULATIONS & RULES
// --------------------------------------------------------------------------

var loyaltyConfig = { spendingAmount: 500, pointsEarned: 10 };

function calculatePoints(amount) {
  if (!amount || amount <= 0) return 0;
  var spend = (loyaltyConfig && loyaltyConfig.spendingAmount > 0) ? Number(loyaltyConfig.spendingAmount) : 500;
  var pts = (loyaltyConfig && loyaltyConfig.pointsEarned > 0) ? Number(loyaltyConfig.pointsEarned) : 10;
  if (amount < spend) return 0;
  return Math.floor(amount / spend) * pts;
}

function calculateMembership(totalSpending) {
  var spending = totalSpending || 0;
  if (spending >= 200000) return "Diamond";
  if (spending >= 100000) return "Gold";
  if (spending >= 30000) return "Silver";
  return "Bronze";
}

function calculateRewardDiscount(availablePoints, subtotal) {
  var points = Math.max(0, parseInt(availablePoints, 10) || 0);
  var pointsRedeemed = 0;
  var discount = 0;

  if (points >= 1000) {
    pointsRedeemed = 1000;
    discount = 750;
  } else if (points >= 500) {
    pointsRedeemed = 500;
    discount = 350;
  } else if (points >= 250) {
    pointsRedeemed = 250;
    discount = 150;
  } else if (points >= 100) {
    pointsRedeemed = 100;
    discount = 50;
  }

  if (typeof subtotal === "number" && discount > subtotal) {
    discount = subtotal;
  }

  return { pointsRedeemed: pointsRedeemed, discount: discount };
}

function getUnlockedRewards(customer) {
  if (!customer) return [];
  var spending = customer.totalSpending || 0;
  var membership = customer.membership || calculateMembership(spending);
  var rewards = [{ id: "rw-bronze", name: "Birthday Reward (5% OFF)", tier: "Bronze", description: "Special Birthday reward coupon", status: "Available" }];
  if (spending >= 30000 || membership === "Silver" || membership === "Gold" || membership === "Diamond") {
    rewards.push({ id: "rw-silver", name: "Silver Special Offer (\u20b9250 Voucher)", tier: "Silver", description: "5% discount on selected products", status: "Available" });
  }
  if (spending >= 100000 || membership === "Gold" || membership === "Diamond") {
    rewards.push({ id: "rw-gold", name: "Gold Free Gift Package", tier: "Gold", description: "Free accessory gift box on qualifying purchase", status: "Available" });
  }
  if (spending >= 200000 || membership === "Diamond") {
    rewards.push({ id: "rw-diamond-1", name: "Diamond Premium Gift & VIP Access", tier: "Diamond", description: "15% off + VIP launch invitations", status: "Available" });
    rewards.push({ id: "rw-diamond-2", name: "Exclusive Product Launch Access", tier: "Diamond", description: "VIP early access to reserve new smartphone & laptop launches", status: "Available" });
  }
  return rewards;
}

function generateNextCustomerId() {
  if (customers.length === 0) return "ELC-000001";
  var maxIdNum = 0;
  for (var i = 0; i < customers.length; i++) {
    var numPart = parseInt(customers[i].id.replace("ELC-", ""), 10);
    if (!isNaN(numPart) && numPart > maxIdNum) maxIdNum = numPart;
  }
  return "ELC-" + String(maxIdNum + 1).padStart(6, '0');
}

function generateNextTransactionId() {
  if (transactions.length === 0) return "TXN-000001";
  var maxIdNum = 0;
  for (var i = 0; i < transactions.length; i++) {
    var numPart = parseInt(transactions[i].transactionId.replace("TXN-", ""), 10);
    if (!isNaN(numPart) && numPart > maxIdNum) maxIdNum = numPart;
  }
  return "TXN-" + String(maxIdNum + 1).padStart(6, '0');
}

function generateNextProductId() {
  var maxIdNum = 0;
  for (var i = 0; i < products.length; i++) {
    var pid = products[i].productId;
    if (pid && typeof pid === "string" && pid.startsWith("PRD-")) {
      var numPart = parseInt(pid.replace("PRD-", ""), 10);
      if (!isNaN(numPart) && numPart > maxIdNum) maxIdNum = numPart;
    }
  }
  return "PRD-" + String(maxIdNum + 1).padStart(6, '0');
}

// --------------------------------------------------------------------------
// 4. NAVIGATION & VIEW SWITCHING
// --------------------------------------------------------------------------

function navigateTo(pageId) {
  if (pageId === "cart") {
    openCartPanel();
    return;
  }
  // Refresh data from central database on tab change
  syncFromServer();
  var pages = document.querySelectorAll(".page-view");
  pages.forEach(function(p) { p.classList.remove("active"); });
  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function(item) {
    if (item.dataset.page === pageId) { item.classList.add("active"); } else { item.classList.remove("active"); }
  });
  var targetSection = document.getElementById("view-" + pageId);
  if (targetSection) targetSection.classList.add("active");

  var headerTitle = document.getElementById("headerTitle");
  var headerSubtitle = document.getElementById("headerSubtitle");

  switch(pageId) {
    case "dashboard": headerTitle.textContent = "Dashboard"; headerSubtitle.textContent = "Overview of store sales, customer loyalty, and rewards"; renderDashboard(); break;
    case "customers": headerTitle.textContent = "Customers"; headerSubtitle.textContent = "Manage customer profiles and loyalty activity"; renderCustomersTable(); break;
    case "products": headerTitle.textContent = "Products"; headerSubtitle.textContent = "Manage your electronics product catalogue"; renderProductsGrid(); break;
    case "product-detail": headerTitle.textContent = "Product Details"; headerSubtitle.textContent = "View specifications and purchase options"; break;
    case "customer-profile": headerTitle.textContent = "Customer Profile"; headerSubtitle.textContent = "Loyalty stats, tier progress, and history"; break;
    case "membership": headerTitle.textContent = "Membership Tiers"; headerSubtitle.textContent = "Tier benefits based on total customer spending"; break;
    case "rewards": headerTitle.textContent = "Rewards & Offers"; headerSubtitle.textContent = "Explore unlocked customer rewards catalog"; renderRewardsPage(); break;
    case "transactions": headerTitle.textContent = "Transactions"; headerSubtitle.textContent = "Complete log of store sales and point activity"; renderTransactionsTable(); break;
    case "analytics": headerTitle.textContent = "Analytics"; headerSubtitle.textContent = "In-depth loyalty retention, tier growth & revenue telemetry"; renderAnalyticsView(); break;
    case "settings": headerTitle.textContent = "Settings"; headerSubtitle.textContent = "Configure loyalty engine parameters and export data"; break;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 5. DASHBOARD RENDERER & INTERACTIVE VISUALIZATIONS
// --------------------------------------------------------------------------

function renderDashboard() {
  var totalCustomersCount = customers.length;
  var totalPointsIssued = 0;
  var totalSalesAmount = 0;
  for (var i = 0; i < transactions.length; i++) {
    totalSalesAmount += ((transactions[i].finalAmount != null ? transactions[i].finalAmount : transactions[i].amount) || 0);
    totalPointsIssued += (transactions[i].points || 0);
  }
  var activeRewardsCount = 0;
  for (var i = 0; i < customers.length; i++) { activeRewardsCount += getUnlockedRewards(customers[i]).length; }

  // 1. Update 4 Top KPI Cards
  var elCust = document.getElementById("dashTotalCustomers");
  if (elCust) elCust.textContent = totalCustomersCount;
  var elPts = document.getElementById("dashTotalPoints");
  if (elPts) elPts.textContent = totalPointsIssued.toLocaleString();
  var elSales = document.getElementById("dashTotalSales");
  if (elSales) elSales.textContent = "\u20b9" + totalSalesAmount.toLocaleString();

  var countB = 0, countS = 0, countG = 0, countD = 0;
  for (var i = 0; i < customers.length; i++) {
    var tier = customers[i].membership;
    if (tier === "Bronze") countB++; else if (tier === "Silver") countS++; else if (tier === "Gold") countG++; else if (tier === "Diamond") countD++;
  }
  var elDiamond = document.getElementById("dashDiamondCount");
  if (elDiamond) elDiamond.textContent = countD;

  // 2. Loyalty Performance Metrics Card
  var elRewards = document.getElementById("dashActiveRewards");
  if (elRewards) elRewards.textContent = activeRewardsCount;
  var elSmallRev = document.getElementById("dashLifetimeRevenueSmall");
  if (elSmallRev) elSmallRev.textContent = "\u20b9" + totalSalesAmount.toLocaleString();
  var elRetention = document.getElementById("dashLoyaltyRetention");
  if (elRetention) elRetention.textContent = totalCustomersCount > 0 ? "100%" : "0%";

  // 3. Render Donut Chart & Legend
  renderDonutChart(countB, countS, countG, countD, totalCustomersCount);

  // 4. Render Dynamic SVG Sales Trend Graph
  renderSalesTrendSvg();

  // 5. Render Top Selling Products Grid with 3D Hover
  renderTopSellingProducts();

  // 6. Render Recent Transactions Table
  var recentTableBody = document.getElementById("dashRecentActivityTable");
  if (recentTableBody) {
    recentTableBody.innerHTML = "";
    var recentTxns = transactions.slice().reverse().slice(0, 5);
    if (recentTxns.length === 0) {
      recentTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:#6B7280;">No transactions recorded yet.</td></tr>';
    } else {
      recentTxns.forEach(function(txn) {
        var initials = (txn.customerName || "CU").split(" ").map(function(w){return w[0];}).join("").substring(0, 2).toUpperCase();
        var row = document.createElement("tr");
        row.innerHTML = '<td><div class="customer-table-pill"><div class="customer-table-avatar">' + initials + '</div><div><strong>' + escapeHtml(txn.customerName) + '</strong><br><small style="color:#6B7280;">' + txn.customerId + '</small></div></div></td>' +
          '<td><span class="clickable-link" onclick="viewProductDetail(' + txn.productId + ')">' + escapeHtml(txn.productName) + '</span></td>' +
          '<td><strong>\u20b9' + txn.amount.toLocaleString() + '</strong></td>' +
          '<td><span class="points-pill"><i class="fa-solid fa-coins"></i> +' + txn.points + ' pts</span></td>' +
          '<td>' + txn.date + '</td>';
        recentTableBody.appendChild(row);
      });
    }
  }

  // 7. Render Metrics Strip & Category Sales Distribution
  renderDashboardSalesAndTopProducts(totalSalesAmount, totalPointsIssued);
}

function renderDonutChart(countB, countS, countG, countD, totalCustomers) {
  var total = totalCustomers || 1;
  var pctB = Math.round((countB / total) * 100);
  var pctS = Math.round((countS / total) * 100);
  var pctG = Math.round((countG / total) * 100);
  var pctD = Math.round((countD / total) * 100);

  // Set Legend Counts and Percentages
  var cB = document.getElementById("countBronze"); if (cB) cB.textContent = countB;
  var pB = document.getElementById("pctBronze"); if (pB) pB.textContent = pctB + "%";
  var cS = document.getElementById("countSilver"); if (cS) cS.textContent = countS;
  var pS = document.getElementById("pctSilver"); if (pS) pS.textContent = pctS + "%";
  var cG = document.getElementById("countGold"); if (cG) cG.textContent = countG;
  var pG = document.getElementById("pctGold"); if (pG) pG.textContent = pctG + "%";
  var cD = document.getElementById("countDiamond"); if (cD) cD.textContent = countD;
  var pD = document.getElementById("pctDiamond"); if (pD) pD.textContent = pctD + "%";

  var donutCenter = document.getElementById("donutTotalMembers");
  if (donutCenter) donutCenter.textContent = totalCustomers;

  // SVG Circumference for r=60 is 2 * Math.PI * 60 = 376.99 (~377)
  var circumference = 377;
  var segBronze = document.getElementById("donutSegmentBronze");
  var segSilver = document.getElementById("donutSegmentSilver");
  var segGold = document.getElementById("donutSegmentGold");
  var segDiamond = document.getElementById("donutSegmentDiamond");

  if (totalCustomers === 0) {
    if (segBronze) segBronze.setAttribute("stroke-dashoffset", circumference);
    if (segSilver) segSilver.setAttribute("stroke-dashoffset", circumference);
    if (segGold) segGold.setAttribute("stroke-dashoffset", circumference);
    if (segDiamond) segDiamond.setAttribute("stroke-dashoffset", circumference);
    return;
  }

  var lenB = (countB / total) * circumference;
  var lenS = (countS / total) * circumference;
  var lenG = (countG / total) * circumference;
  var lenD = (countD / total) * circumference;

  var offsetB = 0;
  var offsetS = offsetB + lenB;
  var offsetG = offsetS + lenS;
  var offsetD = offsetG + lenG;

  if (segBronze) {
    segBronze.setAttribute("stroke-dasharray", lenB + " " + (circumference - lenB));
    segBronze.setAttribute("stroke-dashoffset", -offsetB);
  }
  if (segSilver) {
    segSilver.setAttribute("stroke-dasharray", lenS + " " + (circumference - lenS));
    segSilver.setAttribute("stroke-dashoffset", -offsetS);
  }
  if (segGold) {
    segGold.setAttribute("stroke-dasharray", lenG + " " + (circumference - lenG));
    segGold.setAttribute("stroke-dashoffset", -offsetG);
  }
  if (segDiamond) {
    segDiamond.setAttribute("stroke-dasharray", lenD + " " + (circumference - lenD));
    segDiamond.setAttribute("stroke-dashoffset", -offsetD);
  }
}

function renderSalesTrendSvg() {
  var svgEl = document.getElementById("salesOverviewSvg");
  var monthLabelsRow = document.getElementById("salesMonthLabelsRow");
  if (!svgEl) return;

  // Aggregate sales by month from transactions (dynamic rolling 6 months ending in current month)
  var mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var now = new Date();
  var monthKeys = [];
  var monthlyMap = {};

  for (var i = 5; i >= 0; i--) {
    var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var key = mNames[d.getMonth()];
    monthKeys.push(key);
    monthlyMap[key] = 0;
  }

  // Calculate actual sales per month from completed transactions
  transactions.forEach(function(t) {
    var amt = (t.finalAmount != null ? t.finalAmount : t.amount) || 0;
    if (t.date) {
      var td = new Date(t.date);
      if (!isNaN(td.getTime())) {
        var mName = mNames[td.getMonth()];
        if (monthlyMap[mName] !== undefined) {
          monthlyMap[mName] += amt;
        }
      }
    }
  });

  var values = monthKeys.map(function(k) { return monthlyMap[k]; });
  var maxVal = Math.max.apply(null, values) || 0;
  var displayMax = maxVal > 0 ? maxVal : 50000;

  var width = 600;
  var height = 180;
  var padX = 40;
  var padY = 25;
  var stepX = (width - padX * 2) / (values.length - 1);

  var points = [];
  for (var i = 0; i < values.length; i++) {
    var x = padX + i * stepX;
    var norm = displayMax > 0 ? (values[i] / displayMax) : 0;
    var y = height - padY - (norm * (height - padY * 2));
    points.push({ x: x, y: y, val: values[i] });
  }

  // Build Coral / Pink Bars & Trend Line
  var barWidth = 36;
  var svgHtml = '' +
    '<defs>' +
      '<linearGradient id="salesBarGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#F56F6A"/>' +
        '<stop offset="100%" stop-color="#FDA4AF" stop-opacity="0.8"/>' +
      '</linearGradient>' +
      '<linearGradient id="salesBarGradHover" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#E85B56"/>' +
        '<stop offset="100%" stop-color="#F56F6A"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<!-- Horizontal Gridlines -->' +
    '<line x1="' + padX + '" y1="' + padY + '" x2="' + (width - padX) + '" y2="' + padY + '" stroke="#FCE7F3" stroke-dasharray="4 4" stroke-width="1"/>' +
    '<line x1="' + padX + '" y1="' + (height / 2) + '" x2="' + (width - padX) + '" y2="' + (height / 2) + '" stroke="#FCE7F3" stroke-dasharray="4 4" stroke-width="1"/>' +
    '<line x1="' + padX + '" y1="' + (height - padY) + '" x2="' + (width - padX) + '" y2="' + (height - padY) + '" stroke="#FCE7F3" stroke-width="1"/>';

  // Render Coral/Pink Bars for each month
  points.forEach(function(pt) {
    if (pt.val > 0) {
      var barHeight = Math.max(12, (height - padY) - pt.y);
      var barX = pt.x - barWidth / 2;
      var barY = (height - padY) - barHeight;
      svgHtml += '<rect x="' + barX + '" y="' + barY + '" width="' + barWidth + '" height="' + barHeight + '" rx="8" fill="url(#salesBarGrad)"/>';
      var valLabel = pt.val >= 1000 ? ('\u20b9' + Math.round(pt.val / 1000) + 'k') : ('\u20b9' + pt.val);
      svgHtml += '<text x="' + pt.x + '" y="' + (barY - 8) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#171717">' + valLabel + '</text>';
    } else {
      svgHtml += '<text x="' + pt.x + '" y="' + (height - padY - 8) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#9CA3AF">\u20b90</text>';
    }
  });

  // Render Coral Overlay Trend Line
  if (points.length > 0) {
    var trendLinePath = "M " + points[0].x + " " + points[0].y;
    for (var i = 1; i < points.length; i++) {
      var prev = points[i - 1];
      var curr = points[i];
      var cx = (prev.x + curr.x) / 2;
      trendLinePath += " C " + cx + " " + prev.y + ", " + cx + " " + curr.y + ", " + curr.x + " " + curr.y;
    }
    svgHtml += '<path d="' + trendLinePath + '" fill="none" stroke="#F56F6A" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>';
  }

  svgEl.innerHTML = svgHtml;

  if (monthLabelsRow) {
    monthLabelsRow.innerHTML = "";
    monthKeys.forEach(function(m) {
      var span = document.createElement("span");
      span.textContent = m;
      monthLabelsRow.appendChild(span);
    });
  }
}

function renderTopSellingProducts() {
  var grid = document.getElementById("dashTopSellingProductsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  // Count product transaction volume
  var salesMap = {};
  transactions.forEach(function(t) {
    salesMap[t.productId] = (salesMap[t.productId] || 0) + (t.quantity || 1);
  });

  // Sort products by sales volume or default demand
  var sorted = products.slice().sort(function(a, b) {
    var countA = salesMap[a.id] || 0;
    var countB = salesMap[b.id] || 0;
    return countB - countA;
  });

  var topFour = sorted.slice(0, 4);
  topFour.forEach(function(prod, index) {
    var pts = calculatePoints(prod.price);
    var card = document.createElement("div");
    card.className = "top-selling-card";
    card.innerHTML = '' +
      '<div class="top-card-header">' +
        '<span class="top-rank-badge">#' + (index + 1) + ' Best Seller</span>' +
        '<span class="badge-cat" style="font-size:10.5px;">' + escapeHtml(prod.category) + '</span>' +
      '</div>' +
      '<div class="top-card-image-holder">' +
        '<img src="' + prod.image + '" alt="' + escapeHtml(prod.name) + '" onerror="this.src=\'images/products/nova-x1.svg\';">' +
      '</div>' +
      '<h4 class="top-card-title" onclick="viewProductDetail(' + prod.id + ')">' + escapeHtml(prod.name) + '</h4>' +
      '<div class="top-card-cat">Stock: ' + prod.stock + ' &bull; ' + (salesMap[prod.id] || 0) + ' Sold</div>' +
      '<div class="top-card-footer">' +
        '<div>' +
          '<div class="top-card-price">\u20b9' + prod.price.toLocaleString() + '</div>' +
          '<div class="top-card-pts">+' + pts + ' pts</div>' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" onclick="addToCart(' + prod.id + ')" ' + (prod.stock <= 0 ? 'disabled' : '') + ' title="Add to Cart">' +
          '<i class="fa-solid fa-cart-plus"></i>' +
        '</button>' +
      '</div>';
    grid.appendChild(card);
  });
}

function renderDashboardSalesAndTopProducts(totalSalesAmount, totalPointsCount) {
  var txnCount = transactions.length;
  var avgOrder = txnCount > 0 ? Math.round(totalSalesAmount / txnCount) : 0;
  var avgPoints = txnCount > 0 ? Math.round(totalPointsCount / txnCount) : 0;

  var avgEl = document.getElementById("dashAvgOrderValue");
  if (avgEl) avgEl.textContent = "\u20b9" + avgOrder.toLocaleString();
  var countEl = document.getElementById("dashTxnCount");
  if (countEl) countEl.textContent = txnCount;
  var avgPtsEl = document.getElementById("dashAvgPoints");
  if (avgPtsEl) avgPtsEl.textContent = "+" + avgPoints + " pts";

  // Category sales breakdown
  var catTotals = {};
  transactions.forEach(function(t) {
    var prod = products.find(function(p) { return p.id === t.productId; });
    var cat = prod ? prod.category : "General";
    catTotals[cat] = (catTotals[cat] || 0) + (t.amount || 0);
  });

  var catBarsEl = document.getElementById("dashSalesBarsVisual");
  if (catBarsEl) {
    catBarsEl.innerHTML = "";
    var categories = Object.keys(catTotals);
    if (categories.length === 0) {
      catBarsEl.innerHTML = '<div style="text-align:center; padding:24px 0; color:var(--text-muted); font-size:13px;"><i class="fa-solid fa-chart-simple" style="margin-right:6px;"></i>No category sales recorded yet</div>';
      return;
    }
    var maxVal = Math.max.apply(null, Object.values(catTotals)) || 1;
    categories.slice(0, 4).forEach(function(cat) {
      var val = catTotals[cat] || 0;
      var pct = Math.min(100, Math.round((val / maxVal) * 100));
      var row = document.createElement("div");
      row.className = "sales-bar-row";
      row.innerHTML = '<div class="sales-bar-header"><span>' + escapeHtml(cat) + '</span><span>\u20b9' + val.toLocaleString() + ' (' + pct + '%)</span></div>' +
        '<div class="sales-bar-track"><div class="sales-bar-fill" style="width: ' + pct + '%;"></div></div>';
      catBarsEl.appendChild(row);
    });
  }
}

// --------------------------------------------------------------------------
// 5.1 ANALYTICS VIEW RENDERER
// --------------------------------------------------------------------------

function renderAnalyticsView() {
  renderAnalyticsContent();
  if (typeof fetch === "function") {
    fetch(API_BASE + '/api/analytics', { cache: 'no-cache' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.success && data.analytics) {
          applyServerAnalytics(data.analytics);
        }
      })
      .catch(function() {});
  }
}

function renderAnalyticsContent() {
  var grid = document.getElementById("analyticsSummaryGrid");
  if (!grid) return;

  var totalCust = customers.length;
  var totalRev = 0;
  var totalPts = 0;
  var completedTxns = transactions.length;

  transactions.forEach(function(t) {
    totalRev += ((t.finalAmount != null ? t.finalAmount : t.amount) || 0);
    totalPts += (t.points || 0);
  });
  var avgSpent = totalCust > 0 ? Math.round(totalRev / totalCust) : 0;
  var avgPtsPerPurch = completedTxns > 0 ? (Math.round((totalPts / completedTxns) * 10) / 10) : 0;
  var avgOrderValue = completedTxns > 0 ? Math.round(totalRev / completedTxns) : 0;

  grid.innerHTML = '' +
    '<div class="analytics-stat-card">' +
      '<small>Total Revenue</small>' +
      '<h3>\u20b9' + totalRev.toLocaleString() + '</h3>' +
      '<span>All logged transactions</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Loyalty Points Issued</small>' +
      '<h3>' + totalPts.toLocaleString() + '</h3>' +
      '<span>Active point economy</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Avg Revenue / Customer</small>' +
      '<h3>\u20b9' + avgSpent.toLocaleString() + '</h3>' +
      '<span>Customer lifetime value</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Active Members</small>' +
      '<h3>' + totalCust + '</h3>' +
      '<span>Registered profiles</span>' +
    '</div>';

  var trendsBox = document.getElementById("analyticsDetailedTrends");
  if (trendsBox) {
    var now = new Date();
    var curYear = now.getFullYear();
    var curMonth = now.getMonth();
    var curMonthCount = 0;
    var curMonthRev = 0;
    var curMonthPts = 0;

    transactions.forEach(function(t) {
      if (t.date) {
        var d = new Date(t.date);
        if (!isNaN(d.getTime()) && d.getFullYear() === curYear && d.getMonth() === curMonth) {
          curMonthCount++;
          curMonthRev += ((t.finalAmount != null ? t.finalAmount : t.amount) || 0);
          curMonthPts += (t.points || 0);
        }
      }
    });

    trendsBox.innerHTML = '' +
      '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Monthly velocity computed from ledger records:</p>' +
      '<div style="background:#F8FAFC;padding:16px;border-radius:var(--radius-md);border:1px solid var(--border-color);display:flex;flex-direction:column;gap:10px;">' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Completed Transactions</span><span>' + completedTxns + ' checkouts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Average Points / Purchase</span><span class="text-gold">+' + avgPtsPerPurch + ' pts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Average Order Value</span><span>\u20b9' + avgOrderValue.toLocaleString() + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Current Month Transactions</span><span>' + curMonthCount + ' checkouts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Current Month Revenue</span><span>\u20b9' + curMonthRev.toLocaleString() + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Total Points Minted</span><span class="text-gold">+' + totalPts.toLocaleString() + ' pts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Tier Upgrades Triggered</span><span class="text-purple">100% Automated</span></div>' +
      '</div>';
  }

  var tierBox = document.getElementById("analyticsTierBreakdown");
  if (tierBox) {
    var counts = { Bronze: 0, Silver: 0, Gold: 0, Diamond: 0 };
    customers.forEach(function(c) {
      var m = c.membership || "Bronze";
      if (counts[m] !== undefined) counts[m]++;
      else counts.Bronze++;
    });
    var pctB = totalCust > 0 ? Math.round((counts.Bronze / totalCust) * 100) : 0;
    var pctS = totalCust > 0 ? Math.round((counts.Silver / totalCust) * 100) : 0;
    var pctG = totalCust > 0 ? Math.round((counts.Gold / totalCust) * 100) : 0;
    var pctD = totalCust > 0 ? Math.round((counts.Diamond / totalCust) * 100) : 0;
    tierBox.innerHTML = '' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<div><small style="font-weight:700;">Bronze (\u20b90\u2013\u20b930,000): ' + counts.Bronze + ' (' + pctB + '%)</small></div>' +
        '<div><small style="font-weight:700;">Silver (\u20b930,000\u2013\u20b91,00,000): ' + counts.Silver + ' (' + pctS + '%)</small></div>' +
        '<div><small style="font-weight:700;">Gold (\u20b91,00,000\u2013\u20b92,00,000): ' + counts.Gold + ' (' + pctG + '%)</small></div>' +
        '<div><small style="font-weight:700;">Diamond (\u20b92,00,000+): ' + counts.Diamond + ' (' + pctD + '%)</small></div>' +
      '</div>';
  }
}

function applyServerAnalytics(analytics) {
  var grid = document.getElementById("analyticsSummaryGrid");
  if (!grid || !analytics) return;

  var totalRev = analytics.totalRevenue || 0;
  var totalPts = analytics.totalPointsIssued || 0;
  var totalCust = analytics.activeMembers || 0;
  var avgSpent = analytics.avgRevenuePerCustomer || 0;
  var completedTxns = analytics.completedTransactions != null ? analytics.completedTransactions : transactions.length;
  var avgPtsPerPurch = analytics.avgPointsPerPurchase != null ? analytics.avgPointsPerPurchase : 0;

  grid.innerHTML = '' +
    '<div class="analytics-stat-card">' +
      '<small>Total Revenue</small>' +
      '<h3>\u20b9' + totalRev.toLocaleString() + '</h3>' +
      '<span>All logged transactions</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Loyalty Points Issued</small>' +
      '<h3>' + totalPts.toLocaleString() + '</h3>' +
      '<span>Active point economy</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Avg Revenue / Customer</small>' +
      '<h3>\u20b9' + avgSpent.toLocaleString() + '</h3>' +
      '<span>Customer lifetime value</span>' +
    '</div>' +
    '<div class="analytics-stat-card">' +
      '<small>Active Members</small>' +
      '<h3>' + totalCust + '</h3>' +
      '<span>Registered profiles</span>' +
    '</div>';

  var trendsBox = document.getElementById("analyticsDetailedTrends");
  if (trendsBox) {
    var v = analytics.velocity || {};
    var curCount = v.currentMonthTransactions != null ? v.currentMonthTransactions : 0;
    var curRev = v.currentMonthRevenue != null ? v.currentMonthRevenue : 0;
    var avgOrderVal = v.avgOrderValue != null ? v.avgOrderValue : (completedTxns > 0 ? Math.round(totalRev / completedTxns) : 0);

    trendsBox.innerHTML = '' +
      '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Monthly velocity computed from ledger records:</p>' +
      '<div style="background:#F8FAFC;padding:16px;border-radius:var(--radius-md);border:1px solid var(--border-color);display:flex;flex-direction:column;gap:10px;">' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Completed Transactions</span><span>' + completedTxns + ' checkouts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Average Points / Purchase</span><span class="text-gold">+' + avgPtsPerPurch + ' pts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Average Order Value</span><span>\u20b9' + avgOrderVal.toLocaleString() + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Current Month Transactions</span><span>' + curCount + ' checkouts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Current Month Revenue</span><span>\u20b9' + curRev.toLocaleString() + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Total Points Minted</span><span class="text-gold">+' + totalPts.toLocaleString() + ' pts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Tier Upgrades Triggered</span><span class="text-purple">100% Automated</span></div>' +
      '</div>';
  }

  var tierBox = document.getElementById("analyticsTierBreakdown");
  if (tierBox && analytics.tierCounts) {
    var counts = analytics.tierCounts;
    var pctB = totalCust > 0 ? Math.round(((counts.Bronze || 0) / totalCust) * 100) : 0;
    var pctS = totalCust > 0 ? Math.round(((counts.Silver || 0) / totalCust) * 100) : 0;
    var pctG = totalCust > 0 ? Math.round(((counts.Gold || 0) / totalCust) * 100) : 0;
    var pctD = totalCust > 0 ? Math.round(((counts.Diamond || 0) / totalCust) * 100) : 0;
    tierBox.innerHTML = '' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<div><small style="font-weight:700;">Bronze (\u20b90\u2013\u20b930,000): ' + (counts.Bronze || 0) + ' (' + pctB + '%)</small></div>' +
        '<div><small style="font-weight:700;">Silver (\u20b930,000\u2013\u20b91,00,000): ' + (counts.Silver || 0) + ' (' + pctS + '%)</small></div>' +
        '<div><small style="font-weight:700;">Gold (\u20b91,00,000\u2013\u20b92,00,000): ' + (counts.Gold || 0) + ' (' + pctG + '%)</small></div>' +
        '<div><small style="font-weight:700;">Diamond (\u20b92,00,000+): ' + (counts.Diamond || 0) + ' (' + pctD + '%)</small></div>' +
      '</div>';
  }
}

// --------------------------------------------------------------------------
// 6. CUSTOMERS MANAGEMENT
// --------------------------------------------------------------------------

function renderCustomersTable(filterQuery) {
  if (filterQuery === undefined) {
    var searchEl = document.getElementById("customerSearchInput");
    filterQuery = searchEl ? searchEl.value : "";
  }
  filterQuery = filterQuery || "";
  var tbody = document.getElementById("customersTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  var query = filterQuery.toLowerCase().trim();
  var filtered = customers.filter(function(c) {
    return c.name.toLowerCase().includes(query) || c.id.toLowerCase().includes(query) || (c.phone || "").toLowerCase().includes(query);
  });
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:30px; color:#6B7280;">No matching customers found.</td></tr>';
    return;
  }
  filtered.forEach(function(cust) {
    var unlocked = getUnlockedRewards(cust);
    var row = document.createElement("tr");
    row.innerHTML = '<td><strong>' + escapeHtml(cust.name) + '</strong></td>' +
      '<td><code>' + cust.id + '</code></td>' +
      '<td>' + escapeHtml(cust.phone || "") + '</td>' +
      '<td><span class="tier-badge ' + (cust.membership || 'bronze').toLowerCase() + '">' + (cust.membership || 'Bronze') + '</span></td>' +
      '<td><strong>\u20b9' + (cust.totalSpending || 0).toLocaleString() + '</strong></td>' +
      '<td><span style="color:#D97706; font-weight:700;">' + (cust.points || 0) + ' pts</span></td>' +
      '<td><span class="reward-status-badge available">' + unlocked.length + ' Rewards</span></td>' +
      '<td><div style="display:flex; gap:6px;"><button class="btn btn-secondary btn-sm" onclick="viewCustomerProfile(\'' + cust.id + '\')" title="View Profile"><i class="fa-solid fa-eye"></i> View</button><button class="btn btn-secondary btn-sm" onclick="openEditCustomerModal(\'' + cust.id + '\')" title="Edit"><i class="fa-solid fa-pen"></i> Edit</button><button class="btn btn-danger btn-sm" onclick="deleteCustomer(\'' + cust.id + '\')" title="Delete"><i class="fa-solid fa-trash"></i></button></div></td>';
    tbody.appendChild(row);
  });
}

function openAddCustomerModal() {
  document.getElementById("customerModalTitle").textContent = "Add New Customer";
  document.getElementById("custEditId").value = "";
  document.getElementById("customerForm").reset();
  openModal("customerModal");
}

function openEditCustomerModal(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;
  document.getElementById("customerModalTitle").textContent = "Edit Customer";
  document.getElementById("custEditId").value = cust.id;
  document.getElementById("custName").value = cust.name;
  document.getElementById("custPhone").value = cust.phone || "";
  openModal("customerModal");
}

function handleSaveCustomer(event) {
  event.preventDefault();
  var editId = document.getElementById("custEditId").value;
  var name = document.getElementById("custName").value.trim();
  var phone = document.getElementById("custPhone").value.trim();

  if (!name || !phone) { alert("Please fill in Name and Phone Number."); return; }

  if (editId) {
    fetch('/api/customers/' + encodeURIComponent(editId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, phone: phone })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        alert(data.error || "Failed to update customer.");
        return;
      }
      var custIndex = customers.findIndex(function(c) { return c.id === editId; });
      if (custIndex !== -1) {
        customers[custIndex] = data.customer;
        transactions.forEach(function(t) { if (t.customerId === editId) t.customerName = name; });
      }
      saveDataAll();
      closeModal("customerModal");
      alert("Customer details updated successfully!");
      renderCustomersTable();
      renderDashboard();
      renderActiveView();
    })
    .catch(function() {
      var custIndex = customers.findIndex(function(c) { return c.id === editId; });
      if (custIndex !== -1) {
        customers[custIndex].name = name;
        customers[custIndex].phone = phone;
        transactions.forEach(function(t) { if (t.customerId === editId) t.customerName = name; });
      }
      saveDataAll();
      closeModal("customerModal");
      alert("Customer details updated successfully!");
      renderCustomersTable();
      renderDashboard();
      renderActiveView();
    });
  } else {
    fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, phone: phone })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        alert(data.error || "Failed to create customer.");
        return;
      }
      if (data.isExisting) {
        alert("A customer with phone number " + phone + " already exists: " + data.customer.name + " (" + data.customer.id + ")");
        return;
      }
      var newCust = data.customer;
      var existingIndex = customers.findIndex(function(c) { return c.id === newCust.id; });
      if (existingIndex !== -1) {
        customers[existingIndex] = newCust;
      } else {
        customers.push(newCust);
      }
      saveDataAll();
      closeModal("customerModal");
      alert("New Customer created! ID: " + newCust.id);

      // Auto-select in purchase modal if open
      var purchModal = document.getElementById("purchaseModal");
      if (purchModal && purchModal.classList.contains("active") && typeof selectCustomerForPurchase === "function") {
        selectCustomerForPurchase(newCust.id);
      }
      // Auto-select in cart checkout modal if open
      var checkoutModal = document.getElementById("cartCheckoutModal");
      if (checkoutModal && checkoutModal.classList.contains("active") && typeof selectCustomerForCheckout === "function") {
        selectCustomerForCheckout(newCust.id);
      }
      renderCustomersTable();
      renderDashboard();
      renderActiveView();
    })
    .catch(function() {
      var existing = customers.find(function(c) { return c.phone === phone; });
      if (existing) { alert("A customer with phone number " + phone + " already exists: " + existing.name + " (" + existing.id + ")"); return; }
      var newId = generateNextCustomerId();
      var newCust = { id: newId, name: name, email: "", phone: phone, dob: "", membership: "Bronze", totalSpending: 0, points: 0, purchasesCount: 0, createdAt: new Date().toISOString().split('T')[0] };
      customers.push(newCust);
      saveDataAll();
      closeModal("customerModal");
      alert("New Customer created! ID: " + newId);

      var purchModal = document.getElementById("purchaseModal");
      if (purchModal && purchModal.classList.contains("active") && typeof selectCustomerForPurchase === "function") {
        selectCustomerForPurchase(newId);
      }
      var checkoutModal = document.getElementById("cartCheckoutModal");
      if (checkoutModal && checkoutModal.classList.contains("active") && typeof selectCustomerForCheckout === "function") {
        selectCustomerForCheckout(newId);
      }
      renderCustomersTable();
      renderDashboard();
      renderActiveView();
    });
  }
}

function deleteCustomer(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;
  if (!confirm('Delete customer "' + cust.name + '" (' + cust.id + ')? This will remove the profile.')) return;
  fetch('/api/customers/' + encodeURIComponent(customerId), { method: 'DELETE' }).catch(function(){});
  customers = customers.filter(function(c) { return c.id !== customerId; });
  saveDataAll();
  renderCustomersTable();
  renderDashboard();
  renderActiveView();
}

// --------------------------------------------------------------------------
// 7. CUSTOMER PROFILE VIEW
// --------------------------------------------------------------------------

function viewCustomerProfile(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) { alert("Customer not found."); return; }
  currentSelectedCustomerId = customerId;
  cust.membership = calculateMembership(cust.totalSpending);

  document.getElementById("profName").textContent = cust.name;
  document.getElementById("profId").textContent = cust.id;
  var phoneEl = document.getElementById("profPhone");
  if (phoneEl) phoneEl.textContent = cust.phone || "N/A";
  var initials = cust.name.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
  document.getElementById("profAvatar").textContent = initials || "CU";

  var badgeEl = document.getElementById("profMembershipBadge");
  badgeEl.className = "tier-badge " + cust.membership.toLowerCase();
  badgeEl.textContent = cust.membership;

  document.getElementById("profPoints").textContent = cust.points.toLocaleString();
  document.getElementById("profSpending").textContent = "\u20b9" + cust.totalSpending.toLocaleString();
  var custTxns = transactions.filter(function(t) { return t.customerId === customerId; });
  document.getElementById("profPurchasesCount").textContent = custTxns.length;
  var unlockedRewards = getUnlockedRewards(cust);
  document.getElementById("profRewardsCount").textContent = unlockedRewards.length;

  var currentSpending = cust.totalSpending || 0;
  var nextTarget = 30000, nextTierName = "Silver";
  if (currentSpending >= 200000) { nextTarget = 200000; nextTierName = "Diamond"; }
  else if (currentSpending >= 100000) { nextTarget = 200000; nextTierName = "Diamond"; }
  else if (currentSpending >= 30000) { nextTarget = 100000; nextTierName = "Gold"; }

  document.getElementById("profCurrentTierLabel").textContent = cust.membership + " Tier";
  document.getElementById("profProgressCurrent").textContent = "\u20b9" + currentSpending.toLocaleString();
  document.getElementById("profProgressTarget").textContent = "\u20b9" + nextTarget.toLocaleString();
  if (cust.membership === "Diamond") {
    document.getElementById("profProgressBarFill").style.width = "100%";
    document.getElementById("profProgressText").textContent = "Diamond Member \u2014 Highest level reached!";
  } else {
    var remaining = nextTarget - currentSpending;
    var progressPercent = Math.min(100, Math.max(0, (currentSpending / nextTarget) * 100));
    document.getElementById("profProgressBarFill").style.width = progressPercent + "%";
    document.getElementById("profProgressText").textContent = "\u20b9" + remaining.toLocaleString() + " more to reach " + nextTierName;
  }

  var rewardsListEl = document.getElementById("profRewardsList");
  rewardsListEl.innerHTML = "";
  unlockedRewards.forEach(function(r) {
    var item = document.createElement("div"); item.className = "reward-mini-item";
    item.innerHTML = '<div><strong><i class="fa-solid fa-gift text-purple"></i> ' + escapeHtml(r.name) + '</strong><p style="font-size:12px; color:#6B7280; margin-top:2px;">' + escapeHtml(r.description) + '</p></div><span class="reward-status-badge available">' + r.status + '</span>';
    rewardsListEl.appendChild(item);
  });

  var historyBody = document.getElementById("profPurchaseHistoryBody");
  historyBody.innerHTML = "";
  if (custTxns.length === 0) {
    historyBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#6B7280;">No purchases recorded yet.</td></tr>';
  } else {
    custTxns.slice().reverse().forEach(function(txn) {
      var row = document.createElement("tr");
      row.innerHTML = '<td><span class="clickable-link" onclick="viewProductDetail(' + txn.productId + ')">' + escapeHtml(txn.productName) + '</span></td><td>' + txn.quantity + '</td><td><strong>\u20b9' + txn.amount.toLocaleString() + '</strong></td><td>' + txn.paymentMethod + '</td><td><span style="color:#D97706; font-weight:700;">+' + txn.points + ' pts</span></td><td>' + txn.date + '</td>';
      historyBody.appendChild(row);
    });
  }

  navigateTo("customer-profile");
}

// --------------------------------------------------------------------------
// 8. PURCHASE RECORDING MODAL
// --------------------------------------------------------------------------

function openAddPurchaseModal(preselectedCustomerId, preselectedProductId) {
  var prodSelect = document.getElementById("purchProductSelect");
  prodSelect.innerHTML = '<option value="">-- Select Product --</option>';
  products.forEach(function(p) {
    var opt = document.createElement("option"); opt.value = p.id;
    opt.textContent = p.name + " \u2014 \u20b9" + p.price.toLocaleString() + " (Stock: " + p.stock + ")";
    if (p.stock <= 0) opt.disabled = true;
    if (preselectedProductId && p.id === preselectedProductId) opt.selected = true;
    prodSelect.appendChild(opt);
  });

  document.getElementById("purchQty").value = 1;
  document.getElementById("purchDate").value = new Date().toISOString().split('T')[0];

  var custSearchInput = document.getElementById("purchCustSearch");
  if (custSearchInput) custSearchInput.value = "";
  var custResultsDiv = document.getElementById("purchCustResults");
  if (custResultsDiv) { custResultsDiv.innerHTML = ""; custResultsDiv.classList.remove("active"); }

  var targetCustId = preselectedCustomerId || currentSelectedCustomerId;
  if (targetCustId) {
    selectCustomerForPurchase(targetCustId);
  } else {
    clearPurchaseSelectedCustomer();
  }

  updatePurchaseCalculations();
  openModal("purchaseModal");
}

function searchCustomersForPurchase(query) {
  var resultsDiv = document.getElementById("purchCustResults");
  if (!resultsDiv) return;

  var q = (query || "").toLowerCase().trim();

  function renderPurchItems(list) {
    resultsDiv.innerHTML = "";
    if (list.length > 0) {
      list.slice(0, 5).forEach(function(cust) {
        var item = document.createElement("div");
        item.className = "cust-result-item";
        item.innerHTML = '<strong>' + escapeHtml(cust.name) + ' <span class="tier-badge ' + (cust.membership || 'bronze').toLowerCase() + '" style="font-size:10px;padding:1px 6px;">' + (cust.membership || 'Bronze') + '</span></strong>' +
          '<small>' + cust.id + ' \u2022 ' + (cust.phone || 'No phone') + '</small>';
        item.onclick = function() { selectCustomerForPurchase(cust.id); };
        resultsDiv.appendChild(item);
      });
    }
    var addNewItem = document.createElement("div");
    addNewItem.className = "cust-result-add-new";
    addNewItem.innerHTML = '<i class="fa-solid fa-user-plus"></i> + Add New Customer';
    addNewItem.onclick = function() {
      resultsDiv.classList.remove("active");
      openAddCustomerModal();
    };
    resultsDiv.appendChild(addNewItem);
    resultsDiv.classList.add("active");
  }

  var matched = customers.filter(function(c) {
    return c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q));
  });
  renderPurchItems(matched);

  if (q.length > 0) {
    fetch(API_BASE + '/api/customers?q=' + encodeURIComponent(q))
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res && res.success && Array.isArray(res.customers)) {
          res.customers.forEach(function(sc) {
            if (!customers.some(function(c) { return c.id === sc.id; })) {
              customers.push(sc);
            }
          });
          renderPurchItems(res.customers);
        }
      })
      .catch(function() {});
  }
}

function selectCustomerForPurchase(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;

  var selectEl = document.getElementById("purchCustomerSelect");
  if (selectEl) selectEl.value = cust.id;

  var infoDiv = document.getElementById("purchSelectedCustInfo");
  if (infoDiv) {
    infoDiv.style.display = "flex";
    infoDiv.innerHTML = '<span><i class="fa-solid fa-user-check"></i> ' + escapeHtml(cust.name) + ' (' + cust.id + ' \u2022 ' + (cust.phone || '') + ') <span class="tier-badge ' + cust.membership.toLowerCase() + '" style="font-size:10px;padding:2px 6px;margin-left:6px;">' + cust.membership + '</span></span>' +
      '<button type="button" class="clear-cust" onclick="clearPurchaseSelectedCustomer()">&times;</button>';
  }

  var resultsDiv = document.getElementById("purchCustResults");
  if (resultsDiv) resultsDiv.classList.remove("active");

  var searchInput = document.getElementById("purchCustSearch");
  if (searchInput) searchInput.value = "";

  updatePurchaseCalculations();
}

function clearPurchaseSelectedCustomer() {
  var selectEl = document.getElementById("purchCustomerSelect");
  if (selectEl) selectEl.value = "";

  var infoDiv = document.getElementById("purchSelectedCustInfo");
  if (infoDiv) { infoDiv.style.display = "none"; infoDiv.innerHTML = ""; }

  updatePurchaseCalculations();
}

function updatePurchaseCalculations() {
  var prodId = parseInt(document.getElementById("purchProductSelect").value, 10);
  var qty = parseInt(document.getElementById("purchQty").value, 10) || 1;
  var product = products.find(function(p) { return p.id === prodId; });

  var unitPriceEl = document.getElementById("calcUnitPrice");
  var stockEl = document.getElementById("calcStock");
  var subtotalEl = document.getElementById("calcSubtotalAmount");
  var availPointsEl = document.getElementById("calcAvailablePoints");
  var discountEl = document.getElementById("calcDiscountAmount");
  var redeemedPointsEl = document.getElementById("calcPointsRedeemed");
  var totalEl = document.getElementById("calcTotalAmount");
  var pointsEl = document.getElementById("calcPointsEarned");
  var remainingPointsEl = document.getElementById("calcRemainingPoints");
  var tierRow = document.getElementById("calcTierRow");
  var projectedTierEl = document.getElementById("calcProjectedTier");

  var customerId = document.getElementById("purchCustomerSelect").value;
  var customer = customers.find(function(c) { return c.id === customerId; });
  var availablePoints = customer ? (customer.points || 0) : 0;

  if (!product) {
    if (unitPriceEl) unitPriceEl.textContent = "\u20b90";
    if (stockEl) stockEl.textContent = "0 units";
    if (subtotalEl) subtotalEl.textContent = "\u20b90";
    if (availPointsEl) availPointsEl.textContent = availablePoints.toLocaleString() + " pts";
    if (discountEl) {
      discountEl.textContent = "No reward available yet";
      discountEl.style.color = "var(--text-muted)";
    }
    if (redeemedPointsEl) redeemedPointsEl.textContent = "0 pts";
    if (totalEl) totalEl.textContent = "\u20b90";
    if (pointsEl) pointsEl.textContent = "+0 Points";
    if (remainingPointsEl) remainingPointsEl.textContent = availablePoints.toLocaleString() + " pts";
    if (tierRow) tierRow.style.display = "none";
    return;
  }

  if (unitPriceEl) unitPriceEl.textContent = "\u20b9" + product.price.toLocaleString();
  if (stockEl) {
    stockEl.textContent = product.stock + " units" + (product.stock <= 0 ? " (Out of Stock)" : "");
    stockEl.style.color = product.stock <= 0 ? "var(--danger)" : "var(--primary)";
  }

  var subtotal = product.price * qty;
  var reward = calculateRewardDiscount(availablePoints, subtotal);
  var discount = reward.discount;
  var pointsRedeemed = reward.pointsRedeemed;
  var finalAmount = Math.max(0, subtotal - discount);
  var earnedPoints = calculatePoints(finalAmount);
  var remainingPoints = (availablePoints - pointsRedeemed) + earnedPoints;

  if (subtotalEl) subtotalEl.textContent = "\u20b9" + subtotal.toLocaleString();
  if (availPointsEl) availPointsEl.textContent = availablePoints.toLocaleString() + " pts";
  if (discountEl) {
    if (discount > 0) {
      discountEl.textContent = "-\u20b9" + discount.toLocaleString() + " (" + pointsRedeemed.toLocaleString() + " pts redeemed)";
      discountEl.style.color = "#10b981";
    } else {
      discountEl.textContent = "No reward available yet";
      discountEl.style.color = "var(--text-muted)";
    }
  }
  if (redeemedPointsEl) redeemedPointsEl.textContent = pointsRedeemed > 0 ? (pointsRedeemed.toLocaleString() + " pts") : "0 pts";
  if (totalEl) totalEl.textContent = "\u20b9" + finalAmount.toLocaleString();
  if (pointsEl) pointsEl.textContent = "+" + earnedPoints.toLocaleString() + " Points";
  if (remainingPointsEl) remainingPointsEl.textContent = remainingPoints.toLocaleString() + " pts";

  if (customer && tierRow && projectedTierEl) {
    var projectedSpending = (customer.totalSpending || 0) + finalAmount;
    var projectedTier = calculateMembership(projectedSpending);
    projectedTierEl.textContent = projectedTier + (projectedTier !== customer.membership ? " (Upgrading to " + projectedTier + "!)" : "");
    tierRow.style.display = "flex";
  } else if (tierRow) {
    tierRow.style.display = "none";
  }
}

function handleCompletePurchase(event) {
  event.preventDefault();
  var customerId = document.getElementById("purchCustomerSelect").value;
  if (!customerId) {
    var searchInput = document.getElementById("purchCustSearch");
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (query) {
      var found = customers.find(function(c) {
        return c.phone === query ||
               (c.phone && c.phone.toLowerCase() === query) ||
               c.id.toLowerCase() === query ||
               c.name.toLowerCase() === query;
      });
      if (found) {
        customerId = found.id;
        selectCustomerForPurchase(found.id);
      }
    }
  }

  var productId = parseInt(document.getElementById("purchProductSelect").value, 10);
  var qty = parseInt(document.getElementById("purchQty").value, 10);
  var paymentMethod = document.getElementById("purchPayment").value || "Online";
  var date = document.getElementById("purchDate").value || new Date().toISOString().split('T')[0];

  if (!customerId || !productId || !qty || qty <= 0) { alert("Please fill in all valid purchase fields."); return; }
  var customer = customers.find(function(c) { return c.id === customerId; });
  var product = products.find(function(p) { return p.id === productId; });
  if (!customer) { alert("Invalid customer selected."); return; }
  if (!product) { alert("Invalid product selected."); return; }
  if (qty > product.stock) { alert("Insufficient stock! Only " + product.stock + " units available."); return; }

  var payload = {
    customerId: customerId,
    items: [{ productId: productId, quantity: qty }],
    paymentMethod: paymentMethod,
    date: date
  };

  fetch('/api/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(res) { return res.json(); })
  .then(function(result) {
    if (!result.success) {
      alert(result.error || "Purchase failed.");
      return;
    }

    if (result.updatedProducts) {
      products = result.updatedProducts;
    } else {
      product.stock -= qty;
    }

    var custIdx = customers.findIndex(function(c) { return c.id === result.customer.id; });
    if (custIdx !== -1) customers[custIdx] = result.customer;
    else customers.push(result.customer);

    transactions.unshift(result.transaction);
    saveDataAll();

    closeModal("purchaseModal");
    var msg = "Purchase successful!\nTxn: " + result.transaction.transactionId +
      "\nSubtotal: \u20b9" + (result.subtotal != null ? result.subtotal : result.totalAmount).toLocaleString();
    if (result.discount > 0) {
      msg += "\nReward Discount: -\u20b9" + result.discount.toLocaleString() + " (" + result.pointsRedeemed + " pts redeemed)";
    }
    msg += "\nFinal Amount Paid: \u20b9" + (result.finalAmount != null ? result.finalAmount : result.totalAmount).toLocaleString() +
      "\nPoints Earned: +" + result.earnedPoints + " pts" +
      "\nRemaining Points Balance: " + (result.remainingPoints != null ? result.remainingPoints : result.customer.points) + " pts" +
      "\nMembership: " + result.customer.membership;
    alert(msg);

    currentSelectedCustomerId = result.customer.id;
    renderProductsGrid();
    renderCustomersTable();
    renderTransactionsTable();
    renderDashboard();
    renderRewardsPage();
    renderActiveView();
    if (currentSelectedCustomerId === customerId) {
      viewCustomerProfile(customerId);
    }
  })
  .catch(function() {
    var subtotal = product.price * qty;
    var availablePoints = customer.points || 0;
    var reward = calculateRewardDiscount(availablePoints, subtotal);
    var discount = reward.discount;
    var pointsRedeemed = reward.pointsRedeemed;
    var finalAmount = Math.max(0, subtotal - discount);
    var earnedPoints = calculatePoints(finalAmount);
    var remainingPoints = (availablePoints - pointsRedeemed) + earnedPoints;

    product.stock -= qty;
    customer.totalSpending = (customer.totalSpending || 0) + finalAmount;
    customer.points = remainingPoints;
    customer.purchasesCount = (customer.purchasesCount || 0) + 1;
    var oldTier = customer.membership;
    var newTier = calculateMembership(customer.totalSpending);
    customer.membership = newTier;
    customer.rewards = getUnlockedRewards(customer);
    var rewardNote = pointsRedeemed > 0 ? "Auto-Redeemed " + pointsRedeemed + " pts (\u20b9" + discount + " OFF)" : (oldTier !== newTier ? "Upgraded to " + newTier + " Tier!" : "Purchase Completed");

    var newTxnId = generateNextTransactionId();
    transactions.unshift({
      transactionId: newTxnId,
      customerId: customer.id,
      customerName: customer.name,
      productId: product.id,
      productName: product.name,
      quantity: qty,
      amount: finalAmount,
      subtotal: subtotal,
      discount: discount,
      finalAmount: finalAmount,
      pointsRedeemed: pointsRedeemed,
      remainingPoints: remainingPoints,
      paymentMethod: paymentMethod,
      points: earnedPoints,
      date: date,
      rewardActivity: rewardNote
    });

    saveDataAll();
    closeModal("purchaseModal");
    var msg = "Purchase successful!\nTxn: " + newTxnId +
      "\nSubtotal: \u20b9" + subtotal.toLocaleString();
    if (discount > 0) {
      msg += "\nReward Discount: -\u20b9" + discount.toLocaleString() + " (" + pointsRedeemed + " pts redeemed)";
    }
    msg += "\nFinal Amount Paid: \u20b9" + finalAmount.toLocaleString() +
      "\nPoints Earned: +" + earnedPoints + " pts" +
      "\nRemaining Points Balance: " + remainingPoints + " pts" +
      "\nMembership: " + customer.membership;
    alert(msg);

    currentSelectedCustomerId = customer.id;
    renderProductsGrid();
    renderCustomersTable();
    renderTransactionsTable();
    renderDashboard();
    renderRewardsPage();
    renderActiveView();
    if (currentSelectedCustomerId === customerId) {
      viewCustomerProfile(customerId);
    }
  });
}

// --------------------------------------------------------------------------
// 9. PRODUCTS CATALOGUE & DETAIL VIEW
// --------------------------------------------------------------------------

function renderProductsGrid() {
  var grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  var searchQuery = document.getElementById("productSearchInput").value.toLowerCase().trim();
  var categoryFilter = document.getElementById("productCategoryFilter").value;
  var priceFilter = document.getElementById("productPriceFilter").value;

  var filtered = products.filter(function(p) {
    var matchesSearch = p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery);
    var matchesCat = (categoryFilter === "All") || (p.category === categoryFilter);
    var matchesPrice = true;
    if (priceFilter === "under5000") matchesPrice = (p.price < 5000);
    else if (priceFilter === "5000-20000") matchesPrice = (p.price >= 5000 && p.price <= 20000);
    else if (priceFilter === "20000-50000") matchesPrice = (p.price > 20000 && p.price <= 50000);
    else if (priceFilter === "above50000") matchesPrice = (p.price > 50000);
    return matchesSearch && matchesCat && matchesPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#6B7280;">No products match your search criteria.</div>';
    return;
  }

  filtered.forEach(function(prod) {
    var points = calculatePoints(prod.price);
    var isOutOfStock = (prod.stock <= 0);
    var card = document.createElement("div"); card.className = "product-card";
    card.innerHTML = '<div class="product-img-wrap" onclick="viewProductDetail(' + prod.id + ')" style="cursor:pointer;"><img src="' + prod.image + '" alt="' + escapeHtml(prod.name) + '" onerror="this.style.display=\'none\'; this.parentElement.innerHTML=\'<div style=\\\\\'\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#F3F4F6;color:#9CA3AF;font-size:40px;\\\\\'\'>&#60;i class=\\\\\'\'fa-solid fa-image\\\\\'\'>&#60;/i>&#60;/div>\';" ></div>' +
      '<div class="product-card-body">' +
      '<span class="badge-cat">' + escapeHtml(prod.category) + '</span>' +
      '<h3 class="product-title" onclick="viewProductDetail(' + prod.id + ')">' + escapeHtml(prod.name) + '</h3>' +
      '<div class="product-meta-row"><span class="price-tag">\u20b9' + prod.price.toLocaleString() + '</span><span class="points-tag"><i class="fa-solid fa-coins"></i> ' + points + ' pts</span></div>' +
      '<div class="stock-tag ' + (isOutOfStock ? 'out-of-stock' : '') + '">' + (isOutOfStock ? '<i class="fa-solid fa-circle-xmark"></i> Out of Stock' : '<i class="fa-solid fa-box"></i> Stock: ' + prod.stock + ' units') + '</div>' +
      (prod.membershipOffer ? '<div class="offer-badge"><i class="fa-solid fa-tag"></i> ' + escapeHtml(prod.membershipOffer) + '</div>' : '') +
      '<div class="product-card-footer">' +
      '<button class="btn btn-secondary" onclick="viewProductDetail(' + prod.id + ')"><i class="fa-solid fa-circle-info"></i> View Details</button>' +
      '<div class="product-card-actions">' +
      '<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCart(' + prod.id + ')" ' + (isOutOfStock ? 'disabled' : '') + '><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>' +
      '</div></div></div>';
    grid.appendChild(card);
  });
}

function viewProductDetail(productId) {
  var prod = products.find(function(p) { return p.id === productId; });
  if (!prod) {
    var txn = transactions.find(function(t) { return t.productId === productId; });
    if (txn) {
      document.getElementById("detailImg").src = "";
      document.getElementById("detailName").textContent = txn.productName + " (Deleted)";
      document.getElementById("detailProductId").innerHTML = '<i class="fa-solid fa-barcode"></i> Product no longer in catalogue';
      document.getElementById("detailCategory").textContent = "Removed Product";
      document.getElementById("detailPrice").textContent = "\u20b9" + txn.amount.toLocaleString();
      document.getElementById("detailPoints").textContent = txn.points + " Points earned";
      document.getElementById("detailDescription").textContent = "This product has been removed from the catalogue.";
      document.getElementById("detailSpecs").innerHTML = "";
      document.getElementById("detailOfferText").textContent = "N/A";
      document.getElementById("detailStockBadge").className = "stock-badge out-of-stock";
      document.getElementById("detailStockBadge").innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Product Deleted';
      var cartBtnDeleted = document.getElementById("detailAddToCartBtn");
      if (cartBtnDeleted) { cartBtnDeleted.disabled = true; cartBtnDeleted.textContent = "Unavailable"; }
      var buyBtnDeleted = document.getElementById("detailAddPurchaseBtn");
      if (buyBtnDeleted) { buyBtnDeleted.disabled = true; buyBtnDeleted.textContent = "Unavailable"; }
      navigateTo("product-detail");
      return;
    }
    alert("Product not found."); return;
  }

  currentSelectedProductId = productId;
  var points = calculatePoints(prod.price);
  document.getElementById("detailImg").src = prod.image;
  document.getElementById("detailImg").onerror = function() { this.style.display = 'none'; this.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#F3F4F6;color:#9CA3AF;font-size:60px;"><i class="fa-solid fa-image"></i></div>'; };
  document.getElementById("detailName").textContent = prod.name;
  document.getElementById("detailProductId").innerHTML = '<i class="fa-solid fa-barcode"></i> ' + (prod.productId || 'N/A');
  document.getElementById("detailCategory").textContent = prod.category;
  document.getElementById("detailPrice").textContent = "\u20b9" + prod.price.toLocaleString();
  document.getElementById("detailPoints").textContent = points + " Loyalty Points";
  document.getElementById("detailDescription").textContent = prod.description || "No description available.";
  document.getElementById("detailOfferText").textContent = prod.membershipOffer || "Standard loyalty points eligible.";

  var stockBadge = document.getElementById("detailStockBadge");
  if (prod.stock <= 0) {
    stockBadge.className = "stock-badge out-of-stock";
    stockBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Out of Stock';
  } else {
    stockBadge.className = "stock-badge in-stock";
    stockBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Stock: ' + prod.stock + ' units';
  }

  var specsList = document.getElementById("detailSpecs"); specsList.innerHTML = "";
  if (prod.specifications && prod.specifications.length > 0) {
    prod.specifications.forEach(function(spec) {
      var li = document.createElement("li");
      li.innerHTML = '<i class="fa-solid fa-check text-purple"></i> ' + escapeHtml(spec);
      specsList.appendChild(li);
    });
  }

  var cartBtn = document.getElementById("detailAddToCartBtn");
  var buyBtn = document.getElementById("detailAddPurchaseBtn");
  if (prod.stock <= 0) {
    if (cartBtn) { cartBtn.disabled = true; cartBtn.textContent = "Out of Stock"; }
    if (buyBtn) { buyBtn.disabled = true; buyBtn.textContent = "Out of Stock"; }
  } else {
    if (cartBtn) {
      cartBtn.disabled = false;
      cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
      cartBtn.onclick = function() { addToCart(prod.id); };
    }
    if (buyBtn) {
      buyBtn.disabled = false;
      buyBtn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Quick Purchase';
      buyBtn.onclick = function() { openAddPurchaseModal(currentSelectedCustomerId, prod.id); };
    }
  }
  navigateTo("product-detail");
}

// --------------------------------------------------------------------------
// 10. REWARDS PAGE CATALOGUE
// --------------------------------------------------------------------------

function renderRewardsPage() {
  var grid = document.getElementById("rewardsCatalogueGrid");
  if (!grid) return;
  grid.innerHTML = "";

  var cust = currentSelectedCustomerId ? customers.find(function(c) { return c.id === currentSelectedCustomerId; }) : (customers.length > 0 ? customers[0] : null);
  var unlocked = cust ? getUnlockedRewards(cust) : [];
  var unlockedNames = unlocked.map(function(r) { return r.name; });

  var rewardsCatalog = [
    { name: "Birthday Reward (5% OFF)", tier: "Bronze", minSpending: 0, desc: "Special birthday discount voucher for Bronze level members and above.", icon: "fa-cake-candles" },
    { name: "Silver Special Offer (\u20b9250 Voucher)", tier: "Silver", minSpending: 30000, desc: "Flat \u20b9250 discount coupon on audio accessories & electronics.", icon: "fa-tags" },
    { name: "Gold Gift Box", tier: "Gold", minSpending: 100000, desc: "Free accessory package with every purchase over \u20b91,00,000.", icon: "fa-gift" },
    { name: "Diamond Premium Gift", tier: "Diamond", minSpending: 200000, desc: "Premium wireless charging pad or earphones gift on any flagship buy.", icon: "fa-gem" },
    { name: "Exclusive Product Launch Access", tier: "Diamond", minSpending: 200000, desc: "VIP early access to reserve new smartphone & laptop launches.", icon: "fa-rocket" }
  ];

  rewardsCatalog.forEach(function(rw) {
    var isEligible = cust ? unlockedNames.includes(rw.name) : false;
    var isRedeemed = cust && cust.redeemedRewards && cust.redeemedRewards.includes(rw.name);

    var card = document.createElement("div");
    card.className = "reward-card" + (isEligible ? " eligible" : " locked");

    var statusHtml = "";
    if (isRedeemed) {
      statusHtml = '<span class="reward-status-badge" style="background:#E0E7FF;color:#4338CA;"><i class="fa-solid fa-check"></i> Redeemed</span>';
    } else if (isEligible) {
      statusHtml = '<span class="reward-status-badge available"><i class="fa-solid fa-gift"></i> Available / Unlocked</span>' +
        '<button class="btn btn-primary btn-sm" style="margin-left:8px;padding:4px 10px;font-size:11px;" onclick="redeemReward(\'' + escapeHtml(rw.name) + '\', \'' + (cust ? cust.id : '') + '\')">Redeem</button>';
    } else {
      statusHtml = '<span class="reward-status-badge" style="background:#F3F4F6;color:#6B7280;border:1px solid #E5E7EB;"><i class="fa-solid fa-lock"></i> Locked (' + rw.tier + ' Tier \u2014 \u20b9' + rw.minSpending.toLocaleString() + '+)</span>';
    }

    card.innerHTML = '<div class="reward-card-header">' +
      '<div class="reward-icon"><i class="fa-solid ' + rw.icon + '"></i></div>' +
      '<span class="tier-badge ' + rw.tier.toLowerCase() + '">' + rw.tier + ' Tier</span>' +
      '</div>' +
      '<h3 style="font-size:16px; font-weight:700; margin-bottom:6px;">' + escapeHtml(rw.name) + '</h3>' +
      '<p style="font-size:13px; color:#6B7280; flex:1; margin-bottom:16px;">' + escapeHtml(rw.desc) + '</p>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' + statusHtml + '</div>';

    grid.appendChild(card);
  });
}

function redeemReward(rewardName, customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) { alert("Customer not found."); return; }
  if (!cust.redeemedRewards) cust.redeemedRewards = [];
  if (cust.redeemedRewards.includes(rewardName)) {
    alert("Reward has already been redeemed.");
    return;
  }

  fetch('/api/rewards/redeem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId: customerId, rewardName: rewardName })
  })
  .then(function(res) { return res.json(); })
  .then(function(result) {
    if (!result.success) {
      alert(result.error || "Reward redemption failed.");
      return;
    }
    var idx = customers.findIndex(function(c) { return c.id === customerId; });
    if (idx !== -1) customers[idx] = result.customer;
    saveCustomers();
    renderRewardsPage();
    renderDashboard();
    renderActiveView();
    if (currentSelectedCustomerId === cust.id) {
      viewCustomerProfile(cust.id);
    }
    alert("Reward \"" + rewardName + "\" redeemed successfully for " + result.customer.name + "!");
  })
  .catch(function() {
    cust.redeemedRewards.push(rewardName);
    saveCustomers();
    renderRewardsPage();
    renderDashboard();
    renderActiveView();
    if (currentSelectedCustomerId === cust.id) {
      viewCustomerProfile(cust.id);
    }
    alert("Reward \"" + rewardName + "\" redeemed successfully for " + cust.name + "!");
  });
}

// --------------------------------------------------------------------------
// 11. TRANSACTIONS PAGE
// --------------------------------------------------------------------------

function renderTransactionsTable(filterQuery) {
  filterQuery = filterQuery || "";
  var tbody = document.getElementById("transactionsTableBody"); tbody.innerHTML = "";
  var query = filterQuery.toLowerCase().trim();
  var filtered = transactions.filter(function(t) {
    return t.transactionId.toLowerCase().includes(query) ||
      t.customerName.toLowerCase().includes(query) ||
      t.productName.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#6B7280;">No transactions found.</td></tr>';
    return;
  }

  filtered.slice().reverse().forEach(function(txn) {
    var amountHtml = '<strong>\u20b9' + txn.amount.toLocaleString() + '</strong>';
    if (txn.discount && txn.discount > 0) {
      amountHtml += '<br><small style="color:#10b981;font-weight:600;">Saved \u20b9' + txn.discount.toLocaleString() + '</small>';
    }

    var pointsHtml = '<span style="color:#D97706; font-weight:700;">+' + txn.points + ' pts</span>';
    if (txn.pointsRedeemed && txn.pointsRedeemed > 0) {
      pointsHtml += '<br><small style="color:#6B7280;">(-' + txn.pointsRedeemed + ' redeemed)</small>';
    }

    var row = document.createElement("tr");
    row.innerHTML = '<td><code>' + txn.transactionId + '</code></td>' +
      '<td><strong>' + escapeHtml(txn.customerName) + '</strong><br><small style="color:#6B7280;">' + txn.customerId + '</small></td>' +
      '<td><span class="clickable-link" onclick="viewProductDetail(' + txn.productId + ')">' + escapeHtml(txn.productName) + '</span></td>' +
      '<td>' + txn.quantity + '</td>' +
      '<td>' + amountHtml + '</td>' +
      '<td>' + txn.paymentMethod + '</td>' +
      '<td>' + pointsHtml + '</td>' +
      '<td>' + txn.date + '</td>' +
      '<td><span class="reward-status-badge available">' + escapeHtml(txn.rewardActivity || 'Purchased') + '</span></td>';
    tbody.appendChild(row);
  });
}

// --------------------------------------------------------------------------
// 12. PRODUCT MANAGEMENT (ADD / EDIT / DELETE)
// --------------------------------------------------------------------------

function buildMembershipOffer(eligibility, discount) {
  if (!eligibility || eligibility === "None" || !discount || discount === "None") {
    return "";
  }
  return discount + "% OFF for " + eligibility + " members";
}

function handleProductImagePreview(event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var previewImg = document.getElementById("prodImagePreview");
    var placeholder = document.getElementById("prodImagePlaceholder");
    previewImg.src = e.target.result;
    previewImg.style.display = "block";
    placeholder.style.display = "none";
    document.getElementById("prodImageData").value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function closeAddProductModal() {
  var modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("active");
  var form = document.getElementById("productForm");
  if (form) form.reset();
  var editId = document.getElementById("prodEditId");
  if (editId) editId.value = "";
  var previewImg = document.getElementById("prodImagePreview");
  if (previewImg) { previewImg.style.display = "none"; previewImg.src = ""; }
  var placeholder = document.getElementById("prodImagePlaceholder");
  if (placeholder) placeholder.style.display = "flex";
  var dataInput = document.getElementById("prodImageData");
  if (dataInput) dataInput.value = "";
}

function openAddProductModal() {
  // Explicitly close/hide Delete Products modal first
  closeDeleteProductsModal();

  // Close three-dot menu dropdown immediately
  closeProductActionMenu();

  var title = document.getElementById("productModalTitle");
  if (title) title.innerHTML = '<i class="fa-solid fa-box-open text-purple"></i> Add New Product';
  var saveBtn = document.getElementById("saveProductBtn");
  if (saveBtn) saveBtn.textContent = "Add Product";
  var editId = document.getElementById("prodEditId");
  if (editId) editId.value = "";
  var form = document.getElementById("productForm");
  if (form) form.reset();
  var previewImg = document.getElementById("prodImagePreview");
  if (previewImg) { previewImg.style.display = "none"; previewImg.src = ""; }
  var placeholder = document.getElementById("prodImagePlaceholder");
  if (placeholder) placeholder.style.display = "flex";
  var dataInput = document.getElementById("prodImageData");
  if (dataInput) dataInput.value = "";

  openModal("productModal");
}

function openEditProductModal(productNumericId) {
  closeDeleteProductsModal();
  closeProductActionMenu();
  var prod = products.find(function(p) { return p.id === productNumericId; });
  if (!prod) { alert("Product not found."); return; }

  document.getElementById("productModalTitle").innerHTML = '<i class="fa-solid fa-pen text-purple"></i> Edit Product';
  document.getElementById("saveProductBtn").textContent = "Save Changes";
  document.getElementById("prodEditId").value = String(prod.id);

  document.getElementById("prodName").value = prod.name;
  document.getElementById("prodCategory").value = prod.category;
  document.getElementById("prodPrice").value = prod.price;
  document.getElementById("prodStock").value = prod.stock;
  document.getElementById("prodDescription").value = prod.description || "";
  document.getElementById("prodSpecs").value = (prod.specifications || []).join("\n");

  document.getElementById("prodEligibility").value = prod.eligibleMembership || "None";

  var discountVal = "None";
  if (prod.membershipOffer) {
    var match = prod.membershipOffer.match(/^(\d+)%/);
    if (match) discountVal = match[1];
  }
  document.getElementById("prodDiscount").value = discountVal;

  var previewImg = document.getElementById("prodImagePreview");
  var placeholder = document.getElementById("prodImagePlaceholder");
  if (prod.image) {
    previewImg.src = prod.image;
    previewImg.style.display = "block";
    placeholder.style.display = "none";
  } else {
    previewImg.style.display = "none";
    placeholder.style.display = "flex";
  }
  document.getElementById("prodImageData").value = "";

  openModal("productModal");
}

function handleSaveProduct(event) {
  event.preventDefault();

  var editIdStr = document.getElementById("prodEditId").value;
  var name = document.getElementById("prodName").value.trim();
  var category = document.getElementById("prodCategory").value;
  var price = parseInt(document.getElementById("prodPrice").value, 10);
  var stock = parseInt(document.getElementById("prodStock").value, 10);
  var description = document.getElementById("prodDescription").value.trim();
  var specsText = document.getElementById("prodSpecs").value.trim();
  var eligibility = document.getElementById("prodEligibility").value;
  var discount = document.getElementById("prodDiscount").value;
  var newImageData = document.getElementById("prodImageData").value;

  if (!name) { alert("Product name is required."); return; }
  if (!category) { alert("Category is required."); return; }
  if (!price || price <= 0) { alert("Price must be greater than 0."); return; }
  if (stock < 0 || isNaN(stock)) { alert("Stock cannot be negative."); return; }

  var specifications = specsText ? specsText.split("\n").map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; }) : [];
  var membershipOffer = buildMembershipOffer(eligibility, discount);

  if (editIdStr) {
    var editId = parseInt(editIdStr, 10);
    var prodIndex = products.findIndex(function(p) { return p.id === editId; });
    if (prodIndex === -1) { alert("Product not found."); return; }

    var updatePayload = {
      name: name,
      category: category,
      price: price,
      stock: stock,
      description: description,
      specifications: specifications,
      eligibleMembership: eligibility,
      membershipOffer: membershipOffer
    };
    if (newImageData) updatePayload.image = newImageData;

    fetch('/api/products/' + editId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    }).catch(function(){});

    products[prodIndex].name = name;
    products[prodIndex].category = category;
    products[prodIndex].price = price;
    products[prodIndex].stock = stock;
    products[prodIndex].description = description;
    products[prodIndex].specifications = specifications;
    products[prodIndex].eligibleMembership = eligibility;
    products[prodIndex].membershipOffer = membershipOffer;

    if (newImageData) {
      products[prodIndex].image = newImageData;
    }

    transactions.forEach(function(t) {
      if (t.productId === editId) t.productName = name;
    });

    saveDataAll();
    closeModal("productModal");
    showToast("Product updated successfully.", "fa-check-circle");
  } else {
    var maxNumericId = 0;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id > maxNumericId) maxNumericId = products[i].id;
    }
    var newId = maxNumericId + 1;
    var newProductId = generateNextProductId();

    var image = newImageData;
    if (!image) {
      var initial = name.charAt(0).toUpperCase();
      var colors = ["#6D5DFB","#10B981","#F59E0B","#EF4444","#06B6D4","#8B5CF6","#EC4899"];
      var color = colors[newId % colors.length];
      image = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="' + color + '" opacity="0.15" rx="12"/><rect x="20" y="20" width="260" height="160" fill="#fff" rx="8" opacity="0.8"/><circle cx="150" cy="85" r="35" fill="' + color + '" opacity="0.9"/><text x="150" y="92" fill="#fff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">' + initial + '</text><text x="150" y="140" fill="#111827" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">' + name + '</text><text x="150" y="160" fill="#6B7280" font-family="sans-serif" font-size="11" text-anchor="middle">' + category + '</text></svg>');
    }

    var newProduct = {
      id: newId,
      productId: newProductId,
      name: name,
      category: category,
      price: price,
      image: image,
      stock: stock,
      description: description || "Custom added product.",
      specifications: specifications,
      eligibleMembership: eligibility,
      membershipOffer: membershipOffer
    };

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    }).catch(function(){});

    products.push(newProduct);
    saveDataAll();
    closeModal("productModal");
    showToast("Product added successfully! ID: " + newProductId, "fa-check-circle");
  }

  renderProductsGrid();
  renderDashboard();
  renderActiveView();
}

function deleteProduct(productNumericId) {
  var prod = products.find(function(p) { return p.id === productNumericId; });
  if (!prod) return;

  var confirmDelete = confirm('Are you sure you want to delete "' + prod.name + '" (' + (prod.productId || 'ID:' + prod.id) + ')?\n\nExisting purchase history and transactions referencing this product will NOT be deleted.');
  if (!confirmDelete) return;

  fetch('/api/products/' + productNumericId, { method: 'DELETE' }).catch(function(){});

  products = products.filter(function(p) { return p.id !== productNumericId; });
  saveDataAll();

  showToast("Product deleted.", "fa-trash-can");
  renderProductsGrid();
  renderDashboard();
  renderActiveView();
}

// --------------------------------------------------------------------------
// 12.1 PRODUCT ACTION MENU (THREE-DOT) & BATCH DELETION
// --------------------------------------------------------------------------

var selectedProductIdsToDelete = new Set();

function closeProductActionMenu() {
  var menuBtn = document.getElementById("productMenuBtn");
  var dropdown = document.getElementById("productMenuDropdown");
  if (dropdown) dropdown.classList.remove("active");
  if (menuBtn) menuBtn.classList.remove("active");
}

function closeDeleteProductsModal() {
  var modal = document.getElementById("deleteProductsModal");
  if (modal) modal.classList.remove("active");
  selectedProductIdsToDelete.clear();
  var searchInput = document.getElementById("deleteProductSearchInput");
  if (searchInput) searchInput.value = "";
  var selectAllCheckbox = document.getElementById("selectAllDeleteProductsCheckbox");
  if (selectAllCheckbox) selectAllCheckbox.checked = false;
  updateDeleteProductsSelectionUI(0, 0);
}

function initProductActionMenu() {
  if (window._productActionMenuInitialized) return;
  window._productActionMenuInitialized = true;

  var menuBtn = document.getElementById("productMenuBtn");
  var dropdown = document.getElementById("productMenuDropdown");
  var addBtn = document.getElementById("menuAddProductBtn");
  var deleteBtn = document.getElementById("menuDeleteProductsBtn");

  if (menuBtn && dropdown) {
    menuBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("active");
      menuBtn.classList.toggle("active");
    };

    document.addEventListener("click", function(e) {
      if (!dropdown.contains(e.target) && e.target !== menuBtn) {
        closeProductActionMenu();
      }
    });
  }

  if (addBtn) {
    addBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeProductActionMenu();
      openAddProductModal();
    };
  }

  if (deleteBtn) {
    deleteBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeProductActionMenu();
      openDeleteProductsModal();
    };
  }

  var deleteSearchInput = document.getElementById("deleteProductSearchInput");
  if (deleteSearchInput) {
    deleteSearchInput.oninput = function() {
      renderDeleteProductsList();
    };
  }

  var selectAllCheckbox = document.getElementById("selectAllDeleteProductsCheckbox");
  if (selectAllCheckbox) {
    selectAllCheckbox.onchange = function(e) {
      toggleSelectAllDeleteProducts(e.target.checked);
    };
  }

  var executeDeleteBtn = document.getElementById("executeDeleteProductsBtn");
  if (executeDeleteBtn) {
    executeDeleteBtn.onclick = function(e) {
      e.preventDefault();
      confirmAndExecuteDeleteProducts();
    };
  }
}

function openDeleteProductsModal() {
  // Requirement 5: Explicitly close/hide Add Product modal first
  closeAddProductModal();

  // Requirement 7: Close the ⋮ dropdown immediately
  closeProductActionMenu();

  // Requirement 6: Properly reset/clear modal state & selected products
  selectedProductIdsToDelete.clear();
  var searchInput = document.getElementById("deleteProductSearchInput");
  if (searchInput) searchInput.value = "";
  var selectAllCheckbox = document.getElementById("selectAllDeleteProductsCheckbox");
  if (selectAllCheckbox) selectAllCheckbox.checked = false;

  renderDeleteProductsList();
  openModal("deleteProductsModal");
}

function renderDeleteProductsList() {
  var listContainer = document.getElementById("deleteProductsList");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  var searchInput = document.getElementById("deleteProductSearchInput");
  var query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  var filtered = products.filter(function(p) {
    if (!query) return true;
    return (p.name && p.name.toLowerCase().includes(query)) ||
           (p.productId && p.productId.toLowerCase().includes(query)) ||
           (p.category && p.category.toLowerCase().includes(query));
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:36px 12px; color:var(--text-muted); font-size:13px;">' +
      '<i class="fa-solid fa-box-open" style="font-size:28px; margin-bottom:8px; display:block; opacity:0.4;"></i>No products found matching your search.</div>';
    updateDeleteProductsSelectionUI(0, 0);
    return;
  }

  var visibleSelectedCount = 0;

  filtered.forEach(function(product) {
    var isSelected = selectedProductIdsToDelete.has(product.id);
    if (isSelected) visibleSelectedCount++;

    var row = document.createElement("div");
    row.className = "delete-product-row" + (isSelected ? " selected" : "");
    row.dataset.id = product.id;

    var imageSrc = product.image || "images/products/nova-x1.svg";

    row.innerHTML = 
      '<div class="delete-product-checkbox-wrap">' +
        '<input type="checkbox" ' + (isSelected ? 'checked' : '') + ' tabindex="-1">' +
      '</div>' +
      '<div class="delete-product-thumb">' +
        '<img src="' + imageSrc + '" alt="' + escapeHtml(product.name) + '" onerror="this.src=\'images/products/nova-x1.svg\';">' +
      '</div>' +
      '<div class="delete-product-info">' +
        '<div class="delete-product-title-row">' +
          '<span class="delete-product-name">' + escapeHtml(product.name) + '</span>' +
          '<code style="font-size:11px; color:var(--coral); font-weight:700;">' + escapeHtml(product.productId || "ID:" + product.id) + '</code>' +
        '</div>' +
        '<div class="delete-product-meta-row">' +
          '<span><i class="fa-solid fa-tag"></i> ' + escapeHtml(product.category) + '</span>' +
          '<span>&bull;</span>' +
          '<span>Stock: ' + product.stock + ' units</span>' +
        '</div>' +
      '</div>' +
      '<div class="delete-product-pricing">' +
        '<div class="delete-product-price">₹' + product.price.toLocaleString() + '</div>' +
      '</div>';

    row.addEventListener("click", function(e) {
      if (selectedProductIdsToDelete.has(product.id)) {
        selectedProductIdsToDelete.delete(product.id);
      } else {
        selectedProductIdsToDelete.add(product.id);
      }
      renderDeleteProductsList();
    });

    listContainer.appendChild(row);
  });

  updateDeleteProductsSelectionUI(visibleSelectedCount, filtered.length);
}

function updateDeleteProductsSelectionUI(visibleSelectedCount, visibleTotalCount) {
  var count = selectedProductIdsToDelete.size;
  var badge = document.getElementById("deleteProductsSelectedCount");
  if (badge) {
    badge.textContent = count + " product" + (count === 1 ? "" : "s") + " selected";
  }

  var btnCount = document.getElementById("deleteSelectedCountText");
  if (btnCount) {
    btnCount.textContent = count;
  }

  var btn = document.getElementById("executeDeleteProductsBtn");
  if (btn) {
    btn.disabled = (count === 0);
  }

  var selectAll = document.getElementById("selectAllDeleteProductsCheckbox");
  if (selectAll) {
    selectAll.checked = (visibleTotalCount > 0 && visibleSelectedCount === visibleTotalCount);
  }
}

function toggleSelectAllDeleteProducts(isChecked) {
  var searchInput = document.getElementById("deleteProductSearchInput");
  var query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  var filtered = products.filter(function(p) {
    if (!query) return true;
    return (p.name && p.name.toLowerCase().includes(query)) ||
           (p.productId && p.productId.toLowerCase().includes(query)) ||
           (p.category && p.category.toLowerCase().includes(query));
  });

  filtered.forEach(function(p) {
    if (isChecked) {
      selectedProductIdsToDelete.add(p.id);
    } else {
      selectedProductIdsToDelete.delete(p.id);
    }
  });

  renderDeleteProductsList();
}

function confirmAndExecuteDeleteProducts() {
  var count = selectedProductIdsToDelete.size;
  if (count === 0) return;

  var confirmed = confirm("Are you sure you want to delete the selected products?");
  if (!confirmed) return;

  var idsToDelete = Array.from(selectedProductIdsToDelete);

  fetch('/api/products/batch-delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: idsToDelete })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (!data.success) {
      alert(data.error || "Failed to delete products.");
      return;
    }

    products = products.filter(function(p) { return !idsToDelete.includes(p.id); });
    saveProducts();
    saveDataAll();
    closeModal("deleteProductsModal");
    renderProductsGrid();
    renderDashboard();
    renderActiveView();
    var deletedCount = data.deletedCount || idsToDelete.length;
    showToast("Successfully deleted " + deletedCount + " product" + (deletedCount === 1 ? "" : "s") + ".", "fa-trash-can");
  })
  .catch(function() {
    // Local fallback
    products = products.filter(function(p) { return !idsToDelete.includes(p.id); });
    saveProducts();
    saveDataAll();
    closeModal("deleteProductsModal");
    renderProductsGrid();
    renderDashboard();
    renderActiveView();
    showToast("Successfully deleted " + idsToDelete.length + " product" + (idsToDelete.length === 1 ? "" : "s") + ".", "fa-trash-can");
  });
}

function showToast(message, icon) {
  var oldToast = document.querySelector(".toast-notification");
  if (oldToast) oldToast.remove();

  var toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = '<i class="fa-solid ' + (icon || 'fa-circle-check') + '" style="color:#10B981;"></i> ' + escapeHtml(message);
  document.body.appendChild(toast);

  setTimeout(function() {
    if (toast.parentElement) toast.remove();
  }, 3000);
}

// --------------------------------------------------------------------------
// 13. SHOPPING CART SYSTEM
// --------------------------------------------------------------------------

function updateCartBadge() {
  var totalQty = cart.reduce(function(sum, item) {
    return sum + (parseInt(item.quantity, 10) || 0);
  }, 0);
  var badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = totalQty;
  }
  var sideBadge = document.getElementById("sidebarCartBadge");
  if (sideBadge) {
    sideBadge.textContent = totalQty;
  }
}

function openCartPanel() {
  var panel = document.getElementById("cartPanel");
  var overlay = document.getElementById("cartOverlay");
  if (panel) panel.classList.add("active");
  if (overlay) overlay.classList.add("active");
  renderCartPanel();
}

function closeCartPanel() {
  var panel = document.getElementById("cartPanel");
  var overlay = document.getElementById("cartOverlay");
  if (panel) panel.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}

function addToCart(productId) {
  var product = products.find(function(p) { return String(p.id) === String(productId); });
  if (!product) { alert("Product not found."); return; }
  if (product.stock <= 0) { alert("Sorry, " + product.name + " is currently out of stock."); return; }

  var existingIndex = cart.findIndex(function(item) {
    return String(item.productId || item.id) === String(product.id);
  });

  if (existingIndex !== -1) {
    if (cart[existingIndex].quantity + 1 > product.stock) {
      alert("Cannot add more! Only " + product.stock + " units available in stock.");
      return;
    }
    cart[existingIndex].quantity += 1;
    cart[existingIndex].name = product.name;
    cart[existingIndex].productName = product.name;
    cart[existingIndex].price = product.price;
    cart[existingIndex].image = product.image;
  } else {
    cart.push({
      productId: product.id,
      id: product.id,
      name: product.name,
      productName: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }

  saveCart();
  updateCartBadge();
  showToast("Added " + product.name + " to cart", "fa-cart-plus");

  var panel = document.getElementById("cartPanel");
  if (panel && panel.classList.contains("active")) {
    renderCartPanel();
  }
}

function updateCartQty(productId, delta) {
  var itemIndex = cart.findIndex(function(i) {
    return String(i.productId || i.id) === String(productId);
  });
  if (itemIndex === -1) return;

  var item = cart[itemIndex];
  var product = products.find(function(p) { return String(p.id) === String(productId); });
  var newQty = (item.quantity || 1) + delta;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  if (product && newQty > product.stock) {
    alert("Only " + product.stock + " units available in stock.");
    return;
  }

  cart[itemIndex].quantity = newQty;
  saveCart();
  updateCartBadge();
  renderCartPanel();
}

function removeFromCart(productId) {
  cart = cart.filter(function(i) {
    return String(i.productId || i.id) !== String(productId);
  });
  saveCart();
  updateCartBadge();
  renderCartPanel();
}

function renderCartPanel() {
  var listEl = document.getElementById("cartItemsList");
  var totalEl = document.getElementById("cartTotalAmount");
  var checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (!listEl) return;

  listEl.innerHTML = "";

  if (cart.length === 0) {
    listEl.innerHTML = '<div class="cart-empty-msg"><i class="fa-solid fa-cart-arrow-down"></i><p>Your shopping cart is empty.</p></div>';
    if (totalEl) totalEl.textContent = "\u20b90";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;
  var totalAmount = 0;

  cart.forEach(function(item) {
    var prod = products.find(function(p) { return String(p.id) === String(item.productId || item.id); }) || item;
    var price = item.price || (prod ? prod.price : 0);
    var name = item.name || (prod ? prod.name : "Product");
    var image = item.image || (prod ? prod.image : "images/products/nova-x1.svg");
    var subtotal = price * item.quantity;
    totalAmount += subtotal;

    var div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = '<div class="cart-item-img"><img src="' + image + '" alt="' + escapeHtml(name) + '" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><rect width=%2240%22 height=%2240%22 fill=%22%23eee%22/></svg>\';"></div>' +
      '<div class="cart-item-info">' +
      '<h4>' + escapeHtml(name) + '</h4>' +
      '<div class="cart-item-price">\u20b9' + price.toLocaleString() + '</div>' +
      '<div class="cart-item-subtotal">Subtotal: \u20b9' + subtotal.toLocaleString() + '</div>' +
      '<div class="cart-qty-controls">' +
      '<button type="button" onclick="updateCartQty(' + item.productId + ', -1)">-</button>' +
      '<span>' + item.quantity + '</span>' +
      '<button type="button" onclick="updateCartQty(' + item.productId + ', 1)">+</button>' +
      '</div></div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + item.productId + ')" title="Remove item"><i class="fa-solid fa-trash-can"></i></button>';

    listEl.appendChild(div);
  });

  if (totalEl) totalEl.textContent = "\u20b9" + totalAmount.toLocaleString();
}

function updateCheckoutCalculations() {
  var custId = document.getElementById("checkoutSelectedCustId") ? document.getElementById("checkoutSelectedCustId").value : "";
  var customer = customers.find(function(c) { return c.id === custId; });
  var availablePoints = customer ? (customer.points || 0) : 0;

  var subtotal = 0;
  if (cart && cart.length > 0) {
    cart.forEach(function(item) {
      var prod = products.find(function(p) { return String(p.id) === String(item.productId || item.id); });
      var price = item.price || (prod ? prod.price : 0);
      subtotal += price * item.quantity;
    });
  }

  var reward = calculateRewardDiscount(availablePoints, subtotal);
  var discount = reward.discount;
  var pointsRedeemed = reward.pointsRedeemed;
  var finalAmount = Math.max(0, subtotal - discount);
  var earnedPoints = calculatePoints(finalAmount);
  var remainingPoints = (availablePoints - pointsRedeemed) + earnedPoints;

  var subtotalEl = document.getElementById("checkoutSubtotal");
  var availPointsEl = document.getElementById("checkoutAvailablePoints");
  var discountEl = document.getElementById("checkoutDiscount");
  var redeemedPointsEl = document.getElementById("checkoutPointsRedeemed");
  var totalEl = document.getElementById("checkoutTotal");
  var pointsEl = document.getElementById("checkoutPoints");
  var remainingPointsEl = document.getElementById("checkoutRemainingPoints");
  var tierRow = document.getElementById("checkoutTierRow");
  var projectedTierEl = document.getElementById("checkoutProjectedTier");

  if (subtotalEl) subtotalEl.textContent = "\u20b9" + subtotal.toLocaleString();
  if (availPointsEl) availPointsEl.textContent = availablePoints.toLocaleString() + " pts";
  if (discountEl) {
    if (discount > 0) {
      discountEl.textContent = "-\u20b9" + discount.toLocaleString() + " (" + pointsRedeemed.toLocaleString() + " pts redeemed)";
      discountEl.style.color = "#10b981";
    } else {
      discountEl.textContent = "No reward available yet";
      discountEl.style.color = "var(--text-muted)";
    }
  }
  if (redeemedPointsEl) redeemedPointsEl.textContent = pointsRedeemed > 0 ? (pointsRedeemed.toLocaleString() + " pts") : "0 pts";
  if (totalEl) totalEl.textContent = "\u20b9" + finalAmount.toLocaleString();
  if (pointsEl) pointsEl.textContent = "+" + earnedPoints.toLocaleString() + " Points";
  if (remainingPointsEl) remainingPointsEl.textContent = remainingPoints.toLocaleString() + " pts";

  if (customer && tierRow && projectedTierEl) {
    var projectedSpending = (customer.totalSpending || 0) + finalAmount;
    var projectedTier = calculateMembership(projectedSpending);
    projectedTierEl.textContent = projectedTier + (projectedTier !== customer.membership ? " (Upgrading to " + projectedTier + "!)" : "");
    tierRow.style.display = "flex";
  } else if (tierRow) {
    tierRow.style.display = "none";
  }
}

function openCartCheckout() {
  if (cart.length === 0) {
    alert("Your shopping cart is empty!");
    return;
  }
  closeCartPanel();

  var summaryEl = document.getElementById("checkoutCartSummary");
  if (summaryEl) {
    summaryEl.innerHTML = "";
    var totalAmount = 0;
    cart.forEach(function(item) {
      var prod = products.find(function(p) { return String(p.id) === String(item.productId || item.id); }) || item;
      var price = item.price || (prod ? prod.price : 0);
      var name = item.name || (prod ? prod.name : "Product");
      var subtotal = price * item.quantity;
      totalAmount += subtotal;

      var div = document.createElement("div");
      div.className = "checkout-summary-item";
      div.innerHTML = '<div class="item-name">' + escapeHtml(name) + ' <small class="item-detail">(\u00d7' + item.quantity + ' @ \u20b9' + price.toLocaleString() + ')</small></div>' +
        '<strong>\u20b9' + subtotal.toLocaleString() + '</strong>';
      summaryEl.appendChild(div);
    });
  }

  var custSearchInput = document.getElementById("checkoutCustSearch");
  var selectedCustIdInput = document.getElementById("checkoutSelectedCustId");
  var custResultsDiv = document.getElementById("checkoutCustResults");
  var custInfoDiv = document.getElementById("checkoutSelectedCustInfo");
  var newCustForm = document.getElementById("checkoutNewCustForm");

  if (custSearchInput) custSearchInput.value = "";
  if (selectedCustIdInput) selectedCustIdInput.value = "";
  if (custResultsDiv) { custResultsDiv.innerHTML = ""; custResultsDiv.classList.remove("active"); }
  if (custInfoDiv) { custInfoDiv.style.display = "none"; custInfoDiv.innerHTML = ""; }
  if (newCustForm) newCustForm.style.display = "none";

  if (currentSelectedCustomerId) {
    selectCustomerForCheckout(currentSelectedCustomerId);
  } else {
    updateCheckoutCalculations();
  }

  var checkoutDateInput = document.getElementById("checkoutDate");
  if (checkoutDateInput) checkoutDateInput.value = new Date().toISOString().split('T')[0];

  openModal("cartCheckoutModal");
}

function searchCustomersForCheckout(query) {
  var resultsDiv = document.getElementById("checkoutCustResults");
  if (!resultsDiv) return;

  var q = (query || "").toLowerCase().trim();

  function renderCheckoutList(list) {
    resultsDiv.innerHTML = "";
    if (list.length > 0) {
      list.slice(0, 5).forEach(function(cust) {
        var item = document.createElement("div");
        item.className = "cust-result-item";
        item.innerHTML = '<strong>' + escapeHtml(cust.name) + ' <span class="tier-badge ' + (cust.membership || 'bronze').toLowerCase() + '" style="font-size:10px;padding:1px 6px;">' + (cust.membership || 'Bronze') + '</span></strong>' +
          '<small>' + cust.id + ' \u2022 ' + (cust.phone || 'No phone') + '</small>';
        item.onclick = function() { selectCustomerForCheckout(cust.id); };
        resultsDiv.appendChild(item);
      });
    }
    var addNewItem = document.createElement("div");
    addNewItem.className = "cust-result-add-new";
    addNewItem.innerHTML = '<i class="fa-solid fa-user-plus"></i> + Add New Customer';
    addNewItem.onclick = function() {
      resultsDiv.classList.remove("active");
      var form = document.getElementById("checkoutNewCustForm");
      if (form) {
        form.style.display = "block";
        var nameInput = document.getElementById("checkoutNewCustName");
        if (nameInput) {
          nameInput.value = q;
          nameInput.focus();
        }
      }
    };
    resultsDiv.appendChild(addNewItem);
    resultsDiv.classList.add("active");
  }

  var matched = customers.filter(function(c) {
    return c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q));
  });
  renderCheckoutList(matched);

  if (q.length > 0) {
    fetch(API_BASE + '/api/customers?q=' + encodeURIComponent(q))
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res && res.success && Array.isArray(res.customers)) {
          res.customers.forEach(function(sc) {
            if (!customers.some(function(c) { return c.id === sc.id; })) {
              customers.push(sc);
            }
          });
          renderCheckoutList(res.customers);
        }
      })
      .catch(function() {});
  }
}

function selectCustomerForCheckout(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;

  var selectedIdInput = document.getElementById("checkoutSelectedCustId");
  if (selectedIdInput) selectedIdInput.value = cust.id;

  var infoDiv = document.getElementById("checkoutSelectedCustInfo");
  if (infoDiv) {
    infoDiv.style.display = "flex";
    infoDiv.innerHTML = '<span><i class="fa-solid fa-user-check"></i> ' + escapeHtml(cust.name) + ' (' + cust.id + ' \u2022 ' + (cust.phone || '') + ') <span class="tier-badge ' + (cust.membership || 'bronze').toLowerCase() + '" style="font-size:10px;padding:2px 6px;margin-left:6px;">' + (cust.membership || 'Bronze') + '</span></span>' +
      '<button type="button" class="clear-cust" onclick="clearCheckoutSelectedCustomer()">&times;</button>';
  }

  var resultsDiv = document.getElementById("checkoutCustResults");
  if (resultsDiv) resultsDiv.classList.remove("active");

  var searchInput = document.getElementById("checkoutCustSearch");
  if (searchInput) searchInput.value = "";

  var newForm = document.getElementById("checkoutNewCustForm");
  if (newForm) newForm.style.display = "none";

  updateCheckoutCalculations();
}

function clearCheckoutSelectedCustomer() {
  var selectedIdInput = document.getElementById("checkoutSelectedCustId");
  if (selectedIdInput) selectedIdInput.value = "";

  var infoDiv = document.getElementById("checkoutSelectedCustInfo");
  if (infoDiv) { infoDiv.style.display = "none"; infoDiv.innerHTML = ""; }

  updateCheckoutCalculations();
}

function createCustomerFromCheckout() {
  var name = document.getElementById("checkoutNewCustName").value.trim();
  var phone = document.getElementById("checkoutNewCustPhone").value.trim();

  if (!name || !phone) {
    alert("Please enter both Name and Phone number for the new customer.");
    return;
  }

  var existing = customers.find(function(c) { return c.phone === phone; });
  if (existing) {
    alert("A customer with phone " + phone + " already exists: " + existing.name + ". Selected existing customer.");
    selectCustomerForCheckout(existing.id);
    return;
  }

  fetch(API_BASE + '/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, phone: phone })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (!data.success) {
      alert(data.error || "Failed to create customer.");
      return;
    }
    var newCust = data.customer;
    var idx = customers.findIndex(function(c) { return c.id === newCust.id; });
    if (idx !== -1) customers[idx] = newCust;
    else customers.push(newCust);
    saveCustomers();
    renderCustomersTable();
    selectCustomerForCheckout(newCust.id);
    showToast("Customer created: " + newCust.name, "fa-user-check");
  })
  .catch(function(err) {
    alert("Error communicating with central server. Please check connection.");
  });
}

function handleCartCheckoutPurchase() {
  var custId = document.getElementById("checkoutSelectedCustId").value;
  if (!custId) {
    var searchInput = document.getElementById("checkoutCustSearch");
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (query) {
      var found = customers.find(function(c) {
        return c.phone === query ||
               (c.phone && c.phone.toLowerCase() === query) ||
               c.id.toLowerCase() === query ||
               c.name.toLowerCase() === query;
      });
      if (found) {
        custId = found.id;
        selectCustomerForCheckout(found.id);
      }
    }
  }

  if (!custId) {
    alert("Please search and select a customer (or add a new one) to complete this purchase.");
    return;
  }

  var customer = customers.find(function(c) { return c.id === custId; });
  if (!customer) { alert("Selected customer not found."); return; }

  if (!cart || cart.length === 0) { alert("Cart is empty."); return; }

  // 1. Validate all products exist and requested quantity is available in stock
  for (var i = 0; i < cart.length; i++) {
    var cItem = cart[i];
    var prod = products.find(function(p) { return String(p.id) === String(cItem.productId || cItem.id); });
    if (!prod) { alert("Product not found in catalogue."); return; }
    if (cItem.quantity > prod.stock) {
      alert("Insufficient stock for " + prod.name + "! Available: " + prod.stock + ", in cart: " + cItem.quantity);
      return;
    }
  }

  var paymentMethod = document.getElementById("checkoutPayment").value || "Online";
  var date = document.getElementById("checkoutDate").value || new Date().toISOString().split('T')[0];

  var payload = {
    customerId: custId,
    items: cart.map(function(item) {
      return {
        productId: item.productId || item.id,
        quantity: item.quantity
      };
    }),
    paymentMethod: paymentMethod,
    date: date
  };

  fetch('/api/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(res) { return res.json(); })
  .then(function(result) {
    if (!result.success) {
      alert(result.error || "Order failed.");
      return;
    }

    if (result.updatedProducts) {
      products = result.updatedProducts;
    }
    var custIdx = customers.findIndex(function(c) { return c.id === result.customer.id; });
    if (custIdx !== -1) customers[custIdx] = result.customer;
    else customers.push(result.customer);

    transactions.unshift(result.transaction);
    cart = [];
    saveDataAll();
    updateCartBadge();
    closeModal("cartCheckoutModal");

    var msg = "Order completed successfully!\nCustomer: " + result.customer.name +
      "\nTxn: " + result.transaction.transactionId +
      "\nSubtotal: \u20b9" + (result.subtotal != null ? result.subtotal : result.totalAmount).toLocaleString();
    if (result.discount > 0) {
      msg += "\nReward Discount: -\u20b9" + result.discount.toLocaleString() + " (" + result.pointsRedeemed + " pts redeemed)";
    }
    msg += "\nFinal Amount Paid: \u20b9" + (result.finalAmount != null ? result.finalAmount : result.totalAmount).toLocaleString() +
      "\nPoints Earned: +" + result.earnedPoints + " pts" +
      "\nRemaining Points Balance: " + (result.remainingPoints != null ? result.remainingPoints : result.customer.points) + " pts" +
      "\nTier: " + result.customer.membership;
    alert(msg);

    currentSelectedCustomerId = result.customer.id;
    renderProductsGrid();
    renderCustomersTable();
    renderTransactionsTable();
    renderDashboard();
    renderRewardsPage();
    renderActiveView();

    if (currentSelectedCustomerId === custId) {
      viewCustomerProfile(custId);
    }
  })
  .catch(function() {
    // Local fallback
    var subtotal = 0;
    for (var j = 0; j < cart.length; j++) {
      var item = cart[j];
      var p = products.find(function(prod) { return String(prod.id) === String(item.productId || item.id); }) || item;
      subtotal += (p.price * item.quantity);
    }

    var availablePoints = customer.points || 0;
    var reward = calculateRewardDiscount(availablePoints, subtotal);
    var discount = reward.discount;
    var pointsRedeemed = reward.pointsRedeemed;
    var finalAmount = Math.max(0, subtotal - discount);
    var earnedPoints = calculatePoints(finalAmount);
    var remainingPoints = (availablePoints - pointsRedeemed) + earnedPoints;

    cart.forEach(function(cItem) {
      var prod = products.find(function(p) { return String(p.id) === String(cItem.productId || cItem.id); });
      if (prod) {
        prod.stock -= cItem.quantity;
      }
    });

    customer.totalSpending = (customer.totalSpending || 0) + finalAmount;
    customer.points = remainingPoints;
    customer.purchasesCount = (customer.purchasesCount || 0) + 1;

    var oldTier = customer.membership;
    var newTier = calculateMembership(customer.totalSpending);
    customer.membership = newTier;
    customer.rewards = getUnlockedRewards(customer);

    var rewardNote = pointsRedeemed > 0 ? "Auto-Redeemed " + pointsRedeemed + " pts (\u20b9" + discount + " OFF)" : (oldTier !== newTier ? "Upgraded to " + newTier + " Tier!" : "Purchase Completed");

    var txnId = generateNextTransactionId();
    var productSummary = cart.map(function(cItem) {
      var prod = products.find(function(p) { return String(p.id) === String(cItem.productId || cItem.id); }) || cItem;
      return prod.name + (cItem.quantity > 1 ? " (\u00d7" + cItem.quantity + ")" : "");
    }).join(", ");
    var totalCartQty = cart.reduce(function(sum, cItem) { return sum + cItem.quantity; }, 0);

    var newTxn = {
      transactionId: txnId,
      customerId: customer.id,
      customerName: customer.name,
      productId: cart[0].productId,
      productName: productSummary,
      quantity: totalCartQty,
      amount: finalAmount,
      subtotal: subtotal,
      discount: discount,
      finalAmount: finalAmount,
      pointsRedeemed: pointsRedeemed,
      remainingPoints: remainingPoints,
      paymentMethod: paymentMethod,
      points: earnedPoints,
      date: date,
      rewardActivity: rewardNote
    };
    transactions.unshift(newTxn);

    cart = [];
    saveDataAll();
    updateCartBadge();
    closeModal("cartCheckoutModal");

    var msg = "Order completed successfully!\nCustomer: " + customer.name +
      "\nTxn: " + txnId +
      "\nSubtotal: \u20b9" + subtotal.toLocaleString();
    if (discount > 0) {
      msg += "\nReward Discount: -\u20b9" + discount.toLocaleString() + " (" + pointsRedeemed + " pts redeemed)";
    }
    msg += "\nFinal Amount Paid: \u20b9" + finalAmount.toLocaleString() +
      "\nPoints Earned: +" + earnedPoints + " pts" +
      "\nRemaining Points Balance: " + remainingPoints + " pts" +
      "\nTier: " + newTier;
    alert(msg);

    currentSelectedCustomerId = customer.id;
    renderProductsGrid();
    renderCustomersTable();
    renderTransactionsTable();
    renderDashboard();
    renderRewardsPage();
    renderActiveView();

    if (currentSelectedCustomerId === customer.id) {
      viewCustomerProfile(customer.id);
    }
  });
}

// --------------------------------------------------------------------------
// 14. BACKUP SYSTEM (EXPORT, IMPORT, RESET)
// --------------------------------------------------------------------------

function exportData() {
  var dataExport = {
    customers: customers,
    products: products,
    transactions: transactions,
    exportedAt: new Date().toISOString()
  };

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataExport, null, 2));
  var downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "gadgetgrid_backup_" + new Date().toISOString().slice(0, 10) + ".json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importData(event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var parsed = JSON.parse(e.target.result);
      if (parsed.customers && parsed.products && parsed.transactions) {
        customers = parsed.customers;
        products = parsed.products;
        transactions = parsed.transactions;
        saveDataAll();
        alert("Data imported successfully!");
        closeModal("backupModal");
        renderDashboard();
      } else {
        alert("Invalid backup file format.");
      }
    } catch(err) {
      alert("Error parsing backup JSON file: " + err.message);
    }
  };
  reader.readAsText(file);
}

// --------------------------------------------------------------------------
// 14.1 LOYALTY PROGRAM RATIO SETTINGS
// --------------------------------------------------------------------------

function updateLoyaltySettingsUI() {
  var spendInput = document.getElementById("settingSpendingAmount");
  var ptsInput = document.getElementById("settingPointsEarned");
  var previewEl = document.getElementById("currentRatioPreview");
  var badgeEl = document.getElementById("settingRatioBadge");

  var spend = (loyaltyConfig && loyaltyConfig.spendingAmount > 0) ? Number(loyaltyConfig.spendingAmount) : 500;
  var pts = (loyaltyConfig && loyaltyConfig.pointsEarned > 0) ? Number(loyaltyConfig.pointsEarned) : 10;

  if (spendInput && document.activeElement !== spendInput) spendInput.value = spend;
  if (ptsInput && document.activeElement !== ptsInput) ptsInput.value = pts;

  if (previewEl) {
    previewEl.textContent = pts + " points per ₹" + Number(spend).toLocaleString() + " spent";
  }
  if (badgeEl) {
    badgeEl.textContent = pts + " pts / ₹" + Number(spend).toLocaleString();
  }
}

function handleSaveLoyaltyRatio(e) {
  if (e && e.preventDefault) e.preventDefault();

  var spendInput = document.getElementById("settingSpendingAmount");
  var ptsInput = document.getElementById("settingPointsEarned");

  var spend = parseInt(spendInput.value, 10);
  var pts = parseInt(ptsInput.value, 10);

  if (isNaN(spend) || spend <= 0) {
    alert("Please enter a valid spending amount greater than 0.");
    if (spendInput) spendInput.focus();
    return;
  }
  if (isNaN(pts) || pts <= 0) {
    alert("Please enter a valid points amount greater than 0.");
    if (ptsInput) ptsInput.focus();
    return;
  }

  fetch(API_BASE + '/api/settings/loyalty', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ spendingAmount: spend, pointsEarned: pts })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data && data.success && data.loyalty) {
      loyaltyConfig = {
        spendingAmount: Number(data.loyalty.spendingAmount),
        pointsEarned: Number(data.loyalty.pointsEarned)
      };
      localStorage.setItem("gadgetgrid_loyalty_config", JSON.stringify(loyaltyConfig));
      updateLoyaltySettingsUI();

      var successMsg = document.getElementById("loyaltyRatioSuccessMsg");
      if (successMsg) {
        successMsg.style.display = "block";
        setTimeout(function() {
          if (successMsg) successMsg.style.display = "none";
        }, 4000);
      }
      showToast("Point earning ratio saved: " + pts + " pts per ₹" + Number(spend).toLocaleString(), "fa-circle-check");
      renderActiveView();
    } else {
      alert((data && data.error) || "Failed to update point earning ratio.");
    }
  })
  .catch(function() {
    // Local fallback
    loyaltyConfig = { spendingAmount: spend, pointsEarned: pts };
    localStorage.setItem("gadgetgrid_loyalty_config", JSON.stringify(loyaltyConfig));
    updateLoyaltySettingsUI();
    var successMsg = document.getElementById("loyaltyRatioSuccessMsg");
    if (successMsg) {
      successMsg.style.display = "block";
      setTimeout(function() {
        if (successMsg) successMsg.style.display = "none";
      }, 4000);
    }
    showToast("Point earning ratio saved (offline): " + pts + " pts per ₹" + Number(spend).toLocaleString(), "fa-circle-check");
    renderActiveView();
  });
}

function clearDemoData() {
  var confirmReset = confirm("Are you sure you want to reset all data to default demo state? Custom added data will be erased.");
  if (!confirmReset) return;

  fetch('/api/reset', { method: 'POST' })
    .then(function() {
      localStorage.removeItem("gadgetgrid_customers");
      localStorage.removeItem("gadgetgrid_products");
      localStorage.removeItem("gadgetgrid_transactions");
      localStorage.removeItem("gadgetgrid_cart");
      localStorage.removeItem("electroloyal_customers");
      localStorage.removeItem("electroloyal_products");
      localStorage.removeItem("electroloyal_transactions");
      localStorage.removeItem("electroloyal_cart");
      cart = [];
      syncFromServer(function() {
        updateCartBadge();
        alert("Data reset to initial demo state!");
        closeModal("backupModal");
        renderDashboard();
      });
    })
    .catch(function() {
      localStorage.removeItem("gadgetgrid_customers");
      localStorage.removeItem("gadgetgrid_products");
      localStorage.removeItem("gadgetgrid_transactions");
      localStorage.removeItem("gadgetgrid_cart");
      localStorage.removeItem("electroloyal_customers");
      localStorage.removeItem("electroloyal_products");
      localStorage.removeItem("electroloyal_transactions");
      localStorage.removeItem("electroloyal_cart");
      loadData();
      updateCartBadge();
      alert("Data reset to initial demo state!");
      closeModal("backupModal");
      renderDashboard();
    });
}

// --------------------------------------------------------------------------
// 15. MODAL HELPERS & UTILITIES
// --------------------------------------------------------------------------

function openModal(modalId) {
  if (modalId === "productModal") {
    var delModal = document.getElementById("deleteProductsModal");
    if (delModal) delModal.classList.remove("active");
  } else if (modalId === "deleteProductsModal") {
    var prodModal = document.getElementById("productModal");
    if (prodModal) prodModal.classList.remove("active");
  }

  var modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
  if (modalId === "productModal") {
    closeAddProductModal();
  } else if (modalId === "deleteProductsModal") {
    closeDeleteProductsModal();
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------------------------------------------------------------------------
// 16. CATEGORY FILTER CHIPS
// --------------------------------------------------------------------------

function initCategoryChips() {
  var chips = document.querySelectorAll(".category-chip");
  var selectFilter = document.getElementById("productCategoryFilter");
  if (!chips.length) return;

  chips.forEach(function(chip) {
    chip.addEventListener("click", function() {
      chips.forEach(function(c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var cat = chip.getAttribute("data-category") || "All";
      if (selectFilter) {
        selectFilter.value = cat;
      }
      renderProductsGrid();
    });
  });

  if (selectFilter) {
    selectFilter.addEventListener("change", function() {
      var currentVal = selectFilter.value;
      chips.forEach(function(c) {
        if (c.getAttribute("data-category") === currentVal) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });
    });
  }
}

// --------------------------------------------------------------------------
// 17. EVENT LISTENERS INITIALIZATION
// --------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  loadData();
  updateCartBadge();
  initCategoryChips();
  initRealTimeSync();
  syncFromServer();
  updateLoyaltySettingsUI();

  var loyaltyForm = document.getElementById("loyaltyRatioForm");
  if (loyaltyForm) loyaltyForm.addEventListener("submit", handleSaveLoyaltyRatio);

  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function(item) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      var pageId = item.dataset.page;
      navigateTo(pageId);
    });
  });

  var addCustBtn = document.getElementById("openAddCustomerModalBtn");
  if (addCustBtn) addCustBtn.addEventListener("click", openAddCustomerModal);
  var addProdBtn = document.getElementById("openAddProductModalBtn");
  if (addProdBtn) addProdBtn.addEventListener("click", openAddProductModal);
  initProductActionMenu();
  var backupBtn = document.getElementById("backupBtn");
  if (backupBtn) backupBtn.addEventListener("click", function() { openModal("backupModal"); });

  var custForm = document.getElementById("customerForm");
  if (custForm) custForm.addEventListener("submit", handleSaveCustomer);
  var purchForm = document.getElementById("purchaseForm");
  if (purchForm) purchForm.addEventListener("submit", handleCompletePurchase);
  var prodForm = document.getElementById("productForm");
  if (prodForm) prodForm.addEventListener("submit", handleSaveProduct);

  var purchSelect = document.getElementById("purchProductSelect");
  if (purchSelect) purchSelect.addEventListener("change", updatePurchaseCalculations);
  var purchQtyInput = document.getElementById("purchQty");
  if (purchQtyInput) purchQtyInput.addEventListener("input", updatePurchaseCalculations);

  var custSearch = document.getElementById("customerSearchInput");
  if (custSearch) {
    custSearch.addEventListener("input", function(e) {
      var val = e.target.value;
      renderCustomersTable(val);
      if (val && val.trim().length > 0) {
        fetch(API_BASE + '/api/customers?q=' + encodeURIComponent(val.trim()))
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data && data.success && Array.isArray(data.customers)) {
              data.customers.forEach(function(sc) {
                if (!customers.some(function(c) { return c.id === sc.id; })) {
                  customers.push(sc);
                }
              });
              renderCustomersTable(val);
            }
          })
          .catch(function() {});
      }
    });
  }
  var prodSearch = document.getElementById("productSearchInput");
  if (prodSearch) prodSearch.addEventListener("input", renderProductsGrid);
  var prodCat = document.getElementById("productCategoryFilter");
  if (prodCat) prodCat.addEventListener("change", renderProductsGrid);
  var prodPrice = document.getElementById("productPriceFilter");
  if (prodPrice) prodPrice.addEventListener("change", renderProductsGrid);
  var txnSearch = document.getElementById("transactionSearchInput");
  if (txnSearch) txnSearch.addEventListener("input", function(e) { renderTransactionsTable(e.target.value); });

  // Global Header Search Across Customers, Products & Transactions
  initGlobalHeaderSearch();

  // User Profile Dropdown
  initUserProfileDropdown();

  // 3D Electronics Mouse Parallax
  initHero3DParallax();

  var checkoutCustInput = document.getElementById("checkoutCustSearch");
  if (checkoutCustInput) {
    checkoutCustInput.addEventListener("input", function(e) {
      searchCustomersForCheckout(e.target.value);
    });
    checkoutCustInput.addEventListener("focus", function(e) {
      searchCustomersForCheckout(e.target.value);
    });
  }

  var purchCustInput = document.getElementById("purchCustSearch");
  if (purchCustInput) {
    purchCustInput.addEventListener("input", function(e) {
      searchCustomersForPurchase(e.target.value);
    });
    purchCustInput.addEventListener("focus", function(e) {
      searchCustomersForPurchase(e.target.value);
    });
  }

  document.addEventListener("click", function(e) {
    var checkoutWrap = document.querySelector("#cartCheckoutModal .customer-search-wrap");
    var checkoutResults = document.getElementById("checkoutCustResults");
    if (checkoutWrap && checkoutResults && !checkoutWrap.contains(e.target)) {
      checkoutResults.classList.remove("active");
    }

    var purchWrap = document.querySelector("#purchaseModal .customer-search-wrap");
    var purchResults = document.getElementById("purchCustResults");
    if (purchWrap && purchResults && !purchWrap.contains(e.target)) {
      purchResults.classList.remove("active");
    }
  });

  renderDashboard();
});

// --------------------------------------------------------------------------
// 18. 3D HERO INTERACTION, GLOBAL SEARCH & PROFILE DROPDOWN
// --------------------------------------------------------------------------

function initHero3DParallax() {
  var stage = document.getElementById("dashboardHeroStage");
  if (!stage) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var layers = stage.querySelectorAll(".scene-layer");

  stage.addEventListener("mousemove", function(e) {
    var rect = stage.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var deltaX = (x - centerX) / centerX; // -1 to 1
    var deltaY = (y - centerY) / centerY; // -1 to 1

    layers.forEach(function(layer) {
      var depth = parseFloat(layer.getAttribute("data-depth")) || 0.05;
      var moveX = deltaX * depth * 80;
      var moveY = deltaY * depth * 80;
      var rotX = -deltaY * depth * 25;
      var rotY = deltaX * depth * 25;
      layer.style.transform = "translate3d(" + moveX + "px, " + moveY + "px, 0) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
    });
  });

  stage.addEventListener("mouseleave", function() {
    layers.forEach(function(layer) {
      layer.style.transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
    });
  });
}

function initUserProfileDropdown() {
  var trigger = document.getElementById("userProfileDropdownTrigger");
  var dropdown = document.getElementById("userProfileDropdown");
  if (!trigger || !dropdown) return;

  trigger.addEventListener("click", function(e) {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", function(e) {
    if (!trigger.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}

function initGlobalHeaderSearch() {
  var input = document.getElementById("globalSearchInput");
  var resultsBox = document.getElementById("globalSearchResults");
  if (!input || !resultsBox) return;

  input.addEventListener("input", function() {
    var q = input.value.trim().toLowerCase();
    if (q.length === 0) {
      resultsBox.innerHTML = "";
      resultsBox.classList.remove("active");
      return;
    }

    var matchingCusts = customers.filter(function(c) {
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || (c.phone || "").includes(q);
    }).slice(0, 3);

    var matchingProds = products.filter(function(p) {
      return p.name.toLowerCase().includes(q) || (p.productId || "").toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }).slice(0, 3);

    var matchingTxns = transactions.filter(function(t) {
      return t.transactionId.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q) || t.productName.toLowerCase().includes(q);
    }).slice(0, 3);

    if (matchingCusts.length === 0 && matchingProds.length === 0 && matchingTxns.length === 0) {
      resultsBox.innerHTML = '<div style="padding:14px; text-align:center; color:#6B7280; font-size:12px;">No results found for "' + escapeHtml(q) + '"</div>';
      resultsBox.classList.add("active");
      return;
    }

    var html = "";

    if (matchingCusts.length > 0) {
      html += '<div class="gs-group-header"><i class="fa-solid fa-users"></i> Customers</div>';
      matchingCusts.forEach(function(c) {
        html += '<div class="gs-item" onclick="viewCustomerProfile(\'' + c.id + '\'); closeGlobalSearchResults();">' +
          '<div class="gs-item-left"><i class="fa-solid fa-user"></i><div><div class="gs-item-title">' + escapeHtml(c.name) + '</div><div class="gs-item-sub">' + c.id + ' &bull; ' + (c.phone || "") + '</div></div></div>' +
          '<span class="tier-badge ' + c.membership.toLowerCase() + '" style="font-size:10px;">' + c.membership + '</span>' +
          '</div>';
      });
    }

    if (matchingProds.length > 0) {
      html += '<div class="gs-group-header"><i class="fa-solid fa-box-open"></i> Products</div>';
      matchingProds.forEach(function(p) {
        html += '<div class="gs-item" onclick="viewProductDetail(' + p.id + '); closeGlobalSearchResults();">' +
          '<div class="gs-item-left"><i class="fa-solid fa-microchip"></i><div><div class="gs-item-title">' + escapeHtml(p.name) + '</div><div class="gs-item-sub">' + escapeHtml(p.category) + ' &bull; \u20b9' + p.price.toLocaleString() + '</div></div></div>' +
          '<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCart(' + p.id + '); closeGlobalSearchResults();" style="padding:4px 8px;font-size:11px;"><i class="fa-solid fa-cart-plus"></i></button>' +
          '</div>';
      });
    }

    if (matchingTxns.length > 0) {
      html += '<div class="gs-group-header"><i class="fa-solid fa-receipt"></i> Transactions</div>';
      matchingTxns.forEach(function(t) {
        html += '<div class="gs-item" onclick="navigateTo(\'transactions\'); closeGlobalSearchResults();">' +
          '<div class="gs-item-left"><i class="fa-solid fa-file-invoice"></i><div><div class="gs-item-title">' + t.transactionId + ' &bull; ' + escapeHtml(t.customerName) + '</div><div class="gs-item-sub">' + escapeHtml(t.productName) + ' &bull; \u20b9' + t.amount.toLocaleString() + '</div></div></div>' +
          '<span class="points-pill" style="font-size:10px;">+' + t.points + ' pts</span>' +
          '</div>';
      });
    }

    resultsBox.innerHTML = html;
    resultsBox.classList.add("active");
  });

  document.addEventListener("click", function(e) {
    if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.classList.remove("active");
    }
  });
}

function closeGlobalSearchResults() {
  var box = document.getElementById("globalSearchResults");
  var input = document.getElementById("globalSearchInput");
  if (box) box.classList.remove("active");
  if (input) input.value = "";
}
