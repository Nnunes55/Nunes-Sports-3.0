const session = JSON.parse(localStorage.getItem("session")) || {};

document.addEventListener("DOMContentLoaded", (e) => {
  const isapp = window.location.pathname.includes("pages/adm")
  || window.location.pathname.includes("pages/home")

  const isLoginPage = window.location.pathname === "/"

  const isRegisterPage = window.location.pathname.includes("pages/signin")
  

  if (!session.email && isapp) {
    window.location.href = "/";
  }

    if (session.email && (isLoginPage || isRegisterPage)) {
    window.location.href = "/pages/home";
  }
});
