// ===== Place order =====
document.getElementById("place-order")?.addEventListener("click", () => {
  const name    = document.getElementById("name").value.trim();
  
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
