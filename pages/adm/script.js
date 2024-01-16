var form = document.getElementById("myForm"),
  userName = document.getElementById("name"),
  codigo = document.getElementById("codigo"),
  descricao = document.getElementById("descricao"),
  preco = document.getElementById("preco"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title");
logoutBtn = document.getElementById("logout");

let getData = localStorage.getItem("database")
  ? JSON.parse(localStorage.getItem("database"))
  : [];

const getUsers = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

let isEdit = false,
  editId;
const user = JSON.parse(localStorage.getItem("session")) || {};
function showInfo() {
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());

  getUsers.forEach((element, index) => {
    let creatElement = `<tr class="employeeDetails">
                <td>${index + 1}</td>
                <td>${element.email}</td>
                <td>${element.role}</td>
                

                
                <td>
                    <button class="btn btn-success" onclick="readInfo('${
                      element.email
                    }', '${element.role}', 
                    )" data-bs-toggle="modal"
                    data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                    <button class="btn btn-primary" onclick="editInfo(${index}, '${
      element.email
    }', '${element.role}', 
                   )" data-bs-toggle="modal" data-bs-target="#userForm" 
                    ><i class="bi bi-pencil-square"></i></button>

                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;

    userInfo.innerHTML += creatElement;
  });
}

function readInfo(email, role) {
  (document.querySelector("#showEmail").value = email),
    (document.querySelector("#showRole").value = role)
}

function editInfo(index, email, role) {
  isEdit = true;
  editId = index;
  userName.value = email;
  codigo.value = role;
  submitBtn.innerText = "Enviar";
  modalTitle.innerText = "Altere os dados";
}

function deleteInfo(index) {
  if (
    confirm("Você irá deletar permanentemente esse item! Você tem certeza?")
  ) {
    getData.splice(index, 1);
    localStorage.setItem("database", JSON.stringify(getData));
    showInfo();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const actualUser = getUsers.find(
    (user) => user.email === userName.value
  );
  console.log(actualUser)
  const information = {
    email: userName.value,
    role: codigo.value,
    senha: actualUser.senha,
    confirmeSenha: actualUser.confirmeSenha
  };

  if (!isEdit) {
    getUsers.push(information);
  } else {
    isEdit = false;
    getUsers[editId] = information;
  }

  localStorage.setItem("users", JSON.stringify(getUsers));

  submitBtn.innerText = "Enviar";
  modalTitle.innerHTML = "preencha o formulário";

  showInfo();

  form.reset();

  modal.style.display = "none";
  document.querySelector(".modal-backdrop").remove();
});

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("session");
  window.location.href = "index.html";
});



document.addEventListener("DOMContentLoaded", (e) => {
  showInfo();
});