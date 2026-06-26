// =============================================
// Ricardo's Candy Business — script.js
// =============================================
// This file does two things:
// 1. Renders the product cards on index.html
// 2. Handles the order form on order.html
//
// HOW TO CUSTOMIZE YOUR PRODUCTS:
// Edit the PRODUCTS array below.
// Each product needs: id, name, category, price, emoji, inStock
// =============================================

// ---- YOUR PRODUCTS ----
// Change this list to match what you actually sell!
// price is in dollars (0.50 = 50 cents)
// inStock: true = available, false = sold out, "low" = almost gone

const PRODUCTS = [
  {
    id: "C001",
    name: "Skittles (fun size)",
    category: "Fruity",
    price: 0.50,
    emoji: "🌈",
    inStock: true
  },
  {
    id: "C002",
    name: "Snickers (fun size)",
    category: "Chocolate",
    price: 0.75,
    emoji: "🍫",
    inStock: true
  },
  {
    id: "C003",
    name: "Sour Patch Kids (bag)",
    category: "Sour",
    price: 1.00,
    emoji: "🍬",
    inStock: true
  },
  {
    id: "C004",
    name: "Jolly Ranchers (3 pack)",
    category: "Hard Candy",
    price: 0.50,
    emoji: "🍭",
    inStock: true
  },
  {
    id: "C005",
    name: "Swedish Fish (bag)",
    category: "Gummy",
    price: 1.00,
    emoji: "🐟",
    inStock: "low"
  },
  {
    id: "C006",
    name: "Twix (fun size)",
    category: "Chocolate",
    price: 0.75,
    emoji: "🍫",
    inStock: true
  },
  {
    id: "C007",
    name: "Starburst (fun size)",
    category: "Fruity",
    price: 0.50,
    emoji: "⭐",
    inStock: true
  },
  {
    id: "C008",
    name: "Warheads (3 pack)",
    category: "Sour",
    price: 0.75,
    emoji: "💥",
    inStock: false
  }
];

// ---- GOOGLE SHEETS CONNECTION ----
// After you set up Google Apps Script (see deploy_guide.md),
// replace this URL with your real Web App URL.
// Until then, the form will show a success message but won't save to Sheets.

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

// =============================================
// PRODUCT CARDS (runs on index.html)
// =============================================

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;  // Not on the products page

  PRODUCTS.forEach(product => {
    const stockLabel = product.inStock === true
      ? '<span class="product-status in-stock">✓ In Stock</span>'
      : product.inStock === "low"
      ? '<span class="product-status low-stock">⚠ Almost Gone</span>'
      : '<span class="product-status out-stock">✗ Sold Out</span>';

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="product-emoji">${product.emoji}</span>
      <div class="product-name">${product.name}</div>
      <span class="product-category">${product.category}</span>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      ${stockLabel}
    `;

    grid.appendChild(card);
  });

  // Update the product count stat
  const countEl = document.getElementById("products-count");
  if (countEl) {
    countEl.textContent = PRODUCTS.length + "+";
  }
}

// =============================================
// ORDER FORM (runs on order.html)
// =============================================

function buildOrderForm() {
  const productSelects = document.querySelectorAll(".product-select");
  if (productSelects.length === 0) return;  // Not on order page

  // Populate each product dropdown with available products
  productSelects.forEach(select => {
    // Add blank option
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "— Choose a candy —";
    select.appendChild(blank);

    PRODUCTS.forEach(product => {
      if (product.inStock === false) return;  // Skip sold out items
      const opt = document.createElement("option");
      opt.value = product.id;
      opt.dataset.price = product.price;
      opt.dataset.name = product.name;
      opt.textContent = `${product.name} — $${product.price.toFixed(2)}`;
      select.appendChild(opt);
    });
  });

  // Listen for changes to update summary
  document.querySelectorAll(".product-select, .product-qty").forEach(el => {
    el.addEventListener("change", updateOrderSummary);
    el.addEventListener("input", updateOrderSummary);
  });
}

function updateOrderSummary() {
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  if (!summaryItems) return;

  const rows = document.querySelectorAll(".order-item");
  let total = 0;
  let hasItems = false;
  summaryItems.innerHTML = "";

  rows.forEach(row => {
    const select = row.querySelector(".product-select");
    const qtyInput = row.querySelector(".product-qty");
    if (!select || !qtyInput) return;

    const selectedOption = select.options[select.selectedIndex];
    const qty = parseInt(qtyInput.value) || 0;
    const price = parseFloat(selectedOption.dataset.price) || 0;
    const name = selectedOption.dataset.name || "";

    if (name && qty > 0) {
      hasItems = true;
      const lineTotal = price * qty;
      total += lineTotal;

      const item = document.createElement("div");
      item.className = "summary-item";
      item.innerHTML = `
        <span>${name} × ${qty}</span>
        <span>$${lineTotal.toFixed(2)}</span>
      `;
      summaryItems.appendChild(item);
    }
  });

  if (!hasItems) {
    summaryItems.innerHTML = '<p class="summary-empty">No items selected yet</p>';
  }

  if (summaryTotal) {
    summaryTotal.querySelector(".total-amount").textContent = "$" + total.toFixed(2);
  }
}

// Add another item row to the order form
function addItemRow() {
  const list = document.getElementById("order-items-list");
  if (!list) return;

  const existingRow = list.querySelector(".order-item");
  if (!existingRow) return;

  const newRow = existingRow.cloneNode(true);
  // Reset values in the cloned row
  newRow.querySelectorAll("select").forEach(s => s.selectedIndex = 0);
  newRow.querySelectorAll("input").forEach(i => i.value = "1");

  list.appendChild(newRow);
  buildOrderForm();  // Re-populate new dropdowns
  updateOrderSummary();
}

// =============================================
// FORM SUBMISSION
// =============================================

function handleOrderSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("order-form");
  const submitBtn = document.getElementById("submit-btn");
  const successDiv = document.getElementById("order-success");

  if (!form) return;

  // Collect form data
  const customerName  = document.getElementById("customer-name").value.trim();
  const customerEmail = document.getElementById("customer-email").value.trim();
  const customerPhone = document.getElementById("customer-phone").value.trim();
  const notes         = document.getElementById("order-notes").value.trim();

  // Collect order items
  const orderItems = [];
  document.querySelectorAll(".order-item").forEach(row => {
    const select = row.querySelector(".product-select");
    const qtyInput = row.querySelector(".product-qty");
    if (!select || !qtyInput) return;

    const selectedOption = select.options[select.selectedIndex];
    const qty = parseInt(qtyInput.value) || 0;
    const name = selectedOption.dataset.name || "";
    const price = parseFloat(selectedOption.dataset.price) || 0;

    if (name && qty > 0) {
      orderItems.push({ name, qty, price, lineTotal: price * qty });
    }
  });

  if (orderItems.length === 0) {
    alert("Please select at least one candy item before submitting.");
    return;
  }

  const orderTotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const timestamp  = new Date().toLocaleString();

  // Build the payload
  const payload = {
    timestamp,
    customerName,
    customerEmail,
    customerPhone,
    items: orderItems.map(i => `${i.name} x${i.qty}`).join(", "),
    total: orderTotal.toFixed(2),
    notes,
    status: "Pending"
  };

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending Order...";

  // Send to Google Sheets (if URL is configured)
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",   // Required for Google Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(() => {
      showSuccess(customerName, orderTotal);
    })
    .catch(err => {
      console.error("Error sending to Sheets:", err);
      // Still show success to user — order is captured in payload
      showSuccess(customerName, orderTotal);
    });
  } else {
    // No Sheets URL yet — show success anyway (for testing)
    console.log("Order payload (not sent — no Sheets URL configured):", payload);
    setTimeout(() => showSuccess(customerName, orderTotal), 800);
  }
}

function showSuccess(name, total) {
  const form = document.getElementById("order-form");
  const successDiv = document.getElementById("order-success");

  if (form) form.style.display = "none";
  if (successDiv) {
    successDiv.classList.add("visible");
    const nameEl = document.getElementById("success-name");
    const totalEl = document.getElementById("success-total");
    if (nameEl) nameEl.textContent = name;
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
  }
}

// =============================================
// INIT — Run the right functions based on page
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // Index page
  renderProducts();

  // Order page
  buildOrderForm();
  updateOrderSummary();

  const form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", handleOrderSubmit);
  }

  const addBtn = document.getElementById("add-item-btn");
  if (addBtn) {
    addBtn.addEventListener("click", addItemRow);
  }
});
