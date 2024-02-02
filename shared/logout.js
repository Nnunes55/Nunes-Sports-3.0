const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("session");
  window.location.href = "../index.html";
});
