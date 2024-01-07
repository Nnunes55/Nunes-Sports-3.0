const session = JSON.parse(localStorage.getItem("session")) || {};
document.addEventListener("DOMContentLoaded", (e) => {
    const isapp = window.location.pathname === "/index.html"

   if (!session.email && isapp) {
    window.location.href = "indexLogin.html";
  }
    
  if(session.email && !isapp) {
    window.location.href = "index.html";
  }
});
