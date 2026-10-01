/* ==========================================================================
   ELECTROLOYAL - Electronics Retail Customer Loyalty Management System
   Vanilla JavaScript Application Logic
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. GLOBAL STATE & CONSTANTS
// --------------------------------------------------------------------------

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

const INITIAL_CUSTOMERS = [
  { id: "ELC-000001", name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "9876543210", dob: "1994-06-12", membership: "Gold", totalSpending: 7498, points: 140, purchasesCount: 2, createdAt: "2026-08-15" },
  { id: "ELC-000002", name: "Priya Patel", email: "priya.patel@example.com", phone: "9812345678", dob: "1998-11-20", membership: "Diamond", totalSpending: 34999, points: 690, purchasesCount: 1, createdAt: "2026-09-01" },
  { id: "ELC-000003", name: "Rohan Verma", email: "rohan.v@example.com", phone: "9988776655", dob: "2000-02-05", membership: "Bronze", totalSpending: 1499, points: 20, purchasesCount: 1, createdAt: "2026-09-10" },
  { id: "ELC-000004", name: "Ananya Roy", email: "ananya.roy@example.com", phone: "9765432109", dob: "1992-09-30", membership: "Silver", totalSpending: 3999, points: 70, purchasesCount: 1, createdAt: "2026-09-18" }
];

const INITIAL_TRANSACTIONS = [
  { transactionId: "TXN-000001", customerId: "ELC-000001", customerName: "Aarav Sharma", productId: 7, productName: "AirBeat Max", quantity: 1, amount: 4999, paymentMethod: "Online", points: 90, date: "2026-09-05", rewardActivity: "Silver Offer Unlocked" },
  { transactionId: "TXN-000002", customerId: "ELC-000001", customerName: "Aarav Sharma", productId: 33, productName: "PowerBank 20K", quantity: 1, amount: 2499, paymentMethod: "Cash", points: 40, date: "2026-09-15", rewardActivity: "Gold Tier Reached" },
  { transactionId: "TXN-000003", customerId: "ELC-000002", customerName: "Priya Patel", productId: 2, productName: "Nova X1 Pro", quantity: 1, amount: 34999, paymentMethod: "Online", points: 690, date: "2026-09-20", rewardActivity: "Diamond Tier Reached" },
  { transactionId: "TXN-000004", customerId: "ELC-000003", customerName: "Rohan Verma", productId: 5, productName: "SoundPods Lite", quantity: 1, amount: 1499, paymentMethod: "Cash", points: 20, date: "2026-09-22", rewardActivity: "Bronze Birthday Reward" },
  { transactionId: "TXN-000005", customerId: "ELC-000004", customerName: "Ananya Roy", productId: 13, productName: "Boom 360", quantity: 1, amount: 3999, paymentMethod: "Online", points: 70, date: "2026-09-25", rewardActivity: "Silver Offer Unlocked" }
];

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
  var storedCust = localStorage.getItem("electroloyal_customers");
  var storedProd = localStorage.getItem("electroloyal_products");
  var storedTxn = localStorage.getItem("electroloyal_transactions");
  var storedCart = localStorage.getItem("electroloyal_cart");

  if (storedCust) { customers = JSON.parse(storedCust); } else { customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS)); saveCustomers(); }
  if (storedProd) { products = JSON.parse(storedProd); } else { products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)); saveProducts(); }

  var needsSave = false;
  for (var i = 0; i < products.length; i++) {
    if (!products[i].productId) { products[i].productId = "PRD-" + String(i + 1).padStart(6, '0'); needsSave = true; }
  }
  if (needsSave) saveProducts();

  if (storedTxn) { transactions = JSON.parse(storedTxn); } else { transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS)); saveTransactions(); }
  if (storedCart) { cart = JSON.parse(storedCart); } else { cart = []; }
}

function saveCustomers() { localStorage.setItem("electroloyal_customers", JSON.stringify(customers)); }
function saveProducts() { localStorage.setItem("electroloyal_products", JSON.stringify(products)); }
function saveTransactions() { localStorage.setItem("electroloyal_transactions", JSON.stringify(transactions)); }
function saveCart() { localStorage.setItem("electroloyal_cart", JSON.stringify(cart)); }
function saveDataAll() { saveCustomers(); saveProducts(); saveTransactions(); saveCart(); }

// --------------------------------------------------------------------------
// 3. CORE BUSINESS CALCULATIONS & RULES
// --------------------------------------------------------------------------

function calculatePoints(amount) {
  if (!amount || amount < 500) return 0;
  return Math.floor(amount / 500) * 10;
}

function calculateMembership(totalSpending) {
  var spending = totalSpending || 0;
  if (spending >= 10000) return "Diamond";
  if (spending >= 5000) return "Gold";
  if (spending >= 2500) return "Silver";
  return "Bronze";
}

function getUnlockedRewards(customer) {
  var rewards = [{ name: "Birthday Reward (5% OFF)", tier: "Bronze", description: "Special Birthday reward coupon", status: "Available" }];
  if (customer.totalSpending >= 2500 || customer.membership === "Silver" || customer.membership === "Gold" || customer.membership === "Diamond") {
    rewards.push({ name: "Silver Special Offer (\u20b9250 Voucher)", tier: "Silver", description: "5% discount on selected products", status: "Available" });
  }
  if (customer.totalSpending >= 5000 || customer.membership === "Gold" || customer.membership === "Diamond") {
    rewards.push({ name: "Gold Free Gift Package", tier: "Gold", description: "Free accessory gift box on qualifying purchase", status: "Available" });
  }
  if (customer.totalSpending >= 10000 || customer.membership === "Diamond") {
    rewards.push({ name: "Diamond Premium Gift & VIP Access", tier: "Diamond", description: "15% off + VIP launch invitations", status: "Available" });
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
  var totalPointsCount = 0;
  for (var i = 0; i < customers.length; i++) { totalPointsCount += (customers[i].points || 0); }
  var totalSalesAmount = 0;
  for (var i = 0; i < transactions.length; i++) { totalSalesAmount += (transactions[i].amount || 0); }
  var activeRewardsCount = 0;
  for (var i = 0; i < customers.length; i++) { activeRewardsCount += getUnlockedRewards(customers[i]).length; }

  // 1. Update 4 Top KPI Cards
  var elCust = document.getElementById("dashTotalCustomers");
  if (elCust) elCust.textContent = totalCustomersCount;
  var elPts = document.getElementById("dashTotalPoints");
  if (elPts) elPts.textContent = totalPointsCount.toLocaleString();
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
  renderDashboardSalesAndTopProducts(totalSalesAmount, totalPointsCount);
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

  // Aggregate sales by month from transactions
  var monthlyMap = { "May": 18500, "Jun": 24200, "Jul": 31000, "Aug": 42000, "Sep": 0, "Oct": 0 };
  var monthKeys = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Add recorded transactions to current months
  transactions.forEach(function(t) {
    if (t.date) {
      var d = new Date(t.date);
      if (!isNaN(d.getTime())) {
        var mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mName = mNames[d.getMonth()];
        if (monthlyMap[mName] !== undefined) {
          monthlyMap[mName] += (t.amount || 0);
        } else {
          monthlyMap["Sep"] += (t.amount || 0);
        }
      } else {
        monthlyMap["Sep"] += (t.amount || 0);
      }
    }
  });

  var values = monthKeys.map(function(k) { return monthlyMap[k]; });
  var maxVal = Math.max.apply(null, values) || 50000;
  if (maxVal < 50000) maxVal = 50000;

  var width = 600;
  var height = 180;
  var padX = 40;
  var padY = 25;
  var stepX = (width - padX * 2) / (values.length - 1);

  var points = [];
  for (var i = 0; i < values.length; i++) {
    var x = padX + i * stepX;
    var norm = values[i] / maxVal;
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
  points.forEach(function(pt, idx) {
    var barHeight = Math.max(12, (height - padY) - pt.y);
    var barX = pt.x - barWidth / 2;
    var barY = (height - padY) - barHeight;
    svgHtml += '<rect x="' + barX + '" y="' + barY + '" width="' + barWidth + '" height="' + barHeight + '" rx="8" fill="url(#salesBarGrad)"/>';
    svgHtml += '<text x="' + pt.x + '" y="' + (barY - 8) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#171717">\u20b9' + Math.round(pt.val / 1000) + 'k</text>';
  });

  // Render Coral Overlay Trend Line
  var trendLinePath = "M " + points[0].x + " " + points[0].y;
  for (var i = 1; i < points.length; i++) {
    var prev = points[i - 1];
    var curr = points[i];
    var cx = (prev.x + curr.x) / 2;
    trendLinePath += " C " + cx + " " + prev.y + ", " + cx + " " + curr.y + ", " + curr.x + " " + curr.y;
  }
  svgHtml += '<path d="' + trendLinePath + '" fill="none" stroke="#F56F6A" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>';

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
      '<div class="top-card-cat">Stock: ' + prod.stock + ' &bull; ' + (salesMap[prod.id] || 1) + ' Sold</div>' +
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
      categories = ["Smartphones", "Earbuds & Headphones", "Smartwatches", "Laptops"];
      catTotals = { "Smartphones": 45000, "Earbuds & Headphones": 12000, "Smartwatches": 8000, "Laptops": 65000 };
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
  var grid = document.getElementById("analyticsSummaryGrid");
  if (!grid) return;

  var totalCust = customers.length;
  var totalRev = 0;
  var totalPts = 0;
  transactions.forEach(function(t) {
    totalRev += (t.amount || 0);
    totalPts += (t.points || 0);
  });
  var avgSpent = totalCust > 0 ? Math.round(totalRev / totalCust) : 0;

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
    trendsBox.innerHTML = '' +
      '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Monthly velocity computed from ledger records:</p>' +
      '<div style="background:#F8FAFC;padding:16px;border-radius:var(--radius-md);border:1px solid var(--border-color);">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;font-weight:700;"><span>Current Month Transactions</span><span>' + transactions.length + ' checkouts</span></div>' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;font-weight:700;"><span>Total Points Minted</span><span class="text-gold">+' + totalPts + ' pts</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;"><span>Tier Upgrades Triggered</span><span class="text-purple">100% Automated</span></div>' +
      '</div>';
  }

  var tierBox = document.getElementById("analyticsTierBreakdown");
  if (tierBox) {
    var counts = { Bronze: 0, Silver: 0, Gold: 0, Diamond: 0 };
    customers.forEach(function(c) { counts[c.membership] = (counts[c.membership] || 0) + 1; });
    var tot = totalCust || 1;
    tierBox.innerHTML = '' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<div><small style="font-weight:700;">Bronze (\u20b90-\u20b92.5k): ' + counts.Bronze + ' (' + Math.round((counts.Bronze/tot)*100) + '%)</small></div>' +
        '<div><small style="font-weight:700;">Silver (\u20b92.5k-\u20b95k): ' + counts.Silver + ' (' + Math.round((counts.Silver/tot)*100) + '%)</small></div>' +
        '<div><small style="font-weight:700;">Gold (\u20b95k-\u20b910k): ' + counts.Gold + ' (' + Math.round((counts.Gold/tot)*100) + '%)</small></div>' +
        '<div><small style="font-weight:700;">Diamond (\u20b910k+): ' + counts.Diamond + ' (' + Math.round((counts.Diamond/tot)*100) + '%)</small></div>' +
      '</div>';
  }
}

// --------------------------------------------------------------------------
// 6. CUSTOMERS MANAGEMENT
// --------------------------------------------------------------------------

function renderCustomersTable(filterQuery) {
  filterQuery = filterQuery || "";
  var tbody = document.getElementById("customersTableBody");
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
      '<td><span class="tier-badge ' + cust.membership.toLowerCase() + '">' + cust.membership + '</span></td>' +
      '<td><strong>\u20b9' + cust.totalSpending.toLocaleString() + '</strong></td>' +
      '<td><span style="color:#D97706; font-weight:700;">' + cust.points + ' pts</span></td>' +
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
    var custIndex = customers.findIndex(function(c) { return c.id === editId; });
    if (custIndex !== -1) {
      customers[custIndex].name = name;
      customers[custIndex].phone = phone;
      transactions.forEach(function(t) { if (t.customerId === editId) t.customerName = name; });
      alert("Customer details updated successfully!");
    }
  } else {
    var existing = customers.find(function(c) { return c.phone === phone; });
    if (existing) { alert("A customer with phone number " + phone + " already exists: " + existing.name + " (" + existing.id + ")"); return; }
    var newId = generateNextCustomerId();
    var newCust = { id: newId, name: name, email: "", phone: phone, dob: "", membership: "Bronze", totalSpending: 0, points: 0, purchasesCount: 0, createdAt: new Date().toISOString().split('T')[0] };
    customers.push(newCust);
    alert("New Customer created! ID: " + newId);

    // Auto-select in purchase modal if open
    var purchModal = document.getElementById("purchaseModal");
    if (purchModal && purchModal.classList.contains("active") && typeof selectCustomerForPurchase === "function") {
      selectCustomerForPurchase(newId);
    }
    // Auto-select in cart checkout modal if open
    var checkoutModal = document.getElementById("cartCheckoutModal");
    if (checkoutModal && checkoutModal.classList.contains("active") && typeof selectCustomerForCheckout === "function") {
      selectCustomerForCheckout(newId);
    }
  }
  saveDataAll();
  closeModal("customerModal");
  renderCustomersTable();
  renderDashboard();
}

function deleteCustomer(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;
  if (!confirm('Delete customer "' + cust.name + '" (' + cust.id + ')? This will remove the profile.')) return;
  customers = customers.filter(function(c) { return c.id !== customerId; });
  saveDataAll();
  renderCustomersTable();
  renderDashboard();
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

  var currentSpending = cust.totalSpending;
  var nextTarget = 2500, nextTierName = "Silver";
  if (currentSpending >= 10000) { nextTarget = 10000; nextTierName = "Diamond"; }
  else if (currentSpending >= 5000) { nextTarget = 10000; nextTierName = "Diamond"; }
  else if (currentSpending >= 2500) { nextTarget = 5000; nextTierName = "Gold"; }

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

  var addPurchBtn = document.getElementById("profAddPurchaseBtn");
  if (addPurchBtn) {
    addPurchBtn.onclick = function() { openAddPurchaseModal(customerId); };
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
  resultsDiv.innerHTML = "";

  var matched = customers.filter(function(c) {
    return c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q));
  });

  if (matched.length > 0) {
    matched.slice(0, 5).forEach(function(cust) {
      var item = document.createElement("div");
      item.className = "cust-result-item";
      item.innerHTML = '<strong>' + escapeHtml(cust.name) + ' <span class="tier-badge ' + cust.membership.toLowerCase() + '" style="font-size:10px;padding:1px 6px;">' + cust.membership + '</span></strong>' +
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
  var totalEl = document.getElementById("calcTotalAmount");
  var pointsEl = document.getElementById("calcPointsEarned");
  var tierRow = document.getElementById("calcTierRow");
  var projectedTierEl = document.getElementById("calcProjectedTier");

  if (!product) {
    if (unitPriceEl) unitPriceEl.textContent = "\u20b90";
    if (stockEl) stockEl.textContent = "0 units";
    if (totalEl) totalEl.textContent = "\u20b90";
    if (pointsEl) pointsEl.textContent = "+0 Points";
    if (tierRow) tierRow.style.display = "none";
    return;
  }

  if (unitPriceEl) unitPriceEl.textContent = "\u20b9" + product.price.toLocaleString();
  if (stockEl) {
    stockEl.textContent = product.stock + " units" + (product.stock <= 0 ? " (Out of Stock)" : "");
    stockEl.style.color = product.stock <= 0 ? "var(--danger)" : "var(--primary)";
  }

  var totalAmount = product.price * qty;
  var points = calculatePoints(totalAmount);
  if (totalEl) totalEl.textContent = "\u20b9" + totalAmount.toLocaleString();
  if (pointsEl) pointsEl.textContent = "+" + points.toLocaleString() + " Points";

  var customerId = document.getElementById("purchCustomerSelect").value;
  var customer = customers.find(function(c) { return c.id === customerId; });
  if (customer && tierRow && projectedTierEl) {
    var projectedSpending = (customer.totalSpending || 0) + totalAmount;
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
  var productId = parseInt(document.getElementById("purchProductSelect").value, 10);
  var qty = parseInt(document.getElementById("purchQty").value, 10);
  var paymentMethod = document.getElementById("purchPayment").value;
  var date = document.getElementById("purchDate").value;

  if (!customerId || !productId || !qty || qty <= 0 || !date) { alert("Please fill in all valid purchase fields."); return; }
  var customer = customers.find(function(c) { return c.id === customerId; });
  var product = products.find(function(p) { return p.id === productId; });
  if (!customer) { alert("Invalid customer selected."); return; }
  if (!product) { alert("Invalid product selected."); return; }
  if (qty > product.stock) { alert("Insufficient stock! Only " + product.stock + " units available."); return; }

  var totalAmount = product.price * qty;
  var earnedPoints = calculatePoints(totalAmount);
  product.stock -= qty;
  customer.totalSpending += totalAmount;
  customer.points += earnedPoints;
  customer.purchasesCount = (customer.purchasesCount || 0) + 1;
  var oldTier = customer.membership;
  customer.membership = calculateMembership(customer.totalSpending);
  var rewardNote = oldTier !== customer.membership ? "Upgraded to " + customer.membership + " Tier!" : "Purchase Completed";

  var newTxnId = generateNextTransactionId();
  transactions.push({ transactionId: newTxnId, customerId: customer.id, customerName: customer.name, productId: product.id, productName: product.name, quantity: qty, amount: totalAmount, paymentMethod: paymentMethod, points: earnedPoints, date: date, rewardActivity: rewardNote });
  saveDataAll();
  closeModal("purchaseModal");
  alert("Purchase successful!\nTxn: " + newTxnId + "\nTotal: \u20b9" + totalAmount.toLocaleString() + "\nPoints: +" + earnedPoints + "\nTier: " + customer.membership);
  if (currentSelectedCustomerId === customerId) { viewCustomerProfile(customerId); } else { renderDashboard(); }
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
  var grid = document.getElementById("rewardsCatalogueGrid"); grid.innerHTML = "";
  var rewardsCatalog = [
    { name: "Birthday Reward (5% OFF)", tier: "Bronze", desc: "Special birthday discount voucher for Bronze level members and above.", icon: "fa-cake-candles" },
    { name: "Silver Special Offer (\u20b9250 Voucher)", tier: "Silver", desc: "Flat \u20b9250 discount coupon on audio accessories & electronics.", icon: "fa-tags" },
    { name: "Gold Gift Box", tier: "Gold", desc: "Free accessory package with every purchase over \u20b95,000.", icon: "fa-gift" },
    { name: "Diamond Premium Gift", tier: "Diamond", desc: "Premium wireless charging pad or earphones gift on any flagship buy.", icon: "fa-gem" },
    { name: "Exclusive Product Launch Access", tier: "Diamond", desc: "VIP early access to reserve new smartphone & laptop launches.", icon: "fa-rocket" }
  ];
  rewardsCatalog.forEach(function(rw) {
    var card = document.createElement("div"); card.className = "reward-card";
    card.innerHTML = '<div class="reward-card-header"><div class="reward-icon"><i class="fa-solid ' + rw.icon + '"></i></div><span class="tier-badge ' + rw.tier.toLowerCase() + '">' + rw.tier + ' Tier</span></div><h3 style="font-size:16px; font-weight:700; margin-bottom:6px;">' + rw.name + '</h3><p style="font-size:13px; color:#6B7280; flex:1; margin-bottom:16px;">' + rw.desc + '</p><div><span class="reward-status-badge available">Automatic Unlock</span></div>';
    grid.appendChild(card);
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
    var row = document.createElement("tr");
    row.innerHTML = '<td><code>' + txn.transactionId + '</code></td>' +
      '<td><strong>' + escapeHtml(txn.customerName) + '</strong><br><small style="color:#6B7280;">' + txn.customerId + '</small></td>' +
      '<td><span class="clickable-link" onclick="viewProductDetail(' + txn.productId + ')">' + escapeHtml(txn.productName) + '</span></td>' +
      '<td>' + txn.quantity + '</td>' +
      '<td><strong>\u20b9' + txn.amount.toLocaleString() + '</strong></td>' +
      '<td>' + txn.paymentMethod + '</td>' +
      '<td><span style="color:#D97706; font-weight:700;">+' + txn.points + ' pts</span></td>' +
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

function openAddProductModal() {
  document.getElementById("productModalTitle").innerHTML = '<i class="fa-solid fa-box-open text-purple"></i> Add New Product';
  document.getElementById("saveProductBtn").textContent = "Add Product";
  document.getElementById("prodEditId").value = "";
  document.getElementById("productForm").reset();
  document.getElementById("prodImagePreview").style.display = "none";
  document.getElementById("prodImagePlaceholder").style.display = "flex";
  document.getElementById("prodImageData").value = "";
  openModal("productModal");
}

function openEditProductModal(productNumericId) {
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

    products.push(newProduct);
    saveDataAll();
    closeModal("productModal");
    showToast("Product added successfully! ID: " + newProductId, "fa-check-circle");
  }

  renderProductsGrid();
}

function deleteProduct(productNumericId) {
  var prod = products.find(function(p) { return p.id === productNumericId; });
  if (!prod) return;

  var confirmDelete = confirm('Are you sure you want to delete "' + prod.name + '" (' + (prod.productId || 'ID:' + prod.id) + ')?\n\nExisting purchase history and transactions referencing this product will NOT be deleted.');
  if (!confirmDelete) return;

  products = products.filter(function(p) { return p.id !== productNumericId; });
  saveDataAll();

  showToast("Product deleted.", "fa-trash-can");
  renderProductsGrid();
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
  var totalQty = cart.reduce(function(sum, item) { return sum + (item.quantity || 0); }, 0);
  var badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? "flex" : "none";
  }
  var sideBadge = document.getElementById("sidebarCartBadge");
  if (sideBadge) {
    sideBadge.textContent = totalQty;
    sideBadge.style.display = totalQty > 0 ? "inline-block" : "none";
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
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) { alert("Product not found."); return; }
  if (product.stock <= 0) { alert("Sorry, " + product.name + " is currently out of stock."); return; }

  var existingIndex = cart.findIndex(function(item) { return item.productId === productId; });
  if (existingIndex !== -1) {
    if (cart[existingIndex].quantity + 1 > product.stock) {
      alert("Cannot add more! Only " + product.stock + " units available in stock.");
      return;
    }
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ productId: productId, quantity: 1 });
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
  var itemIndex = cart.findIndex(function(i) { return i.productId === productId; });
  if (itemIndex === -1) return;

  var product = products.find(function(p) { return p.id === productId; });
  var newQty = cart[itemIndex].quantity + delta;

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
  cart = cart.filter(function(i) { return i.productId !== productId; });
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
    var prod = products.find(function(p) { return p.id === item.productId; });
    if (!prod) return;

    var subtotal = prod.price * item.quantity;
    totalAmount += subtotal;

    var div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = '<div class="cart-item-img"><img src="' + prod.image + '" alt="' + escapeHtml(prod.name) + '" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><rect width=%2240%22 height=%2240%22 fill=%22%23eee%22/></svg>\';"></div>' +
      '<div class="cart-item-info">' +
      '<h4>' + escapeHtml(prod.name) + '</h4>' +
      '<div class="cart-item-price">\u20b9' + prod.price.toLocaleString() + '</div>' +
      '<div class="cart-item-subtotal">Subtotal: \u20b9' + subtotal.toLocaleString() + '</div>' +
      '<div class="cart-qty-controls">' +
      '<button type="button" onclick="updateCartQty(' + prod.id + ', -1)">-</button>' +
      '<span>' + item.quantity + '</span>' +
      '<button type="button" onclick="updateCartQty(' + prod.id + ', 1)">+</button>' +
      '</div></div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + prod.id + ')" title="Remove item"><i class="fa-solid fa-trash-can"></i></button>';

    listEl.appendChild(div);
  });

  if (totalEl) totalEl.textContent = "\u20b9" + totalAmount.toLocaleString();
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
      var prod = products.find(function(p) { return p.id === item.productId; });
      if (!prod) return;
      var subtotal = prod.price * item.quantity;
      totalAmount += subtotal;

      var div = document.createElement("div");
      div.className = "checkout-summary-item";
      div.innerHTML = '<div class="item-name">' + escapeHtml(prod.name) + ' <small class="item-detail">(\u00d7' + item.quantity + ' @ \u20b9' + prod.price.toLocaleString() + ')</small></div>' +
        '<strong>\u20b9' + subtotal.toLocaleString() + '</strong>';
      summaryEl.appendChild(div);
    });

    var earnedPoints = calculatePoints(totalAmount);
    var checkoutTotalEl = document.getElementById("checkoutTotal");
    var checkoutPointsEl = document.getElementById("checkoutPoints");
    if (checkoutTotalEl) checkoutTotalEl.textContent = "\u20b9" + totalAmount.toLocaleString();
    if (checkoutPointsEl) checkoutPointsEl.textContent = "+" + earnedPoints.toLocaleString() + " Points";
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
  }

  var checkoutDateInput = document.getElementById("checkoutDate");
  if (checkoutDateInput) checkoutDateInput.value = new Date().toISOString().split('T')[0];

  openModal("cartCheckoutModal");
}

function searchCustomersForCheckout(query) {
  var resultsDiv = document.getElementById("checkoutCustResults");
  if (!resultsDiv) return;

  var q = (query || "").toLowerCase().trim();
  resultsDiv.innerHTML = "";

  var matched = customers.filter(function(c) {
    return c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q));
  });

  if (matched.length > 0) {
    matched.slice(0, 5).forEach(function(cust) {
      var item = document.createElement("div");
      item.className = "cust-result-item";
      item.innerHTML = '<strong>' + escapeHtml(cust.name) + ' <span class="tier-badge ' + cust.membership.toLowerCase() + '" style="font-size:10px;padding:1px 6px;">' + cust.membership + '</span></strong>' +
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

function selectCustomerForCheckout(customerId) {
  var cust = customers.find(function(c) { return c.id === customerId; });
  if (!cust) return;

  var selectedIdInput = document.getElementById("checkoutSelectedCustId");
  if (selectedIdInput) selectedIdInput.value = cust.id;

  var infoDiv = document.getElementById("checkoutSelectedCustInfo");
  if (infoDiv) {
    infoDiv.style.display = "flex";
    infoDiv.innerHTML = '<span><i class="fa-solid fa-user-check"></i> ' + escapeHtml(cust.name) + ' (' + cust.id + ' \u2022 ' + (cust.phone || '') + ') <span class="tier-badge ' + cust.membership.toLowerCase() + '" style="font-size:10px;padding:2px 6px;margin-left:6px;">' + cust.membership + '</span></span>' +
      '<button type="button" class="clear-cust" onclick="clearCheckoutSelectedCustomer()">&times;</button>';
  }

  var resultsDiv = document.getElementById("checkoutCustResults");
  if (resultsDiv) resultsDiv.classList.remove("active");

  var searchInput = document.getElementById("checkoutCustSearch");
  if (searchInput) searchInput.value = "";

  var newForm = document.getElementById("checkoutNewCustForm");
  if (newForm) newForm.style.display = "none";
}

function clearCheckoutSelectedCustomer() {
  var selectedIdInput = document.getElementById("checkoutSelectedCustId");
  if (selectedIdInput) selectedIdInput.value = "";

  var infoDiv = document.getElementById("checkoutSelectedCustInfo");
  if (infoDiv) { infoDiv.style.display = "none"; infoDiv.innerHTML = ""; }
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
    alert("A customer with phone " + phone + " already exists: " + existing.name);
    selectCustomerForCheckout(existing.id);
    return;
  }

  var newId = generateNextCustomerId();
  var newCust = {
    id: newId,
    name: name,
    email: "",
    phone: phone,
    dob: "",
    membership: "Bronze",
    totalSpending: 0,
    points: 0,
    purchasesCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };

  customers.push(newCust);
  saveCustomers();
  renderCustomersTable();
  selectCustomerForCheckout(newId);
  showToast("Customer created: " + name, "fa-user-check");
}

function handleCartCheckoutPurchase() {
  var custId = document.getElementById("checkoutSelectedCustId").value;
  if (!custId) {
    alert("Please search and select a customer (or add a new one) to complete this purchase.");
    return;
  }

  var customer = customers.find(function(c) { return c.id === custId; });
  if (!customer) { alert("Selected customer not found."); return; }

  if (cart.length === 0) { alert("Cart is empty."); return; }

  for (var i = 0; i < cart.length; i++) {
    var cItem = cart[i];
    var prod = products.find(function(p) { return p.id === cItem.productId; });
    if (!prod) { alert("Product not found in catalogue."); return; }
    if (cItem.quantity > prod.stock) {
      alert("Insufficient stock for " + prod.name + "! Available: " + prod.stock + ", in cart: " + cItem.quantity);
      return;
    }
  }

  var paymentMethod = document.getElementById("checkoutPayment").value || "Online";
  var date = document.getElementById("checkoutDate").value || new Date().toISOString().split('T')[0];

  var totalCartAmount = 0;
  var totalCartPoints = 0;
  var firstTxnId = null;

  cart.forEach(function(cItem) {
    var prod = products.find(function(p) { return p.id === cItem.productId; });
    var itemAmount = prod.price * cItem.quantity;
    var itemPoints = calculatePoints(itemAmount);

    prod.stock -= cItem.quantity;
    totalCartAmount += itemAmount;
    totalCartPoints += itemPoints;

    var txnId = generateNextTransactionId();
    if (!firstTxnId) firstTxnId = txnId;

    var newTxn = {
      transactionId: txnId,
      customerId: customer.id,
      customerName: customer.name,
      productId: prod.id,
      productName: prod.name,
      quantity: cItem.quantity,
      amount: itemAmount,
      paymentMethod: paymentMethod,
      points: itemPoints,
      date: date,
      rewardActivity: "Cart Purchase"
    };
    transactions.push(newTxn);
  });

  customer.totalSpending += totalCartAmount;
  customer.points += totalCartPoints;
  customer.purchasesCount = (customer.purchasesCount || 0) + cart.length;

  var oldTier = customer.membership;
  var newTier = calculateMembership(customer.totalSpending);
  customer.membership = newTier;

  if (oldTier !== newTier) {
    transactions[transactions.length - 1].rewardActivity = "Upgraded to " + newTier + " Tier!";
  }

  cart = [];
  saveDataAll();
  updateCartBadge();
  closeModal("cartCheckoutModal");

  alert("Order completed successfully!\nCustomer: " + customer.name + "\nTotal: \u20b9" + totalCartAmount.toLocaleString() + "\nPoints Earned: +" + totalCartPoints + " pts\nTier: " + newTier);

  renderProductsGrid();
  renderCustomersTable();
  renderTransactionsTable();
  renderDashboard();

  if (currentSelectedCustomerId === customer.id) {
    viewCustomerProfile(customer.id);
  }
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
  downloadAnchor.setAttribute("download", "electroloyal_backup_" + new Date().toISOString().slice(0, 10) + ".json");
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

function clearDemoData() {
  var confirmReset = confirm("Are you sure you want to reset all data to default demo state? Custom added data will be erased.");
  if (!confirmReset) return;

  localStorage.removeItem("electroloyal_customers");
  localStorage.removeItem("electroloyal_products");
  localStorage.removeItem("electroloyal_transactions");
  localStorage.removeItem("electroloyal_cart");

  loadData();
  updateCartBadge();
  alert("Data reset to initial demo state!");
  closeModal("backupModal");
  renderDashboard();
}

// --------------------------------------------------------------------------
// 15. MODAL HELPERS & UTILITIES
// --------------------------------------------------------------------------

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
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
  if (custSearch) custSearch.addEventListener("input", function(e) { renderCustomersTable(e.target.value); });
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
