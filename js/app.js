const signupForm = document.querySelector("#signupForm");
const tableBody = document.querySelector("#tableBody");
const userNameInput = document.getElementById("userName");
const userLastNameInput = document.getElementById("userLastName");
const fatherNameInput = document.getElementById("fatherName");
const ageInput = document.getElementById("age");
const searchBox = document.getElementById("searchBox");

const userList = JSON.parse(localStorage.getItem("user")) || [];

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    firstName: e.target.userName.value,
    lastName: e.target.userLastName.value,
    age: e.target.age.value,
    fatherName: e.target.fatherName.value,
    id: generateUniqueId(),
  };

  if (
    userData.firstName === "" ||
    userData.lastName === "" ||
    userData.age === "" ||
    userData.fatherName === ""
  ) {
    alert("please fill out the form.");
    return;
  }
  userList.push(userData);

  localStorage.setItem("user", JSON.stringify(userList));

  e.target.userName.value = "";
  e.target.userLastName.value = "";
  e.target.age.value = "";
  e.target.fatherName.value = "";

  renderInUT(userList, tableBody);
});

function renderInUT(list, container) {
  container.innerHTML = "";
  list.forEach((value, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${index + 1}</td>
                       <td>${value.firstName}</td>
                        <td>${value.lastName}</td>
                        <td>${value.age}</td>
                        <td>${value.fatherName}</td>
                        <td class="delete" id=${value.id}>
                           <i class="fas fa-trash"></i>
                        </td>`;

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

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const clickedId = e.target.id;

    const newList = userList.filter((user) => user.id != clickedId);

    userList.length = 0;

    userList.push(...newList);

    localStorage.setItem("user", JSON.stringify(userList));

    renderInUT(userList, tableBody);
  }
});

function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

searchBox.addEventListener("input", (e) => {
  const userKeyWord = e.target.value;

  const finalResult = userList.filter(
    (user) =>
      user.firstName.includes(userKeyWord) ||
      user.lastName.includes(userKeyWord)
  );

  renderInUT(finalResult, tableBody);
});

renderInUT(userList, tableBody);
