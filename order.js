// ===== Place order =====
document.getElementById("place-order")?.addEventListener("click", () => {
  const name    = document.getElementById("name").value.trim();
  const phone   = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length === 0) {
    alert("Savat bo'sh! Avval taom tanlang.");
    return;
  }

  // Save order
  const order = {
    id:      Date.now(),
    name,
    phone,
    address,
    items:   cart,
    total:   cart.reduce((sum, i) => sum + i.price * i.qty, 0) + 10000,
    date:    new Date().toLocaleString("uz-UZ"),
    status:  "qabul qilindi"
  };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem("cart");

  // Show success
  document.querySelector(".order-form").classList.add("hidden");
  document.getElementById("order-success").classList.remove("hidden");
});
