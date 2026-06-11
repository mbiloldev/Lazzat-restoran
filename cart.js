// ===== Add to cart =====
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(i => i.id === itemId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, emoji: item.emoji, price: item.price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`${item.name} savatga qo'shildi!`);
}

// ===== Remove from cart =====
function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter(i => i.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// ===== Change quantity =====
function changeQty(itemId, delta) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find(i => i.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// ===== Render cart page =====
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Savat bo'sh 🛒</p>
        <a href="menu.html" class="btn-primary">Menyuga o'tish</a>
      </div>`;
    updateSummary(0);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join("");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  updateSummary(subtotal);
}

// ===== Update summary =====
function updateSummary(subtotal) {
  const delivery = 10000;
  const el = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  if (el) el.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(subtotal + delivery);
}

// ===== Toast notification =====
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; background:#1a1a1a; color:#fff;
    padding:12px 20px; border-radius:8px; font-size:14px; z-index:9999;
    animation: fadeIn 0.2s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ===== Init =====
renderCart();
