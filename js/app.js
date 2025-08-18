import {
  signupForm,
  tableBody,
  userNameInput,
  userLastNameInput,
  fatherNameInput,
  searchBox,
} from "./domElements.js";
import { renderInUT } from "./render.js";
import { generateUniqueId, preventNumberInput } from "./utils.js";

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
