const session = JSON.parse(localStorage.getItem("session")) || {};
document.addEventListener("DOMContentLoaded", (e) => {
  const isapp = [
    "/index.html",
    "/Nunes-Sports-3.0/",
    "/Nunes-Sports-3.0/index.html",
  ].includes(window.location.pathname);

  const isLoginPage = [].includes(window.location.pathname)
  const isRegisterPage = [].includes(window.location.pathname)

  if (!session.email && isapp) {
    window.location.href = "index.html";
  }

  if (session.email && (isLoginPage || isRegisterPage)) {
    window.location.href = "index.html";
  }
});

