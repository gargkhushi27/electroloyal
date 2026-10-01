/**
 * Central Database Module for ELECTROLOYAL
 * Powered by built-in node:sqlite (ACID compliant, zero external dependencies)
 */

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'electroloyal.db');
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Preserve existing data: If running with an empty persistent volume (e.g. Railway volume),
// automatically seed from template if target DB does not exist yet.
const SEED_PATH = path.join(__dirname, 'seed_data', 'electroloyal.db');
const REPO_DB_PATH = path.join(DATA_DIR, 'electroloyal.db');
if (!fs.existsSync(DB_PATH)) {
  const sourceToCopy = fs.existsSync(SEED_PATH) ? SEED_PATH : (fs.existsSync(REPO_DB_PATH) && path.resolve(REPO_DB_PATH) !== path.resolve(DB_PATH) ? REPO_DB_PATH : null);
  if (sourceToCopy) {
    try {
      fs.copyFileSync(sourceToCopy, DB_PATH);
      console.log(`Database seeded from template to ${DB_PATH}`);
    } catch (err) {
      console.warn(`Warning: Could not seed database from ${sourceToCopy}:`, err.message);
    }
  }
}

const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high concurrent multi-client read/write performance
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
} catch (e) {
  // fallback if pragma fails
}

// ---------------------------------------------------------------------------
// 1. DATABASE SCHEMA SETUP
// ---------------------------------------------------------------------------

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT UNIQUE NOT NULL,
      dob TEXT,
      membership TEXT DEFAULT 'Bronze',
      totalSpending REAL DEFAULT 0,
      points INTEGER DEFAULT 0,
      purchasesCount INTEGER DEFAULT 0,
      redeemedRewards TEXT DEFAULT '[]',
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      productId TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      stock INTEGER NOT NULL,
      description TEXT,
      specifications TEXT DEFAULT '[]',
      eligibleMembership TEXT DEFAULT 'Bronze',
      membershipOffer TEXT
    );

    CREATE TABLE IF NOT EXISTS transactions (
      transactionId TEXT PRIMARY KEY,
      customerId TEXT NOT NULL,
      customerName TEXT NOT NULL,
      productId INTEGER,
      productName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      amount REAL NOT NULL,
      paymentMethod TEXT DEFAULT 'Online',
      points INTEGER DEFAULT 0,
      date TEXT NOT NULL,
      rewardActivity TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (customerId) REFERENCES customers(id)
    );

    CREATE TABLE IF NOT EXISTS transaction_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transactionId TEXT NOT NULL,
      productId INTEGER NOT NULL,
      productName TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
    );
  `);

  seedInitialData();
}

// ---------------------------------------------------------------------------
// 2. INITIAL SEEDING (Safe - does not overwrite existing data)
// ---------------------------------------------------------------------------

function seedInitialData() {
  const prodCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (prodCount === 0) {
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

    const insertProd = db.prepare(`
      INSERT INTO products (id, productId, name, category, price, image, stock, description, specifications, eligibleMembership, membershipOffer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    DEFAULT_PRODUCTS.forEach((p, idx) => {
      const pid = "PRD-" + String(idx + 1).padStart(6, '0');
      insertProd.run(
        p.id,
        pid,
        p.name,
        p.category,
        p.price,
        p.image,
        p.stock,
        p.description || '',
        JSON.stringify(p.specifications || []),
        p.eligibleMembership || 'Bronze',
        p.membershipOffer || ''
      );
    });
  }

  const custCount = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
  if (custCount === 0) {
    const INITIAL_CUSTOMERS = [
      { id: "ELC-000001", name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "9876543210", dob: "1994-06-12", membership: "Gold", totalSpending: 7498, points: 140, purchasesCount: 2, createdAt: "2026-08-15" },
      { id: "ELC-000002", name: "Priya Patel", email: "priya.patel@example.com", phone: "9812345678", dob: "1998-11-20", membership: "Diamond", totalSpending: 34999, points: 690, purchasesCount: 1, createdAt: "2026-09-01" },
      { id: "ELC-000003", name: "Rohan Verma", email: "rohan.v@example.com", phone: "9988776655", dob: "2000-02-05", membership: "Bronze", totalSpending: 1499, points: 20, purchasesCount: 1, createdAt: "2026-09-10" },
      { id: "ELC-000004", name: "Ananya Roy", email: "ananya.roy@example.com", phone: "9765432109", dob: "1992-09-30", membership: "Silver", totalSpending: 3999, points: 70, purchasesCount: 1, createdAt: "2026-09-18" }
    ];

    const insertCust = db.prepare(`
      INSERT INTO customers (id, name, email, phone, dob, membership, totalSpending, points, purchasesCount, redeemedRewards, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    INITIAL_CUSTOMERS.forEach(c => {
      insertCust.run(
        c.id,
        c.name,
        c.email,
        c.phone,
        c.dob,
        c.membership,
        c.totalSpending,
        c.points,
        c.purchasesCount,
        '[]',
        c.createdAt
      );
    });
  }

  const txnCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
  if (txnCount === 0) {
    const INITIAL_TRANSACTIONS = [
      { transactionId: "TXN-000001", customerId: "ELC-000001", customerName: "Aarav Sharma", productId: 7, productName: "AirBeat Max", quantity: 1, amount: 4999, paymentMethod: "Online", points: 90, date: "2026-09-05", rewardActivity: "Silver Offer Unlocked" },
      { transactionId: "TXN-000002", customerId: "ELC-000001", customerName: "Aarav Sharma", productId: 33, productName: "PowerBank 20K", quantity: 1, amount: 2499, paymentMethod: "Cash", points: 40, date: "2026-09-15", rewardActivity: "Gold Tier Reached" },
      { transactionId: "TXN-000003", customerId: "ELC-000002", customerName: "Priya Patel", productId: 2, productName: "Nova X1 Pro", quantity: 1, amount: 34999, paymentMethod: "Online", points: 690, date: "2026-09-20", rewardActivity: "Diamond Tier Reached" },
      { transactionId: "TXN-000004", customerId: "ELC-000003", customerName: "Rohan Verma", productId: 5, productName: "SoundPods Lite", quantity: 1, amount: 1499, paymentMethod: "Cash", points: 20, date: "2026-09-22", rewardActivity: "Bronze Birthday Reward" },
      { transactionId: "TXN-000005", customerId: "ELC-000004", customerName: "Ananya Roy", productId: 13, productName: "Boom 360", quantity: 1, amount: 3999, paymentMethod: "Online", points: 70, date: "2026-09-25", rewardActivity: "Silver Offer Unlocked" }
    ];

    const insertTxn = db.prepare(`
      INSERT INTO transactions (transactionId, customerId, customerName, productId, productName, quantity, amount, paymentMethod, points, date, rewardActivity, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    INITIAL_TRANSACTIONS.forEach(t => {
      insertTxn.run(
        t.transactionId,
        t.customerId,
        t.customerName,
        t.productId,
        t.productName,
        t.quantity,
        t.amount,
        t.paymentMethod,
        t.points,
        t.date,
        t.rewardActivity,
        t.date + 'T12:00:00.000Z'
      );
    });
  }
}

function resetDatabase() {
  db.exec('BEGIN IMMEDIATE');
  try {
    db.exec('DELETE FROM transaction_items');
    db.exec('DELETE FROM transactions');
    db.exec('DELETE FROM customers');
    db.exec('DELETE FROM products');
    seedInitialData();
    db.exec('COMMIT');
    return { success: true };
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

// ---------------------------------------------------------------------------
// 3. CORE BUSINESS RULES (Pure, Centralized Functions)
// ---------------------------------------------------------------------------

function calculatePoints(amount) {
  if (!amount || amount < 500) return 0;
  return Math.floor(amount / 500) * 10;
}

function calculateMembership(totalSpending) {
  const spending = totalSpending || 0;
  if (spending >= 10000) return "Diamond";
  if (spending >= 5000) return "Gold";
  if (spending >= 2500) return "Silver";
  return "Bronze";
}

function getUnlockedRewards(customer) {
  if (!customer) return [];
  const spending = customer.totalSpending || 0;
  const membership = customer.membership || calculateMembership(spending);
  const rewards = [{ id: "rw-bronze", name: "Birthday Reward (5% OFF)", tier: "Bronze", description: "Special Birthday reward coupon", status: "Available" }];
  if (spending >= 2500 || membership === "Silver" || membership === "Gold" || membership === "Diamond") {
    rewards.push({ id: "rw-silver", name: "Silver Special Offer (\u20b9250 Voucher)", tier: "Silver", description: "5% discount on selected products", status: "Available" });
  }
  if (spending >= 5000 || membership === "Gold" || membership === "Diamond") {
    rewards.push({ id: "rw-gold", name: "Gold Free Gift Package", tier: "Gold", description: "Free accessory gift box on qualifying purchase", status: "Available" });
  }
  if (spending >= 10000 || membership === "Diamond") {
    rewards.push({ id: "rw-diamond-1", name: "Diamond Premium Gift & VIP Access", tier: "Diamond", description: "15% off + VIP launch invitations", status: "Available" });
    rewards.push({ id: "rw-diamond-2", name: "Exclusive Product Launch Access", tier: "Diamond", description: "VIP early access to reserve new smartphone & laptop launches", status: "Available" });
  }
  return rewards;
}

function generateNextCustomerId() {
  const row = db.prepare("SELECT id FROM customers WHERE id LIKE 'ELC-%' ORDER BY id DESC LIMIT 1").get();
  if (!row) return "ELC-000001";
  const numPart = parseInt(row.id.replace("ELC-", ""), 10);
  const nextNum = isNaN(numPart) ? 1 : numPart + 1;
  return "ELC-" + String(nextNum).padStart(6, '0');
}

function generateNextTransactionId() {
  const row = db.prepare("SELECT transactionId FROM transactions WHERE transactionId LIKE 'TXN-%' ORDER BY transactionId DESC LIMIT 1").get();
  if (!row) return "TXN-000001";
  const numPart = parseInt(row.transactionId.replace("TXN-", ""), 10);
  const nextNum = isNaN(numPart) ? 1 : numPart + 1;
  return "TXN-" + String(nextNum).padStart(6, '0');
}

function generateNextProductId() {
  const row = db.prepare("SELECT productId FROM products WHERE productId LIKE 'PRD-%' ORDER BY productId DESC LIMIT 1").get();
  if (!row) return "PRD-000001";
  const numPart = parseInt(row.productId.replace("PRD-", ""), 10);
  const nextNum = isNaN(numPart) ? 1 : numPart + 1;
  return "PRD-" + String(nextNum).padStart(6, '0');
}

// ---------------------------------------------------------------------------
// 4. CUSTOMER OPERATIONS (Thread-safe & Duplicate-Protected)
// ---------------------------------------------------------------------------

function getCustomers(searchQuery = "") {
  let query = "SELECT * FROM customers";
  const params = [];
  if (searchQuery && searchQuery.trim()) {
    const q = `%${searchQuery.trim().toLowerCase()}%`;
    query += " WHERE LOWER(name) LIKE ? OR LOWER(id) LIKE ? OR phone LIKE ?";
    params.push(q, q, q);
  }
  query += " ORDER BY id ASC";
  const rows = db.prepare(query).all(...params);
  return rows.map(formatCustomerRow);
}

function getCustomerById(id) {
  const row = db.prepare("SELECT * FROM customers WHERE id = ?").get(id);
  return row ? formatCustomerRow(row) : null;
}

function findCustomer(query) {
  if (!query || !query.trim()) return null;
  const q = query.trim();
  const row = db.prepare("SELECT * FROM customers WHERE phone = ? OR id = ? OR LOWER(name) = LOWER(?) LIMIT 1").get(q, q, q);
  return row ? formatCustomerRow(row) : null;
}

function formatCustomerRow(row) {
  let redeemed = [];
  try {
    redeemed = JSON.parse(row.redeemedRewards || '[]');
  } catch (e) {
    redeemed = [];
  }
  const cust = {
    ...row,
    redeemedRewards: redeemed
  };
  cust.membership = calculateMembership(cust.totalSpending);
  cust.rewards = getUnlockedRewards(cust);
  return cust;
}

function createOrGetCustomer(data) {
  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();
  if (!name || !phone) {
    throw new Error("Both Name and Phone number are required.");
  }

  // Duplicate protection: Check if customer already exists by phone
  const existing = db.prepare("SELECT * FROM customers WHERE phone = ?").get(phone);
  if (existing) {
    return { customer: formatCustomerRow(existing), isExisting: true };
  }

  const id = data.id || generateNextCustomerId();
  const createdAt = data.createdAt || new Date().toISOString().split('T')[0];
  const membership = "Bronze";
  const totalSpending = 0;
  const points = 0;
  const purchasesCount = 0;
  const redeemedRewards = '[]';

  db.prepare(`
    INSERT INTO customers (id, name, email, phone, dob, membership, totalSpending, points, purchasesCount, redeemedRewards, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, data.email || '', phone, data.dob || '', membership, totalSpending, points, purchasesCount, redeemedRewards, createdAt);

  const created = getCustomerById(id);
  return { customer: created, isExisting: false };
}

function updateCustomer(id, data) {
  const customer = getCustomerById(id);
  if (!customer) throw new Error("Customer not found.");

  const name = data.name !== undefined ? data.name.trim() : customer.name;
  const phone = data.phone !== undefined ? data.phone.trim() : customer.phone;

  // Check phone uniqueness if phone is changing
  if (phone !== customer.phone) {
    const existing = db.prepare("SELECT * FROM customers WHERE phone = ? AND id != ?").get(phone, id);
    if (existing) throw new Error(`Customer with phone ${phone} already exists (${existing.name}).`);
  }

  db.prepare("UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?")
    .run(name, phone, data.email !== undefined ? data.email : customer.email, id);

  // Update customerName across transactions
  db.prepare("UPDATE transactions SET customerName = ? WHERE customerId = ?").run(name, id);

  return getCustomerById(id);
}

function deleteCustomer(id) {
  const customer = getCustomerById(id);
  if (!customer) throw new Error("Customer not found.");
  db.prepare("DELETE FROM customers WHERE id = ?").run(id);
  return { success: true, id };
}

// ---------------------------------------------------------------------------
// 5. PRODUCT OPERATIONS
// ---------------------------------------------------------------------------

function getProducts() {
  const rows = db.prepare("SELECT * FROM products ORDER BY id ASC").all();
  return rows.map(formatProductRow);
}

function getProductById(id) {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  return row ? formatProductRow(row) : null;
}

function formatProductRow(row) {
  let specs = [];
  try {
    specs = JSON.parse(row.specifications || '[]');
  } catch (e) {
    specs = [];
  }
  return {
    ...row,
    specifications: specs
  };
}

function createProduct(data) {
  const maxRow = db.prepare("SELECT MAX(id) as maxId FROM products").get();
  const nextId = (maxRow && maxRow.maxId ? maxRow.maxId : 0) + 1;
  const productId = data.productId || generateNextProductId();
  const specs = JSON.stringify(data.specifications || []);

  db.prepare(`
    INSERT INTO products (id, productId, name, category, price, image, stock, description, specifications, eligibleMembership, membershipOffer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    nextId,
    productId,
    data.name,
    data.category,
    Number(data.price),
    data.image,
    Number(data.stock),
    data.description || '',
    specs,
    data.eligibleMembership || 'Bronze',
    data.membershipOffer || ''
  );

  return getProductById(nextId);
}

function updateProduct(id, data) {
  const prod = getProductById(id);
  if (!prod) throw new Error("Product not found");

  const name = data.name !== undefined ? data.name : prod.name;
  const category = data.category !== undefined ? data.category : prod.category;
  const price = data.price !== undefined ? Number(data.price) : prod.price;
  const stock = data.stock !== undefined ? Number(data.stock) : prod.stock;
  const image = data.image !== undefined ? data.image : prod.image;
  const description = data.description !== undefined ? data.description : prod.description;
  const specs = data.specifications ? JSON.stringify(data.specifications) : JSON.stringify(prod.specifications);

  db.prepare(`
    UPDATE products SET name = ?, category = ?, price = ?, stock = ?, image = ?, description = ?, specifications = ?
    WHERE id = ?
  `).run(name, category, price, stock, image, description, specs, id);

  return getProductById(id);
}

function deleteProduct(id) {
  const prod = getProductById(id);
  if (!prod) throw new Error("Product not found");
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return { success: true, id };
}

// ---------------------------------------------------------------------------
// 6. ATOMIC PURCHASE WORKFLOW (CONCURRENCY-SAFE TRANSACTION)
// ---------------------------------------------------------------------------

function executePurchaseAtomic({ customerId, customerSearchQuery, items, paymentMethod = "Online", date }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const txnDate = date || new Date().toISOString().split('T')[0];

  // BEGIN IMMEDIATE acquires exclusive write lock for absolute concurrency safety
  db.exec('BEGIN IMMEDIATE');

  try {
    // 1. Identify customer
    let customerRow = null;
    if (customerId) {
      customerRow = db.prepare("SELECT * FROM customers WHERE id = ?").get(customerId);
    }
    if (!customerRow && customerSearchQuery) {
      const q = customerSearchQuery.trim();
      customerRow = db.prepare("SELECT * FROM customers WHERE phone = ? OR id = ? OR LOWER(name) = LOWER(?) LIMIT 1").get(q, q, q);
    }

    if (!customerRow) {
      throw new Error("Please select or specify a valid customer.");
    }

    // 2. Validate all products and stock availability
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const rawId = item.productId !== undefined ? item.productId : item.id;
      const requestedQty = parseInt(item.quantity, 10);
      if (!requestedQty || requestedQty <= 0) {
        throw new Error("Invalid quantity requested for product.");
      }

      const numId = parseInt(rawId, 10);
      const prod = !isNaN(numId)
        ? db.prepare("SELECT * FROM products WHERE id = ? OR productId = ?").get(numId, String(rawId))
        : db.prepare("SELECT * FROM products WHERE productId = ?").get(String(rawId));
      if (!prod) {
        throw new Error(`Product ID ${rawId} not found in database.`);
      }

      if (prod.stock < requestedQty) {
        throw new Error(`Insufficient stock for ${prod.name}! Available: ${prod.stock}, requested: ${requestedQty}`);
      }

      const subtotal = prod.price * requestedQty;
      totalAmount += subtotal;
      validatedItems.push({
        product: prod,
        quantity: requestedQty,
        subtotal
      });
    }

    // 3. Atomically decrement stock
    for (const vItem of validatedItems) {
      const updateResult = db.prepare(
        "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?"
      ).run(vItem.quantity, vItem.product.id, vItem.quantity);

      if (updateResult.changes === 0) {
        throw new Error(`Concurrent purchase conflict for ${vItem.product.name}. Insufficient stock.`);
      }
    }

    // 4. Calculate loyalty points & customer tier updates
    const earnedPoints = calculatePoints(totalAmount);
    const newSpending = (customerRow.totalSpending || 0) + totalAmount;
    const newPoints = (customerRow.points || 0) + earnedPoints;
    const newPurchasesCount = (customerRow.purchasesCount || 0) + 1;
    const oldTier = customerRow.membership;
    const newTier = calculateMembership(newSpending);

    db.prepare(`
      UPDATE customers SET totalSpending = ?, points = ?, purchasesCount = ?, membership = ?
      WHERE id = ?
    `).run(newSpending, newPoints, newPurchasesCount, newTier, customerRow.id);

    // 5. Generate exactly ONE transaction record
    const nextTxnId = generateNextTransactionId();
    const productSummary = validatedItems.map(vi =>
      vi.product.name + (vi.quantity > 1 ? ` (×${vi.quantity})` : "")
    ).join(", ");
    const totalQty = validatedItems.reduce((sum, vi) => sum + vi.quantity, 0);
    const rewardNote = oldTier !== newTier ? `Upgraded to ${newTier} Tier!` : "Purchase Completed";
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO transactions (transactionId, customerId, customerName, productId, productName, quantity, amount, paymentMethod, points, date, rewardActivity, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      nextTxnId,
      customerRow.id,
      customerRow.name,
      validatedItems[0].product.id,
      productSummary,
      totalQty,
      totalAmount,
      paymentMethod,
      earnedPoints,
      txnDate,
      rewardNote,
      nowIso
    );

    // Record transaction line items
    const insertLineItem = db.prepare(`
      INSERT INTO transaction_items (transactionId, productId, productName, price, quantity, subtotal)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const vi of validatedItems) {
      insertLineItem.run(
        nextTxnId,
        vi.product.id,
        vi.product.name,
        vi.product.price,
        vi.quantity,
        vi.subtotal
      );
    }

    db.exec('COMMIT');

    const updatedCustomer = getCustomerById(customerRow.id);
    const createdTxn = db.prepare("SELECT * FROM transactions WHERE transactionId = ?").get(nextTxnId);
    const updatedProducts = getProducts();

    return {
      success: true,
      transaction: createdTxn,
      customer: updatedCustomer,
      earnedPoints,
      totalAmount,
      updatedProducts
    };

  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

// ---------------------------------------------------------------------------
// 7. REWARD REDEMPTION
// ---------------------------------------------------------------------------

function redeemReward(customerId, rewardName) {
  const cust = getCustomerById(customerId);
  if (!cust) throw new Error("Customer not found");

  const unlocked = getUnlockedRewards(cust);
  const isEligible = unlocked.some(r => r.name === rewardName);
  if (!isEligible) {
    throw new Error(`Customer is not eligible for reward: ${rewardName}`);
  }

  const redeemed = cust.redeemedRewards || [];
  if (redeemed.includes(rewardName)) {
    throw new Error("Reward has already been redeemed.");
  }

  redeemed.push(rewardName);
  db.prepare("UPDATE customers SET redeemedRewards = ? WHERE id = ?")
    .run(JSON.stringify(redeemed), customerId);

  return getCustomerById(customerId);
}

// ---------------------------------------------------------------------------
// 8. TRANSACTIONS & STATS
// ---------------------------------------------------------------------------

function getTransactions(searchQuery = "") {
  let query = "SELECT * FROM transactions";
  const params = [];
  if (searchQuery && searchQuery.trim()) {
    const q = `%${searchQuery.trim().toLowerCase()}%`;
    query += " WHERE LOWER(transactionId) LIKE ? OR LOWER(customerName) LIKE ? OR LOWER(productName) LIKE ?";
    params.push(q, q, q);
  }
  query += " ORDER BY createdAt DESC";
  return db.prepare(query).all(...params);
}

function getStats() {
  const custCount = db.prepare("SELECT COUNT(*) as count FROM customers").get().count;
  const totalPoints = db.prepare("SELECT SUM(points) as sum FROM customers").get().sum || 0;
  const totalSales = db.prepare("SELECT SUM(amount) as sum FROM transactions").get().sum || 0;
  const diamondCount = db.prepare("SELECT COUNT(*) as count FROM customers WHERE membership = 'Diamond'").get().count;
  const txnCount = db.prepare("SELECT COUNT(*) as count FROM transactions").get().count;

  return {
    totalCustomers: custCount,
    totalPointsIssued: totalPoints,
    totalSales: totalSales,
    diamondMembers: diamondCount,
    transactionsCount: txnCount
  };
}

// Initialize on module load
initSchema();

module.exports = {
  db,
  DB_PATH,
  getCustomers,
  getCustomerById,
  findCustomer,
  createOrGetCustomer,
  updateCustomer,
  deleteCustomer,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTransactions,
  executePurchaseAtomic,
  redeemReward,
  getStats,
  calculatePoints,
  calculateMembership,
  getUnlockedRewards,
  resetDatabase
};
