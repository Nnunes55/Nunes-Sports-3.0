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

let isEdit = false,
  editId;
  const user = JSON.parse(localStorage.getItem("session")) || {} ;
function showInfo() {
  
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());

  getData
    .filter((product) => product.createdBy === user.email)
    .forEach((element, index) => {
      let creatElement = `<tr class="employeeDetails">
                <td>${index + 1}</td>
                <td>${element.productName}</td>
                <td>${element.productCodigo}</td>
                <td>${element.productDescricao}</td>
                <td>R$${element.productPreco}</td>

                <td>
                    <button class="btn btn-success" onclick="readInfo('${
                      element.productName
                    }', '${element.productCodigo}', 
                    '${element.productDescricao}', '${
        element.productPreco
      }')" data-bs-toggle="modal"
                    data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                    <button class="btn btn-primary" onclick="editInfo(${index}, '${
        element.productName
      }', '${element.productCodigo}', 
                    '${element.productDescricao}', '${
        element.productPreco
      }')" data-bs-toggle="modal" data-bs-target="#userForm" 
                    ><i class="bi bi-pencil-square"></i></button>

                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;

      userInfo.innerHTML += creatElement;
    });
}
showInfo();

function readInfo(name, codigo, descricao, preco) {
  (document.querySelector("#showName").value = name),
    (document.querySelector("#showCodigo").value = codigo),
    (document.querySelector("#showDescricao").value = descricao),
    (document.querySelector("#showPreco").value = preco);
}

function editInfo(index, name, Codigo, Descricao, Preco) {
  isEdit = true;
  editId = index;
  userName.value = name;
  codigo.value = Codigo;
  descricao.value = Descricao;
  preco.value = Preco;

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

  const information = {
    createdBy: user.email,
    productName: userName.value,
    productCodigo: codigo.value,
    productDescricao: descricao.value,
    productPreco: preco.value,
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }

  localStorage.setItem("database", JSON.stringify(getData));

  submitBtn.innerText = "Enviar";
  modalTitle.innerHTML = "preencha o formulário";

  showInfo();

  form.reset();

  modal.style.display = "none";
  document.querySelector(".modal-backdrop").remove();
});

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("session");
  window.location.href = "indexLogin.html";
});

