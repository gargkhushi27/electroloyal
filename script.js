/* ==========================================================================
   ELECTROLOYAL - Electronics Retail Customer Loyalty Management System
   Vanilla JavaScript Application Logic
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. GLOBAL STATE & CONSTANTS
// --------------------------------------------------------------------------

// Default Product List (35 Fictional Electronics Products)
const DEFAULT_PRODUCTS = [
  // SMARTPHONES
  { id: 1, name: "Nova X1", category: "Smartphones", price: 24999, image: "images/products/nova-x1.svg", stock: 25, description: "Sleek budget smartphone with 6.5-inch AMOLED screen and dual camera.", specifications: ["6.5 inch AMOLED Display", "128 GB Storage", "8 GB RAM", "4500 mAh Battery"], eligibleMembership: "Bronze", membershipOffer: "5% OFF for Silver members" },
  { id: 2, name: "Nova X1 Pro", category: "Smartphones", price: 34999, image: "images/products/nova-x1-pro.svg", stock: 20, description: "Flagship performance with 108MP camera and ultra-fast charging.", specifications: ["6.7 inch 120Hz Display", "256 GB Storage", "12 GB RAM", "5000 mAh Battery"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 3, name: "PixelEdge 8", category: "Smartphones", price: 42999, image: "images/products/pixeledge-8.svg", stock: 15, description: "Clean Android experience with advanced AI photography capabilities.", specifications: ["6.4 inch OLED Display", "128 GB Storage", "8 GB RAM", "4600 mAh Battery"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 4, name: "PixelEdge 8 Pro", category: "Smartphones", price: 59999, image: "images/products/pixeledge-8-pro.svg", stock: 10, description: "Ultimate photography power with telephoto lens and titanium frame.", specifications: ["6.7 inch LTPO OLED", "512 GB Storage", "12 GB RAM", "5050 mAh Battery"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },

  // EARBUDS & HEADPHONES
  { id: 5, name: "SoundPods Lite", category: "Earbuds & Headphones", price: 1499, image: "images/products/soundpods-lite.svg", stock: 50, description: "Lightweight true wireless earbuds with deep bass and 20h playback.", specifications: ["Bluetooth 5.3", "20 Hours Battery", "IPX4 Water Resistance", "USB-C Fast Charge"], eligibleMembership: "Bronze", membershipOffer: "Free Carrying Case" },
  { id: 6, name: "SoundPods Pro", category: "Earbuds & Headphones", price: 2999, image: "images/products/soundpods-pro.svg", stock: 35, description: "Active Noise Cancellation earbuds with HD sound clarity.", specifications: ["Active Noise Cancellation", "30 Hours Battery", "Wireless Charging Case", "Dual Mics"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 7, name: "AirBeat Max", category: "Earbuds & Headphones", price: 4999, image: "images/products/airbeat-max.svg", stock: 25, description: "Over-ear wireless headphones with cushioned earcups and deep bass.", specifications: ["40mm Dynamic Drivers", "40 Hours Battery", "Foldable Design", "Aux Cable Included"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 8, name: "AirBeat Max Pro", category: "Earbuds & Headphones", price: 7999, image: "images/products/airbeat-max-pro.svg", stock: 12, description: "Studio-grade wireless headphones with lossless spatial audio support.", specifications: ["Spatial Audio", "Hybrid ANC", "50 Hours Battery", "Premium Memory Foam"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },

  // SMARTWATCHES
  { id: 9, name: "FitWatch S", category: "Smartwatches", price: 2999, image: "images/products/fitwatch-s.svg", stock: 30, description: "Fitness tracker watch with SpO2, Heart Rate, and 14-day battery.", specifications: ["1.4 inch HD Display", "14 Day Battery Life", "50+ Sports Modes", "5ATM Waterproof"], eligibleMembership: "Bronze", membershipOffer: "Extra Strap Included" },
  { id: 10, name: "FitWatch Pro", category: "Smartwatches", price: 5999, image: "images/products/fitwatch-pro.svg", stock: 22, description: "Smartwatch with Bluetooth calling, GPS tracking, and AMOLED screen.", specifications: ["1.78 inch AMOLED Screen", "Built-in GPS", "Bluetooth Calling", "Heart & Sleep Tracking"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 11, name: "SmartWatch Ultra", category: "Smartwatches", price: 9999, image: "images/products/smartwatch-ultra.svg", stock: 15, description: "Rugged smartwatch with sapphire glass and multi-sport endurance metrics.", specifications: ["Rugged Titanium Alloy Case", "Dual-Band GPS", "100m Water Resistance", "Off-line Maps"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },

  // SPEAKERS
  { id: 12, name: "Boom Mini", category: "Speakers", price: 1999, image: "images/products/boom-mini.svg", stock: 40, description: "Pocket-sized Bluetooth speaker with surprising bass output.", specifications: ["5W RMS Output", "12 Hours Playtime", "IP67 Dust & Waterproof", "Carabiner Clip"], eligibleMembership: "Bronze", membershipOffer: "Basic offer eligible" },
  { id: 13, name: "Boom 360", category: "Speakers", price: 3999, image: "images/products/boom-360.svg", stock: 20, description: "360-degree room-filling sound speaker with party light effects.", specifications: ["20W Surround Audio", "RGB Light Ring", "Party Connect Mode", "18 Hours Battery"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 14, name: "Boom Max", category: "Speakers", price: 6999, image: "images/products/boom-max.svg", stock: 15, description: "Heavy bass outdoor speaker with built-in powerbank capability.", specifications: ["60W Output", "Powerbank USB Port", "Dual Passive Radiators", "24 Hours Playtime"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },

  // LAPTOPS
  { id: 15, name: "NovaBook 14", category: "Laptops", price: 49999, image: "images/products/novabook-14.svg", stock: 10, description: "Ultra-thin aluminum laptop powered by 12th Gen Quad-Core processor.", specifications: ["14 inch Full HD IPS", "512 GB NVMe SSD", "16 GB DDR5 RAM", "Intel i5 Processor"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },
  { id: 16, name: "NovaBook 14 Pro", category: "Laptops", price: 69999, image: "images/products/novabook-14-pro.svg", stock: 8, description: "Professional creator laptop with 2.8K OLED screen and dedicated GPU.", specifications: ["14 inch 2.8K OLED 90Hz", "1 TB NVMe SSD", "16 GB RAM", "RTX 3050 Graphics"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },
  { id: 17, name: "NovaBook 16 Pro", category: "Laptops", price: 89999, image: "images/products/novabook-16-pro.svg", stock: 5, description: "Ultimate workstation laptop with 16-inch display and octa-core processor.", specifications: ["16 inch 165Hz QHD+", "2 TB NVMe SSD", "32 GB RAM", "RTX 4060 Graphics"], eligibleMembership: "Diamond", membershipOffer: "15% OFF for Diamond members" },

  // TABLETS
  { id: 18, name: "Tab Lite", category: "Tablets", price: 14999, image: "images/products/tab-lite.svg", stock: 25, description: "10.1-inch entertainment tablet with quad speakers.", specifications: ["10.1 inch Full HD", "64 GB Storage", "4 GB RAM", "7000 mAh Battery"], eligibleMembership: "Bronze", membershipOffer: "Free Flip Case" },
  { id: 19, name: "Tab Air", category: "Tablets", price: 24999, image: "images/products/tab-air.svg", stock: 18, description: "Sleek lightweight tablet with stylus support for students and creative work.", specifications: ["10.9 inch 2K Display", "128 GB Storage", "6 GB RAM", "Stylus Pen Included"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 20, name: "Tab Pro", category: "Tablets", price: 39999, image: "images/products/tab-pro.svg", stock: 10, description: "High-performance tablet with 120Hz display and laptop-class chip.", specifications: ["11.5 inch 120Hz OLED", "256 GB Storage", "8 GB RAM", "Keyboard Dock Compatible"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },

  // KEYBOARDS
  { id: 21, name: "KeyLite Wireless", category: "Keyboards", price: 1499, image: "images/products/keylite-wireless.svg", stock: 35, description: "Compact quiet wireless membrane keyboard with multi-device Bluetooth.", specifications: ["Bluetooth & 2.4GHz Receiver", "Low Profile Keys", "2 Year Battery Life"], eligibleMembership: "Bronze", membershipOffer: "Standard Warranty" },
  { id: 22, name: "KeyPro Mechanical", category: "Keyboards", price: 3499, image: "images/products/keypro-mechanical.svg", stock: 20, description: "Tenkeyless mechanical gaming keyboard with hot-swappable tactile switches.", specifications: ["Hot-Swappable Switches", "TKL Layout", "Detachable Type-C Cable"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 23, name: "KeyPro RGB", category: "Keyboards", price: 5499, image: "images/products/keypro-rgb.svg", stock: 14, description: "Full-size mechanical keyboard with per-key RGB backlighting and volume dial.", specifications: ["Custom RGB Lighting", "Dedicated Media Controls", "PBT Double-shot Keycaps"], eligibleMembership: "Gold", membershipOffer: "10% OFF for Gold members" },

  // MICE
  { id: 24, name: "Mouse Lite", category: "Mice", price: 799, image: "images/products/mouse-lite.svg", stock: 45, description: "Silent click ergonomic wireless mouse for daily office tasks.", specifications: ["1600 DPI Sensor", "Silent Switches", "18 Month Battery"], eligibleMembership: "Bronze", membershipOffer: "Standard Warranty" },
  { id: 25, name: "Mouse Pro", category: "Mice", price: 1499, image: "images/products/mouse-pro.svg", stock: 30, description: "Ergonomic productivity mouse with hyper-fast scroll wheel.", specifications: ["4000 DPI Sensor", "Ergonomic Thumb Rest", "Multi-Device Switching"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 26, name: "Gaming Mouse X", category: "Mice", price: 2999, image: "images/products/gaming-mouse-x.svg", stock: 22, description: "Ultra-lightweight gaming mouse with 26K DPI optical sensor.", specifications: ["59g Lightweight", "26,000 DPI Sensor", "PTFE Feet & Paracord Cable"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },

  // GAMING
  { id: 27, name: "GamePad S", category: "Gaming", price: 2999, image: "images/products/gamepad-s.svg", stock: 25, description: "Wireless game controller compatible with PC, Android, and consoles.", specifications: ["Dual Vibration Motors", "Hall Effect Joysticks", "15 Hours Battery"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 28, name: "GamePad Pro", category: "Gaming", price: 4999, image: "images/products/gamepad-pro.svg", stock: 15, description: "Pro controller with customizable back paddles and mechanical tactile buttons.", specifications: ["4 Remappable Back Paddles", "Adjustable Trigger Locks", "RGB Indicator"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 29, name: "Gaming Headset X", category: "Gaming", price: 3999, image: "images/products/gaming-headset-x.svg", stock: 18, description: "7.1 Surround sound gaming headset with noise-canceling boom mic.", specifications: ["50mm Neodymium Drivers", "7.1 Virtual Surround Sound", "Cooling Gel Earpads"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },

  // ACCESSORIES
  { id: 30, name: "Fast Charger 25W", category: "Accessories", price: 999, image: "images/products/fast-charger-25w.svg", stock: 60, description: "USB-C PD fast wall charger for phones and accessories.", specifications: ["25W Power Delivery", "Compact GaN Tech", "Multi-layer Safety"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 31, name: "Fast Charger 65W", category: "Accessories", price: 1999, image: "images/products/fast-charger-65w.svg", stock: 40, description: "Dual-port USB-C fast charger for laptops, tablets, and phones simultaneously.", specifications: ["65W Dual Type-C", "GaN Fast Charge", "Universal Compatibility"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 32, name: "PowerBank 10K", category: "Accessories", price: 1499, image: "images/products/powerbank-10k.svg", stock: 35, description: "Compact 10,000 mAh portable powerbank with 22.5W fast output.", specifications: ["10,000 mAh Capacity", "22.5W Fast Charge", "Dual USB + Type-C"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 33, name: "PowerBank 20K", category: "Accessories", price: 2499, image: "images/products/powerbank-20k.svg", stock: 25, description: "High-capacity 20,000 mAh powerbank capable of charging laptops.", specifications: ["20,000 mAh Capacity", "45W Power Delivery", "LED Digital Display"], eligibleMembership: "Silver", membershipOffer: "5% OFF for Silver members" },
  { id: 34, name: "USB-C Hub", category: "Accessories", price: 1999, image: "images/products/usbc-hub.svg", stock: 30, description: "7-in-1 USB-C multiport adapter with 4K HDMI, USB 3.0, and 100W PD.", specifications: ["4K@60Hz HDMI", "100W Pass-Through PD", "SD/TF Card Reader"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" },
  { id: 35, name: "Wireless Charging Pad", category: "Accessories", price: 1499, image: "images/products/wireless-charging-pad.svg", stock: 25, description: "Fast 15W Qi wireless charging pad with non-slip rubber surface.", specifications: ["15W Qi Fast Charge", "LED Charging Indicator", "Foreign Object Detection"], eligibleMembership: "Bronze", membershipOffer: "Basic offer" }
];

// Initial Demo Customers Data
const INITIAL_CUSTOMERS = [
  {
    id: "ELC-000001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    dob: "1994-06-12",
    membership: "Gold",
    totalSpending: 7498,
    points: 140,
    purchasesCount: 2,
    createdAt: "2026-08-15"
  },
  {
    id: "ELC-000002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "9812345678",
    dob: "1998-11-20",
    membership: "Diamond",
    totalSpending: 34999,
    points: 690,
    purchasesCount: 1,
    createdAt: "2026-09-01"
  },
  {
    id: "ELC-000003",
    name: "Rohan Verma",
    email: "rohan.v@example.com",
    phone: "9988776655",
    dob: "2000-02-05",
    membership: "Bronze",
    totalSpending: 1499,
    points: 20,
    purchasesCount: 1,
    createdAt: "2026-09-10"
  },
  {
    id: "ELC-000004",
    name: "Ananya Roy",
    email: "ananya.roy@example.com",
    phone: "9765432109",
    dob: "1992-09-30",
    membership: "Silver",
    totalSpending: 3999,
    points: 70,
    purchasesCount: 1,
    createdAt: "2026-09-18"
  }
];

// Initial Demo Transactions Data
const INITIAL_TRANSACTIONS = [
  {
    transactionId: "TXN-000001",
    customerId: "ELC-000001",
    customerName: "Aarav Sharma",
    productId: 7,
    productName: "AirBeat Max",
    quantity: 1,
    amount: 4999,
    paymentMethod: "Online",
    points: 90,
    date: "2026-09-05",
    rewardActivity: "Silver Offer Unlocked"
  },
  {
    transactionId: "TXN-000002",
    customerId: "ELC-000001",
    customerName: "Aarav Sharma",
    productId: 33,
    productName: "PowerBank 20K",
    quantity: 1,
    amount: 2499,
    paymentMethod: "Cash",
    points: 40,
    date: "2026-09-15",
    rewardActivity: "Gold Tier Reached"
  },
  {
    transactionId: "TXN-000003",
    customerId: "ELC-000002",
    customerName: "Priya Patel",
    productId: 2,
    productName: "Nova X1 Pro",
    quantity: 1,
    amount: 34999,
    paymentMethod: "Online",
    points: 690,
    date: "2026-09-20",
    rewardActivity: "Diamond Tier Reached"
  },
  {
    transactionId: "TXN-000004",
    customerId: "ELC-000003",
    customerName: "Rohan Verma",
    productId: 5,
    productName: "SoundPods Lite",
    quantity: 1,
    amount: 1499,
    paymentMethod: "Cash",
    points: 20,
    date: "2026-09-22",
    rewardActivity: "Bronze Birthday Reward"
  },
  {
    transactionId: "TXN-000005",
    customerId: "ELC-000004",
    customerName: "Ananya Roy",
    productId: 13,
    productName: "Boom 360",
    quantity: 1,
    amount: 3999,
    paymentMethod: "Online",
    points: 70,
    date: "2026-09-25",
    rewardActivity: "Silver Offer Unlocked"
  }
];

// App State Variables
let customers = [];
let products = [];
let transactions = [];
let currentSelectedCustomerId = null;
let currentSelectedProductId = null;

// --------------------------------------------------------------------------
// 2. LOCAL STORAGE MANAGEMENT
// --------------------------------------------------------------------------

function loadData() {
  const storedCust = localStorage.getItem("electroloyal_customers");
  const storedProd = localStorage.getItem("electroloyal_products");
  const storedTxn = localStorage.getItem("electroloyal_transactions");

  if (storedCust) {
    customers = JSON.parse(storedCust);
  } else {
    customers = [...INITIAL_CUSTOMERS];
    saveCustomers();
  }

  if (storedProd) {
    products = JSON.parse(storedProd);
  } else {
    products = [...DEFAULT_PRODUCTS];
    saveProducts();
  }

  // Auto-assign PRD-IDs to any product that doesn't have one yet
  let needsSave = false;
  for (let i = 0; i < products.length; i++) {
    if (!products[i].productId) {
      products[i].productId = "PRD-" + String(i + 1).padStart(6, '0');
      needsSave = true;
    }
  }
  if (needsSave) saveProducts();

  if (storedTxn) {
    transactions = JSON.parse(storedTxn);
  } else {
    transactions = [...INITIAL_TRANSACTIONS];
    saveTransactions();
  }
}

function saveCustomers() {
  localStorage.setItem("electroloyal_customers", JSON.stringify(customers));
}

function saveProducts() {
  localStorage.setItem("electroloyal_products", JSON.stringify(products));
}

function saveTransactions() {
  localStorage.setItem("electroloyal_transactions", JSON.stringify(transactions));
}

function saveDataAll() {
  saveCustomers();
  saveProducts();
  saveTransactions();
}

// --------------------------------------------------------------------------
// 3. CORE BUSINESS CALCULATIONS & RULES
// --------------------------------------------------------------------------

/**
 * STRICT RULE: Every ₹500 spent = 10 points
 * Formula: Math.floor(amount / 500) * 10
 */
function calculatePoints(amount) {
  if (!amount || amount < 500) return 0;
  return Math.floor(amount / 500) * 10;
}

/**
 * STRICT RULE: Membership based ONLY on total spending (NOT points)
 * ₹0 – ₹2,499 : Bronze
 * ₹2,500 – ₹4,999 : Silver
 * ₹5,000 – ₹9,999 : Gold
 * ₹10,000+ : Diamond
 */
function calculateMembership(totalSpending) {
  const spending = totalSpending || 0;
  if (spending >= 10000) return "Diamond";
  if (spending >= 5000) return "Gold";
  if (spending >= 2500) return "Silver";
  return "Bronze";
}

/**
 * Auto unlock rewards based on customer tier
 */
function getUnlockedRewards(customer) {
  const rewards = [
    { name: "Birthday Reward (5% OFF)", tier: "Bronze", description: "Special Birthday reward coupon", status: "Available" }
  ];

  if (customer.totalSpending >= 2500 || customer.membership === "Silver" || customer.membership === "Gold" || customer.membership === "Diamond") {
    rewards.push({ name: "Silver Special Offer (₹250 Voucher)", tier: "Silver", description: "5% discount on selected products", status: "Available" });
  }
  if (customer.totalSpending >= 5000 || customer.membership === "Gold" || customer.membership === "Diamond") {
    rewards.push({ name: "Gold Free Gift Package", tier: "Gold", description: "Free accessory gift box on qualifying purchase", status: "Available" });
  }
  if (customer.totalSpending >= 10000 || customer.membership === "Diamond") {
    rewards.push({ name: "Diamond Premium Gift & VIP Access", tier: "Diamond", description: "15% off + VIP launch invitations", status: "Available" });
  }

  return rewards;
}

/**
 * Generate unique Customer ID format: ELC-000001
 */
function generateNextCustomerId() {
  if (customers.length === 0) return "ELC-000001";
  
  let maxIdNum = 0;
  for (let i = 0; i < customers.length; i++) {
    const idStr = customers[i].id;
    const numPart = parseInt(idStr.replace("ELC-", ""), 10);
    if (!isNaN(numPart) && numPart > maxIdNum) {
      maxIdNum = numPart;
    }
  }
  
  const nextNum = maxIdNum + 1;
  return "ELC-" + String(nextNum).padStart(6, '0');
}

/**
 * Generate unique Transaction ID format: TXN-000001
 */
function generateNextTransactionId() {
  if (transactions.length === 0) return "TXN-000001";
  
  let maxIdNum = 0;
  for (let i = 0; i < transactions.length; i++) {
    const idStr = transactions[i].transactionId;
    const numPart = parseInt(idStr.replace("TXN-", ""), 10);
    if (!isNaN(numPart) && numPart > maxIdNum) {
      maxIdNum = numPart;
    }
  }
  
  const nextNum = maxIdNum + 1;
  return "TXN-" + String(nextNum).padStart(6, '0');
}

/**
 * Generate unique Product ID format: PRD-000001
 */
function generateNextProductId() {
  let maxIdNum = 0;
  for (let i = 0; i < products.length; i++) {
    const pid = products[i].productId;
    if (pid && typeof pid === "string" && pid.startsWith("PRD-")) {
      const numPart = parseInt(pid.replace("PRD-", ""), 10);
      if (!isNaN(numPart) && numPart > maxIdNum) {
        maxIdNum = numPart;
      }
    }
  }
  const nextNum = maxIdNum + 1;
  return "PRD-" + String(nextNum).padStart(6, '0');
}

// --------------------------------------------------------------------------
// 4. NAVIGATION & VIEW SWITCHING
// --------------------------------------------------------------------------

function navigateTo(pageId) {
  // Hide all sections
  const pages = document.querySelectorAll(".page-view");
  pages.forEach(p => p.classList.remove("active"));

  // Update Nav highlighting
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    if (item.dataset.page === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Target view section
  const targetSection = document.getElementById("view-" + pageId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update Header text
  const headerTitle = document.getElementById("headerTitle");
  const headerSubtitle = document.getElementById("headerSubtitle");

  switch(pageId) {
    case "dashboard":
      headerTitle.textContent = "Dashboard";
      headerSubtitle.textContent = "Overview of store sales, customer loyalty, and rewards";
      renderDashboard();
      break;
    case "customers":
      headerTitle.textContent = "Customers";
      headerSubtitle.textContent = "Manage customer profiles and loyalty activity";
      renderCustomersTable();
      break;
    case "products":
      headerTitle.textContent = "Products";
      headerSubtitle.textContent = "Manage your electronics product catalogue";
      renderProductsGrid();
      break;
    case "product-detail":
      headerTitle.textContent = "Product Details";
      headerSubtitle.textContent = "View specifications and purchase options";
      break;
    case "customer-profile":
      headerTitle.textContent = "Customer Profile";
      headerSubtitle.textContent = "Loyalty stats, tier progress, and history";
      break;
    case "membership":
      headerTitle.textContent = "Membership Tiers";
      headerSubtitle.textContent = "Tier benefits based on total customer spending";
      break;
    case "rewards":
      headerTitle.textContent = "Rewards & Offers";
      headerSubtitle.textContent = "Explore unlocked customer rewards catalog";
      renderRewardsPage();
      break;
    case "transactions":
      headerTitle.textContent = "Transactions";
      headerSubtitle.textContent = "Complete log of store sales and point activity";
      renderTransactionsTable();
      break;
    default:
      break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 5. DASHBOARD RENDERER
// --------------------------------------------------------------------------

function renderDashboard() {
  // 1. Calculate Stats
  const totalCustomersCount = customers.length;
  
  let totalPointsCount = 0;
  for (let i = 0; i < customers.length; i++) {
    totalPointsCount += (customers[i].points || 0);
  }

  let totalSalesAmount = 0;
  for (let i = 0; i < transactions.length; i++) {
    totalSalesAmount += (transactions[i].amount || 0);
  }

  // Count active rewards across all customers
  let activeRewardsCount = 0;
  for (let i = 0; i < customers.length; i++) {
    const custRewards = getUnlockedRewards(customers[i]);
    activeRewardsCount += custRewards.length;
  }

  // Update DOM elements
  document.getElementById("dashTotalCustomers").textContent = totalCustomersCount;
  document.getElementById("dashTotalPoints").textContent = totalPointsCount.toLocaleString();
  document.getElementById("dashActiveRewards").textContent = activeRewardsCount;
  document.getElementById("dashTotalSales").textContent = "₹" + totalSalesAmount.toLocaleString();

  // 2. Render Recent Activity Table (Last 5 transactions)
  const recentTableBody = document.getElementById("dashRecentActivityTable");
  recentTableBody.innerHTML = "";

  const recentTxns = [...transactions].reverse().slice(0, 5);

  if (recentTxns.length === 0) {
    recentTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:#6B7280;">No transactions recorded yet.</td></tr>`;
  } else {
    recentTxns.forEach(txn => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${escapeHtml(txn.customerName)}</strong> <br><small style="color:#6B7280;">${txn.customerId}</small></td>
        <td><span class="clickable-link" onclick="viewProductDetail(${txn.productId})">${escapeHtml(txn.productName)}</span></td>
        <td><strong>₹${txn.amount.toLocaleString()}</strong></td>
        <td><span style="color:#D97706; font-weight:700;">+${txn.points} pts</span></td>
        <td>${txn.date}</td>
      `;
      recentTableBody.appendChild(row);
    });
  }

  // 3. Render Membership Distribution
  let countB = 0, countS = 0, countG = 0, countD = 0;
  for (let i = 0; i < customers.length; i++) {
    const tier = customers[i].membership;
    if (tier === "Bronze") countB++;
    else if (tier === "Silver") countS++;
    else if (tier === "Gold") countG++;
    else if (tier === "Diamond") countD++;
  }

  document.getElementById("countBronze").textContent = countB;
  document.getElementById("countSilver").textContent = countS;
  document.getElementById("countGold").textContent = countG;
  document.getElementById("countDiamond").textContent = countD;

  const total = totalCustomersCount || 1;
  document.getElementById("barBronze").style.width = ((countB / total) * 100) + "%";
  document.getElementById("barSilver").style.width = ((countS / total) * 100) + "%";
  document.getElementById("barGold").style.width = ((countG / total) * 100) + "%";
  document.getElementById("barDiamond").style.width = ((countD / total) * 100) + "%";
}

// --------------------------------------------------------------------------
// 6. CUSTOMERS MANAGEMENT
// --------------------------------------------------------------------------

function renderCustomersTable(filterQuery = "") {
  const tbody = document.getElementById("customersTableBody");
  tbody.innerHTML = "";

  const query = filterQuery.toLowerCase().trim();
  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(query) ||
    c.id.toLowerCase().includes(query) ||
    c.phone.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:#6B7280;">No matching customers found.</td></tr>`;
    return;
  }

  filtered.forEach(cust => {
    const unlocked = getUnlockedRewards(cust);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <strong>${escapeHtml(cust.name)}</strong>
      </td>
      <td><code>${cust.id}</code></td>
      <td>
        ${escapeHtml(cust.phone)} <br>
        <small style="color:#6B7280;">${escapeHtml(cust.email)}</small>
      </td>
      <td><span class="tier-badge ${cust.membership.toLowerCase()}">${cust.membership}</span></td>
      <td><strong>₹${cust.totalSpending.toLocaleString()}</strong></td>
      <td><span style="color:#D97706; font-weight:700;">${cust.points} pts</span></td>
      <td><span class="reward-status-badge available">${unlocked.length} Rewards</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="viewCustomerProfile('${cust.id}')" title="View Profile">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openEditCustomerModal('${cust.id}')" title="Edit Profile">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${cust.id}')" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;
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
  const cust = customers.find(c => c.id === customerId);
  if (!cust) return;

  document.getElementById("customerModalTitle").textContent = "Edit Customer";
  document.getElementById("custEditId").value = cust.id;
  document.getElementById("custName").value = cust.name;
  document.getElementById("custEmail").value = cust.email;
  document.getElementById("custPhone").value = cust.phone;
  document.getElementById("custDob").value = cust.dob;

  openModal("customerModal");
}

function handleSaveCustomer(event) {
  event.preventDefault();

  const editId = document.getElementById("custEditId").value;
  const name = document.getElementById("custName").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const dob = document.getElementById("custDob").value;

  if (!name || !email || !phone || !dob) {
    alert("Please fill in all required fields.");
    return;
  }

  if (editId) {
    // EDIT
    const custIndex = customers.findIndex(c => c.id === editId);
    if (custIndex !== -1) {
      customers[custIndex].name = name;
      customers[custIndex].email = email;
      customers[custIndex].phone = phone;
      customers[custIndex].dob = dob;

      // Update name in recent transactions too for clean display
      transactions.forEach(t => {
        if (t.customerId === editId) t.customerName = name;
      });

      alert("Customer details updated successfully!");
    }
  } else {
    // ADD NEW
    const newId = generateNextCustomerId();
    const newCust = {
      id: newId,
      name: name,
      email: email,
      phone: phone,
      dob: dob,
      membership: "Bronze",
      totalSpending: 0,
      points: 0,
      purchasesCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    customers.push(newCust);
    alert(`New Customer created successfully! Assigned ID: ${newId}`);
  }

  saveDataAll();
  closeModal("customerModal");
  renderCustomersTable();
  renderDashboard();
}

function deleteCustomer(customerId) {
  const cust = customers.find(c => c.id === customerId);
  if (!cust) return;

  const confirmDelete = confirm(`Are you sure you want to delete customer "${cust.name}" (${cust.id})?\n\nThis will remove the customer profile and related history.`);
  if (!confirmDelete) return;

  customers = customers.filter(c => c.id !== customerId);
  // Optional: keep or filter transactions
  saveDataAll();
  renderCustomersTable();
  renderDashboard();
}

// --------------------------------------------------------------------------
// 7. CUSTOMER PROFILE VIEW & PURCHASES
// --------------------------------------------------------------------------

function viewCustomerProfile(customerId) {
  const cust = customers.find(c => c.id === customerId);
  if (!cust) {
    alert("Customer not found.");
    return;
  }

  currentSelectedCustomerId = customerId;

  // Auto Recalculate membership strictly based on total spending
  cust.membership = calculateMembership(cust.totalSpending);

  // Populate Header
  document.getElementById("profName").textContent = cust.name;
  document.getElementById("profId").textContent = cust.id;
  document.getElementById("profEmail").textContent = cust.email;
  document.getElementById("profPhone").textContent = cust.phone;
  document.getElementById("profDob").textContent = cust.dob;

  // Initials for Avatar
  const initials = cust.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById("profAvatar").textContent = initials || "CU";

  // Membership Badge
  const badgeEl = document.getElementById("profMembershipBadge");
  badgeEl.className = `tier-badge ${cust.membership.toLowerCase()}`;
  badgeEl.textContent = cust.membership;

  // Stats
  document.getElementById("profPoints").textContent = cust.points.toLocaleString();
  document.getElementById("profSpending").textContent = "₹" + cust.totalSpending.toLocaleString();
  
  // Count customer transactions
  const custTxns = transactions.filter(t => t.customerId === customerId);
  document.getElementById("profPurchasesCount").textContent = custTxns.length;

  const unlockedRewards = getUnlockedRewards(cust);
  document.getElementById("profRewardsCount").textContent = unlockedRewards.length;

  // Membership Progress Calculation
  const currentSpending = cust.totalSpending;
  let nextTarget = 2500;
  let nextTierName = "Silver";

  if (currentSpending >= 10000) {
    nextTarget = 10000;
    nextTierName = "Diamond";
  } else if (currentSpending >= 5000) {
    nextTarget = 10000;
    nextTierName = "Diamond";
  } else if (currentSpending >= 2500) {
    nextTarget = 5000;
    nextTierName = "Gold";
  } else {
    nextTarget = 2500;
    nextTierName = "Silver";
  }

  document.getElementById("profCurrentTierLabel").textContent = `${cust.membership} Tier`;
  document.getElementById("profProgressCurrent").textContent = "₹" + currentSpending.toLocaleString();
  document.getElementById("profProgressTarget").textContent = "₹" + nextTarget.toLocaleString();

  if (cust.membership === "Diamond") {
    document.getElementById("profProgressBarFill").style.width = "100%";
    document.getElementById("profProgressText").textContent = "Diamond Member — Highest membership level reached!";
  } else {
    const remaining = nextTarget - currentSpending;
    const progressPercent = Math.min(100, Math.max(0, (currentSpending / nextTarget) * 100));
    document.getElementById("profProgressBarFill").style.width = progressPercent + "%";
    document.getElementById("profProgressText").textContent = `₹${remaining.toLocaleString()} more to reach ${nextTierName}`;
  }

  // Render Unlocked Rewards list
  const rewardsListEl = document.getElementById("profRewardsList");
  rewardsListEl.innerHTML = "";
  unlockedRewards.forEach(r => {
    const item = document.createElement("div");
    item.className = "reward-mini-item";
    item.innerHTML = `
      <div>
        <strong><i class="fa-solid fa-gift text-purple"></i> ${escapeHtml(r.name)}</strong>
        <p style="font-size:12px; color:#6B7280; margin-top:2px;">${escapeHtml(r.description)}</p>
      </div>
      <span class="reward-status-badge available">${r.status}</span>
    `;
    rewardsListEl.appendChild(item);
  });

  // Render Purchase History
  const historyBody = document.getElementById("profPurchaseHistoryBody");
  historyBody.innerHTML = "";

  if (custTxns.length === 0) {
    historyBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#6B7280;">No purchases recorded for this customer yet.</td></tr>`;
  } else {
    [...custTxns].reverse().forEach(txn => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><span class="clickable-link" onclick="viewProductDetail(${txn.productId})">${escapeHtml(txn.productName)}</span></td>
        <td>${txn.quantity}</td>
        <td><strong>₹${txn.amount.toLocaleString()}</strong></td>
        <td>${txn.paymentMethod}</td>
        <td><span style="color:#D97706; font-weight:700;">+${txn.points} pts</span></td>
        <td>${txn.date}</td>
      `;
      historyBody.appendChild(row);
    });
  }

  // Set up Add Purchase Button
  document.getElementById("profAddPurchaseBtn").onclick = () => openAddPurchaseModal(customerId);

  navigateTo("customer-profile");
}

// --------------------------------------------------------------------------
// 8. PURCHASE RECORDING MODAL & SYSTEM
// --------------------------------------------------------------------------

function openAddPurchaseModal(preselectedCustomerId = null, preselectedProductId = null) {
  const custSelect = document.getElementById("purchCustomerSelect");
  custSelect.innerHTML = `<option value="">-- Select Customer --</option>`;
  customers.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.id} - ${c.phone})`;
    if (preselectedCustomerId && c.id === preselectedCustomerId) opt.selected = true;
    custSelect.appendChild(opt);
  });

  const prodSelect = document.getElementById("purchProductSelect");
  prodSelect.innerHTML = `<option value="">-- Select Product --</option>`;
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.name} — ₹${p.price.toLocaleString()} (Stock: ${p.stock})`;
    if (p.stock <= 0) opt.disabled = true;
    if (preselectedProductId && p.id === preselectedProductId) opt.selected = true;
    prodSelect.appendChild(opt);
  });

  document.getElementById("purchQty").value = 1;
  document.getElementById("purchDate").value = new Date().toISOString().split('T')[0];

  updatePurchaseCalculations();
  openModal("purchaseModal");
}

function updatePurchaseCalculations() {
  const prodId = parseInt(document.getElementById("purchProductSelect").value, 10);
  const qty = parseInt(document.getElementById("purchQty").value, 10) || 1;

  const product = products.find(p => p.id === prodId);
  if (!product) {
    document.getElementById("calcUnitPrice").textContent = "₹0";
    document.getElementById("calcTotalAmount").textContent = "₹0";
    document.getElementById("calcPointsEarned").textContent = "+0 Points";
    return;
  }

  const unitPrice = product.price;
  const totalAmount = unitPrice * qty;
  const points = calculatePoints(totalAmount);

  document.getElementById("calcUnitPrice").textContent = "₹" + unitPrice.toLocaleString();
  document.getElementById("calcTotalAmount").textContent = "₹" + totalAmount.toLocaleString();
  document.getElementById("calcPointsEarned").textContent = `+${points.toLocaleString()} Points`;
}

function handleCompletePurchase(event) {
  event.preventDefault();

  const customerId = document.getElementById("purchCustomerSelect").value;
  const productId = parseInt(document.getElementById("purchProductSelect").value, 10);
  const qty = parseInt(document.getElementById("purchQty").value, 10);
  const paymentMethod = document.getElementById("purchPayment").value;
  const date = document.getElementById("purchDate").value;

  if (!customerId || !productId || !qty || qty <= 0 || !date) {
    alert("Please fill in all valid purchase fields.");
    return;
  }

  const customer = customers.find(c => c.id === customerId);
  const product = products.find(p => p.id === productId);

  if (!customer) {
    alert("Invalid customer selected.");
    return;
  }
  if (!product) {
    alert("Invalid product selected.");
    return;
  }

  // Stock check
  if (qty > product.stock) {
    alert(`Insufficient Stock! Only ${product.stock} units of ${product.name} are available.`);
    return;
  }

  // Calculate purchase parameters
  const totalAmount = product.price * qty;
  const earnedPoints = calculatePoints(totalAmount);

  // Update Stock
  product.stock -= qty;

  // Update Customer Stats
  customer.totalSpending += totalAmount;
  customer.points += earnedPoints;
  customer.purchasesCount = (customer.purchasesCount || 0) + 1;

  // Recalculate customer tier automatically
  const oldTier = customer.membership;
  const newTier = calculateMembership(customer.totalSpending);
  customer.membership = newTier;

  let rewardNote = "Purchase Completed";
  if (oldTier !== newTier) {
    rewardNote = `Upgraded to ${newTier} Tier!`;
  }

  // Create Transaction
  const newTxnId = generateNextTransactionId();
  const newTransaction = {
    transactionId: newTxnId,
    customerId: customer.id,
    customerName: customer.name,
    productId: product.id,
    productName: product.name,
    quantity: qty,
    amount: totalAmount,
    paymentMethod: paymentMethod,
    points: earnedPoints,
    date: date,
    rewardActivity: rewardNote
  };

  transactions.push(newTransaction);
  saveDataAll();

  closeModal("purchaseModal");
  alert(`Purchase successful!\n\nTransaction ID: ${newTxnId}\nTotal Amount: ₹${totalAmount.toLocaleString()}\nLoyalty Points Earned: +${earnedPoints}\nNew Membership Tier: ${newTier}`);

  // Refresh current view
  if (currentSelectedCustomerId === customerId) {
    viewCustomerProfile(customerId);
  } else {
    renderDashboard();
  }
}

// --------------------------------------------------------------------------
// 9. PRODUCTS CATALOGUE & DETAIL VIEW
// --------------------------------------------------------------------------

function renderProductsGrid() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  const searchQuery = document.getElementById("productSearchInput").value.toLowerCase().trim();
  const categoryFilter = document.getElementById("productCategoryFilter").value;
  const priceFilter = document.getElementById("productPriceFilter").value;

  const filtered = products.filter(p => {
    // Search
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery);
    
    // Category
    const matchesCat = (categoryFilter === "All") || (p.category === categoryFilter);

    // Price
    let matchesPrice = true;
    if (priceFilter === "under5000") matchesPrice = (p.price < 5000);
    else if (priceFilter === "5000-20000") matchesPrice = (p.price >= 5000 && p.price <= 20000);
    else if (priceFilter === "20000-50000") matchesPrice = (p.price > 20000 && p.price <= 50000);
    else if (priceFilter === "above50000") matchesPrice = (p.price > 50000);

    return matchesSearch && matchesCat && matchesPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#6B7280;">No products match your search criteria.</div>`;
    return;
  }

  filtered.forEach(prod => {
    const points = calculatePoints(prod.price);
    const isOutOfStock = (prod.stock <= 0);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrap" onclick="viewProductDetail(${prod.id})" style="cursor:pointer;">
        <img src="${prod.image}" alt="${escapeHtml(prod.name)}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#F3F4F6;color:#9CA3AF;font-size:40px;\\'><i class=\\'fa-solid fa-image\\'></i></div>';">
      </div>
      <div class="product-card-body">
        <span class="badge-cat">${escapeHtml(prod.category)}</span>
        <h3 class="product-title" onclick="viewProductDetail(${prod.id})">${escapeHtml(prod.name)}</h3>
        <div class="product-meta-row">
          <span class="price-tag">₹${prod.price.toLocaleString()}</span>
          <span class="points-tag"><i class="fa-solid fa-coins"></i> ${points} pts</span>
        </div>
        <div class="stock-tag ${isOutOfStock ? 'out-of-stock' : ''}">
          ${isOutOfStock ? '<i class="fa-solid fa-circle-xmark"></i> Out of Stock' : `<i class="fa-solid fa-box"></i> Stock: ${prod.stock} units`}
        </div>
        ${prod.membershipOffer ? `<div class="offer-badge"><i class="fa-solid fa-tag"></i> ${escapeHtml(prod.membershipOffer)}</div>` : ''}
        <div class="product-card-footer">
          <button class="btn btn-secondary" onclick="viewProductDetail(${prod.id})">
            <i class="fa-solid fa-circle-info"></i> View Details
          </button>
          <div class="product-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="openEditProductModal(${prod.id})" title="Edit Product">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${prod.id})" title="Delete Product">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function viewProductDetail(productId) {
  const prod = products.find(p => p.id === productId);
  
  // Handle deleted products from transaction history
  if (!prod) {
    // Try to find info from a past transaction
    const txn = transactions.find(t => t.productId === productId);
    if (txn) {
      document.getElementById("detailImg").src = "";
      document.getElementById("detailName").textContent = txn.productName + " (Deleted)";
      document.getElementById("detailProductId").innerHTML = `<i class="fa-solid fa-barcode"></i> Product no longer in catalogue`;
      document.getElementById("detailCategory").textContent = "Removed Product";
      document.getElementById("detailPrice").textContent = "₹" + txn.amount.toLocaleString();
      document.getElementById("detailPoints").textContent = txn.points + " Points earned";
      document.getElementById("detailDescription").textContent = "This product has been removed from the catalogue. Historical transaction data is preserved.";
      document.getElementById("detailSpecs").innerHTML = "";
      document.getElementById("detailOfferText").textContent = "N/A";
      document.getElementById("detailStockBadge").className = "stock-badge out-of-stock";
      document.getElementById("detailStockBadge").innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Product Deleted`;
      document.getElementById("detailAddPurchaseBtn").disabled = true;
      document.getElementById("detailAddPurchaseBtn").textContent = "Product Unavailable";
      navigateTo("product-detail");
      return;
    }
    alert("Product not found.");
    return;
  }

  currentSelectedProductId = productId;
  const points = calculatePoints(prod.price);

  document.getElementById("detailImg").src = prod.image;
  document.getElementById("detailImg").onerror = function() {
    this.style.display = 'none';
    this.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#F3F4F6;color:#9CA3AF;font-size:60px;"><i class="fa-solid fa-image"></i></div>';
  };
  document.getElementById("detailName").textContent = prod.name;
  document.getElementById("detailProductId").innerHTML = `<i class="fa-solid fa-barcode"></i> ${prod.productId || 'N/A'}`;
  document.getElementById("detailCategory").textContent = prod.category;
  document.getElementById("detailPrice").textContent = "₹" + prod.price.toLocaleString();
  document.getElementById("detailPoints").textContent = `${points} Loyalty Points`;
  document.getElementById("detailDescription").textContent = prod.description || "No description available.";
  document.getElementById("detailOfferText").textContent = prod.membershipOffer || "Standard loyalty points eligible.";

  const stockBadge = document.getElementById("detailStockBadge");
  document.getElementById("detailStockCount");

  if (prod.stock <= 0) {
    stockBadge.className = "stock-badge out-of-stock";
    stockBadge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Out of Stock`;
  } else {
    stockBadge.className = "stock-badge in-stock";
    stockBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Stock: ${prod.stock} units`;
  }

  // Render Specifications list
  const specsList = document.getElementById("detailSpecs");
  specsList.innerHTML = "";
  if (prod.specifications && prod.specifications.length > 0) {
    prod.specifications.forEach(spec => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-check text-purple"></i> ${escapeHtml(spec)}`;
      specsList.appendChild(li);
    });
  }

  const buyBtn = document.getElementById("detailAddPurchaseBtn");
  if (prod.stock <= 0) {
    buyBtn.disabled = true;
    buyBtn.textContent = "Out of Stock";
  } else {
    buyBtn.disabled = false;
    buyBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Buy for Customer`;
    buyBtn.onclick = () => openAddPurchaseModal(currentSelectedCustomerId, prod.id);
  }

  navigateTo("product-detail");
}

// --------------------------------------------------------------------------
// 10. REWARDS PAGE CATALOGUE
// --------------------------------------------------------------------------

function renderRewardsPage() {
  const grid = document.getElementById("rewardsCatalogueGrid");
  grid.innerHTML = "";

  const rewardsCatalog = [
    { name: "Birthday Reward (5% OFF)", tier: "Bronze", desc: "Special birthday discount voucher for all Bronze level members and above.", icon: "fa-cake-candles" },
    { name: "Silver Special Offer (₹250 Voucher)", tier: "Silver", desc: "Flat ₹250 discount coupon on audio accessories & electronics.", icon: "fa-tags" },
    { name: "Gold Gift Box", tier: "Gold", desc: "Free accessory package with every purchase over ₹5,000.", icon: "fa-gift" },
    { name: "Diamond Premium Gift", tier: "Diamond", desc: "Premium wireless charging pad or earphones gift on any flagship buy.", icon: "fa-gem" },
    { name: "Exclusive Product Launch Access", tier: "Diamond", desc: "VIP early access to reserve new smartphone & laptop launches.", icon: "fa-rocket" }
  ];

  rewardsCatalog.forEach(rw => {
    const card = document.createElement("div");
    card.className = "reward-card";
    card.innerHTML = `
      <div class="reward-card-header">
        <div class="reward-icon"><i class="fa-solid ${rw.icon}"></i></div>
        <span class="tier-badge ${rw.tier.toLowerCase()}">${rw.tier} Tier</span>
      </div>
      <h3 style="font-size:16px; font-weight:700; margin-bottom:6px;">${rw.name}</h3>
      <p style="font-size:13px; color:#6B7280; flex:1; margin-bottom:16px;">${rw.desc}</p>
      <div>
        <span class="reward-status-badge available">Automatic Unlock</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 11. TRANSACTIONS PAGE
// --------------------------------------------------------------------------

function renderTransactionsTable(filterQuery = "") {
  const tbody = document.getElementById("transactionsTableBody");
  tbody.innerHTML = "";

  const query = filterQuery.toLowerCase().trim();
  const filtered = transactions.filter(t => 
    t.transactionId.toLowerCase().includes(query) ||
    t.customerName.toLowerCase().includes(query) ||
    t.productName.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:#6B7280;">No transactions found.</td></tr>`;
    return;
  }

  [...filtered].reverse().forEach(txn => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><code>${txn.transactionId}</code></td>
      <td><strong>${escapeHtml(txn.customerName)}</strong> <br><small style="color:#6B7280;">${txn.customerId}</small></td>
      <td><span class="clickable-link" onclick="viewProductDetail(${txn.productId})">${escapeHtml(txn.productName)}</span></td>
      <td>${txn.quantity}</td>
      <td><strong>₹${txn.amount.toLocaleString()}</strong></td>
      <td>${txn.paymentMethod}</td>
      <td><span style="color:#D97706; font-weight:700;">+${txn.points} pts</span></td>
      <td>${txn.date}</td>
      <td><span class="reward-status-badge available">${escapeHtml(txn.rewardActivity || 'Purchased')}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// --------------------------------------------------------------------------
// 12. PRODUCT MANAGEMENT (ADD / EDIT / DELETE)
// --------------------------------------------------------------------------

/**
 * Build the membership offer text from eligibility + discount selections
 */
function buildMembershipOffer(eligibility, discount) {
  if (!eligibility || eligibility === "None" || !discount || discount === "None") {
    return "";
  }
  return discount + "% OFF for " + eligibility + " members";
}

/**
 * Preview selected image as data URL in the modal
 */
function handleProductImagePreview(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const previewImg = document.getElementById("prodImagePreview");
    const placeholder = document.getElementById("prodImagePlaceholder");
    previewImg.src = e.target.result;
    previewImg.style.display = "block";
    placeholder.style.display = "none";
    // Store the data URL in hidden field for saving
    document.getElementById("prodImageData").value = e.target.result;
  };
  reader.readAsDataURL(file);
}

/**
 * Open the Add Product modal (empty form)
 */
function openAddProductModal() {
  document.getElementById("productModalTitle").innerHTML = '<i class="fa-solid fa-box-open text-purple"></i> Add New Product';
  document.getElementById("saveProductBtn").textContent = "Add Product";
  document.getElementById("prodEditId").value = "";
  document.getElementById("productForm").reset();
  // Reset image preview
  document.getElementById("prodImagePreview").style.display = "none";
  document.getElementById("prodImagePlaceholder").style.display = "flex";
  document.getElementById("prodImageData").value = "";
  openModal("productModal");
}

/**
 * Open the Edit Product modal with existing data populated
 */
function openEditProductModal(productNumericId) {
  const prod = products.find(p => p.id === productNumericId);
  if (!prod) {
    alert("Product not found.");
    return;
  }

  document.getElementById("productModalTitle").innerHTML = '<i class="fa-solid fa-pen text-purple"></i> Edit Product';
  document.getElementById("saveProductBtn").textContent = "Save Changes";
  document.getElementById("prodEditId").value = String(prod.id);

  document.getElementById("prodName").value = prod.name;
  document.getElementById("prodCategory").value = prod.category;
  document.getElementById("prodPrice").value = prod.price;
  document.getElementById("prodStock").value = prod.stock;
  document.getElementById("prodDescription").value = prod.description || "";
  document.getElementById("prodSpecs").value = (prod.specifications || []).join("\n");

  // Set eligibility and discount from the membershipOffer text
  document.getElementById("prodEligibility").value = prod.eligibleMembership || "None";

  // Try to parse discount from membershipOffer like "10% OFF for Gold members"
  let discountVal = "None";
  if (prod.membershipOffer) {
    const match = prod.membershipOffer.match(/^(\d+)%/);
    if (match) discountVal = match[1];
  }
  document.getElementById("prodDiscount").value = discountVal;

  // Show current image
  const previewImg = document.getElementById("prodImagePreview");
  const placeholder = document.getElementById("prodImagePlaceholder");
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

/**
 * Handle Save Product (Add new or Edit existing)
 */
function handleSaveProduct(event) {
  event.preventDefault();

  const editIdStr = document.getElementById("prodEditId").value;
  const name = document.getElementById("prodName").value.trim();
  const category = document.getElementById("prodCategory").value;
  const price = parseInt(document.getElementById("prodPrice").value, 10);
  const stock = parseInt(document.getElementById("prodStock").value, 10);
  const description = document.getElementById("prodDescription").value.trim();
  const specsText = document.getElementById("prodSpecs").value.trim();
  const eligibility = document.getElementById("prodEligibility").value;
  const discount = document.getElementById("prodDiscount").value;
  const newImageData = document.getElementById("prodImageData").value;

  // Validation
  if (!name) { alert("Product name is required."); return; }
  if (!category) { alert("Category is required."); return; }
  if (!price || price <= 0) { alert("Price must be greater than 0."); return; }
  if (stock < 0 || isNaN(stock)) { alert("Stock cannot be negative."); return; }

  // Parse specifications from newline-separated text
  const specifications = specsText ? specsText.split("\n").map(s => s.trim()).filter(s => s.length > 0) : [];
  const membershipOffer = buildMembershipOffer(eligibility, discount);

  if (editIdStr) {
    // --- EDIT EXISTING PRODUCT ---
    const editId = parseInt(editIdStr, 10);
    const prodIndex = products.findIndex(p => p.id === editId);
    if (prodIndex === -1) { alert("Product not found."); return; }

    products[prodIndex].name = name;
    products[prodIndex].category = category;
    products[prodIndex].price = price;
    products[prodIndex].stock = stock;
    products[prodIndex].description = description;
    products[prodIndex].specifications = specifications;
    products[prodIndex].eligibleMembership = eligibility;
    products[prodIndex].membershipOffer = membershipOffer;

    // Update image only if a new one was selected
    if (newImageData) {
      products[prodIndex].image = newImageData;
    }

    // Update product name in existing transactions for clean display
    transactions.forEach(t => {
      if (t.productId === editId) t.productName = name;
    });

    saveDataAll();
    closeModal("productModal");
    showToast("Product updated successfully.", "fa-check-circle");
  } else {
    // --- ADD NEW PRODUCT ---
    // Generate new unique numeric ID
    let maxNumericId = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id > maxNumericId) maxNumericId = products[i].id;
    }
    const newId = maxNumericId + 1;
    const newProductId = generateNextProductId();

    // Determine image: use uploaded data URL, or a default placeholder
    let image = newImageData;
    if (!image) {
      // Generate a simple default SVG placeholder
      const initial = name.charAt(0).toUpperCase();
      const colors = ["#6D5DFB","#10B981","#F59E0B","#EF4444","#06B6D4","#8B5CF6","#EC4899"];
      const color = colors[newId % colors.length];
      image = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="${color}" opacity="0.15" rx="12"/><rect x="20" y="20" width="260" height="160" fill="#fff" rx="8" opacity="0.8"/><circle cx="150" cy="85" r="35" fill="${color}" opacity="0.9"/><text x="150" y="92" fill="#fff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">${initial}</text><text x="150" y="140" fill="#111827" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">${name}</text><text x="150" y="160" fill="#6B7280" font-family="sans-serif" font-size="11" text-anchor="middle">${category}</text></svg>`)}`;
    }

    const newProduct = {
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

  // Refresh products grid
  renderProductsGrid();
}

/**
 * Delete a product with confirmation
 */
function deleteProduct(productNumericId) {
  const prod = products.find(p => p.id === productNumericId);
  if (!prod) return;

  const confirmDelete = confirm(`Are you sure you want to delete "${prod.name}" (${prod.productId || 'ID:' + prod.id})?\n\nExisting purchase history and transactions referencing this product will NOT be deleted.`);
  if (!confirmDelete) return;

  // Remove from active products
  products = products.filter(p => p.id !== productNumericId);
  saveDataAll();

  showToast("Product deleted.", "fa-trash-can");
  renderProductsGrid();
}

/**
 * Show a small toast notification message at the bottom right
 */
function showToast(message, icon) {
  // Remove old toasts
  const oldToast = document.querySelector(".toast-notification");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = `<i class="fa-solid ${icon || 'fa-circle-check'}" style="color:#10B981;"></i> ${escapeHtml(message)}`;
  document.body.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 3000);
}

// --------------------------------------------------------------------------
// 13. BACKUP SYSTEM (EXPORT, IMPORT, RESET)
// --------------------------------------------------------------------------

function exportData() {
  const dataExport = {
    customers: customers,
    products: products,
    transactions: transactions,
    exportedAt: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataExport, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `electroloyal_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
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
  const confirmReset = confirm("Are you sure you want to reset all data to default demo state? Custom added data will be erased.");
  if (!confirmReset) return;

  localStorage.removeItem("electroloyal_customers");
  localStorage.removeItem("electroloyal_products");
  localStorage.removeItem("electroloyal_transactions");

  loadData();
  alert("Data reset to initial demo state!");
  closeModal("backupModal");
  renderDashboard();
}

// --------------------------------------------------------------------------
// 13. MODAL HELPERS & UTILITIES
// --------------------------------------------------------------------------

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
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
// 14. EVENT LISTENERS INITIALIZATION
// --------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Load LocalStorage Data
  loadData();

  // Navigation Links
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = item.dataset.page;
      navigateTo(pageId);
    });
  });

  // Modal Open Triggers
  document.getElementById("openAddCustomerModalBtn").addEventListener("click", openAddCustomerModal);
  document.getElementById("openAddProductModalBtn").addEventListener("click", openAddProductModal);
  document.getElementById("backupBtn").addEventListener("click", () => openModal("backupModal"));

  // Forms Submit
  document.getElementById("customerForm").addEventListener("submit", handleSaveCustomer);
  document.getElementById("purchaseForm").addEventListener("submit", handleCompletePurchase);
  document.getElementById("productForm").addEventListener("submit", handleSaveProduct);

  // Dynamic Calculation Listener on Purchase Form
  document.getElementById("purchProductSelect").addEventListener("change", updatePurchaseCalculations);
  document.getElementById("purchQty").addEventListener("input", updatePurchaseCalculations);

  // Search Inputs
  document.getElementById("customerSearchInput").addEventListener("input", (e) => renderCustomersTable(e.target.value));
  document.getElementById("productSearchInput").addEventListener("input", renderProductsGrid);
  document.getElementById("productCategoryFilter").addEventListener("change", renderProductsGrid);
  document.getElementById("productPriceFilter").addEventListener("change", renderProductsGrid);
  document.getElementById("transactionSearchInput").addEventListener("input", (e) => renderTransactionsTable(e.target.value));

  // Global Header Search
  document.getElementById("globalSearch").addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val.length > 0) {
      navigateTo("customers");
      document.getElementById("customerSearchInput").value = val;
      renderCustomersTable(val);
    }
  });

  // Initialize Default Dashboard
  renderDashboard();
});
