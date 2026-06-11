// ===== Menu Data =====
const menuItems = [
  { id: 1, name: "Osh",           emoji: "🍚", price: 35000, category: "main",  desc: "An'anaviy o'zbek oshi, qo'zi go'shti bilan" },
  { id: 2, name: "Lag'mon",       emoji: "🍜", price: 28000, category: "main",  desc: "Qo'lda yayilgan qiyma lag'mon" },
  { id: 3, name: "Manti",         emoji: "🥟", price: 24000, category: "main",  desc: "Bug'da pishirilgan go'shtli manti" },
  { id: 4, name: "Shurva",        emoji: "🍲", price: 22000, category: "soup",  desc: "Qo'zi go'shtli boy sho'rva" },
  { id: 5, name: "Mastava",       emoji: "🥣", price: 20000, category: "soup",  desc: "Guruchli sabzavotli mastava" },
  { id: 6, name: "Somsa",         emoji: "🥐", price: 8000,  category: "main",  desc: "Tandirda pishirilgan go'shtli somsa" },

// ===== Format price =====
function formatPrice(price) {
  return price.toLocaleString("uz-UZ") + " so'm";
}

// ===== Render menu =====
function renderMenu(category = "all") {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  const filtered = category === "all"
    ? menuItems
    : menuItems.filter(item => item.category === category);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card">
      <span class="menu-card-emoji">${item.emoji}</span>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <span class="menu-card-price">${formatPrice(item.price)}</span>
          <button class="add-to-cart" onclick="addToCart(${item.id})">+ Qo'shish</button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== Tab switching =====
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.category);
  });
});

// ===== Update cart badge =====
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}

// ===== Init =====
renderMenu();
updateCartBadge();
