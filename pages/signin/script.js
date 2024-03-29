function showSenha() {
  var inputpass = document.getElementById("senha");
  var btnShowPass = document.getElementById("btn-senha");

  if (inputpass.type === "password") {
    inputpass.setAttribute("type", "text");
    btnShowPass.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  } else {
    inputpass.setAttribute("type", "password");
    btnShowPass.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  }
}

function showSenha1() {
  var inputpass = document.getElementById("confirmeSenha");
  var btnShowPass = document.getElementById("btn-senha1");

  if (inputpass.type === "password") {
    inputpass.setAttribute("type", "text");
    btnShowPass.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  } else {
    inputpass.setAttribute("type", "password");
    btnShowPass.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  }
}

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const confirmeSenha = document.querySelector("#confirmeSenha").value;

  if (!email) {
    alert("Por favor, preencha o email.");
    return;
  } else if (!email.includes(".com")) {
    alert("Por favor, informe um email válido com a terminação '.com'.");
    return;
  }
  if (!senha) {
    alert("Por favor, preencha a senha.");
    return;
  } else if (senha.length < 4) {
    alert("A senha deve ter pelo menos 4 caracteres.");
    return;
  }
  if (senha !== confirmeSenha) {
    alert("As senhas não conferem.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isUserRegistered = users.find((user) => user.email === email);
  if (isUserRegistered) {
    return alert("O usuario ja está Cadastrado!");
  }

  users.push({ email, senha, confirmeSenha, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario cadastrado com sucesso!");
  window.location.href = "../../";
});
