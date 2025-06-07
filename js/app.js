const signupForm = document.querySelector("#signupForm");
const userList = [];
const tableBody = document.querySelector("#tableBody");
const userNameInput = document.getElementById("userName");
const userLastNameInput = document.getElementById("userLastName");
const fatherNameInput = document.getElementById("fatherName");
const ageInput = document.getElementById("age");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    firstName: e.target.userName.value,
    lastName: e.target.userLastName.value,
    age: e.target.age.value,
    fatherName: e.target.fatherName.value,
  };

  userList.push(userData);

  e.target.userName.value = "";
  e.target.userLastName.value = "";
  e.target.age.value = "";
  e.target.fatherName.value = "";

  renderInUT(userList, tableBody);
});

function renderInUT(list, container) {
  container.innerHTML = "";
  list.forEach((value) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${value.firstName}</td>
                        <td>${value.lastName}</td>
                        <td>${value.age}</td>
                        <td>${value.fatherName}</td>`;

    console.log(value);
    console.log(tr);

    container.appendChild(tr);
  });
}

function preventNumberInput(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode >= 48 && charCode <= 57) {
    event.preventDefault();
    return false;
  }
  return true;
}


if (userNameInput) {
  userNameInput.addEventListener("keypress", preventNumberInput);
}

if (userLastNameInput) {
  userLastNameInput.addEventListener("keypress", preventNumberInput);
}

if (fatherNameInput) {
  fatherNameInput.addEventListener("keypress", preventNumberInput);
}
