var form = document.getElementById("myForm"),
  userName = document.getElementById("name"),
  senha = document.getElementById("senha"),
  codigo = document.getElementById("codigo"),
  descricao = document.getElementById("descricao"),
  preco = document.getElementById("preco"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title");

  const logout1 = document.getElementById("logout1")

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
                <td>${element.senha}</td>
                <td>${element.role}</td>
                

                
                <td>
                    <button class="btn btn-success" onclick="readInfo('${
                      element.email
                    }','${
                      element.senha
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

function readInfo( email, senha, role) {
  


  (document.querySelector("#showEmail").value = email),
  (document.querySelector("#showSenha").value = senha)
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
    getUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(getUsers));
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

document.addEventListener("DOMContentLoaded", (e) => {
  showInfo();
});


logout1.addEventListener("click", (e) => {
  window.location.href = "/pages/home/index.html";
});

