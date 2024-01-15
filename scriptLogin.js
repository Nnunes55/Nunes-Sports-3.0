const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const admin = { email: "admin@admin.com", senha: "admin", role: "admin" };

  // LINK spread operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // const validuser = [...users, admin].find(user => user.email === email && user.senha === senha)

  users.push(admin);
  const validuser = users.find(
    (user) => user.email === email && user.senha === senha
  );

      if (!validuser) {
    return alert("Email e/ou senhas incorretos!!");
  }

  alert(`Bem Vindo ${validuser.email}`);
  localStorage.setItem("session", JSON.stringify(validuser));
  window.location.href = "index.html";
});
