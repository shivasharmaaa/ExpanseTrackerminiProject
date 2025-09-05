const toastId = document.getElementById("myToast");
const toastBody = document.querySelector(".toast-body");
const Search = document.getElementById("filter");
document.addEventListener("DOMContentLoaded", ListData);

Search.addEventListener("keyup", function (event) {
  const lists = document.querySelectorAll(".list-group-item");
  const filterText = event.target.value.toLowerCase().trim();
  lists.forEach((list) => {
    const text = list.querySelector("span").textContent.toLowerCase();
    if (text.indexOf(filterText) === -1) {
      list.style.setProperty("display", "none", "important");
    } else {
      list.style.setProperty("display", "flex", "important");
      console.log(list);
    }
  });
});

function ListData() {
  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  for (let users of usersData) {
    display(users);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const value = event.target.price.value;
  const description = event.target.text.value;
  const option = event.target.options.value;

  const userObj = {
    value,
    description,
    option,
  };
  userObj.id = Date.now();

  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  const userId = JSON.parse(sessionStorage.getItem("userId"));

  if (userId) {
    updateUserData(usersData, userId, userObj);
    toastBody.textContent = "Edited successfully!";
    toast();
  } else {
    usersData.push(userObj);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    display(userObj);
    toastBody.textContent = "Submitted successfully!";
    toast();
  }
}

function display(userObj) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = `${userObj.value}  ${userObj.description}  ${userObj.option}`;
  li.appendChild(span);
  li.classList =
    "list-group-item d-flex justify-content-between align-items-center mt-4";
  li.id = userObj.id;
  ul.appendChild(li);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList = "btn btn-success ";
  li.appendChild(editButton);
  editButton.addEventListener("click", () => editData(li.id));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList = "btn  btn-warning";
  li.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => deleteData(li.id, li));
}

function editData(id) {
  const usersData = JSON.parse(localStorage.getItem("usersData"));

  for (let user of usersData) {
    if (user.id == id) {
      document.getElementById("price").value = user.value;
      document.getElementById("text").value = user.description;
      document.getElementById("options").value = user.option;
    }
  }
  const sbmtBtn = document.querySelector("button[type='submit']");
  sbmtBtn.textContent = "Update";
  sessionStorage.setItem("userId", JSON.stringify(id));
}

function deleteData(id, li) {
  let usersData = JSON.parse(localStorage.getItem("usersData"));

  usersData = usersData.filter((user) => {
    return user.id !== Number(id);
  });
  localStorage.setItem("usersData", JSON.stringify(usersData));

  li.remove();
  toastBody.textContent = "Deleted successfully!";
}

function updateUserData(usersData, userId, userObj) {
  for (let user of usersData) {
    if (user.id == userId) {
      user.value = userObj.value;
      user.description = userObj.description;
      user.option = userObj.option;
    }
  }
  const li = document.getElementById(userId);
  li.querySelector(
    "span"
  ).textContent = `${userObj.value}  ${userObj.description}  ${userObj.option}`;

  localStorage.setItem("usersData", JSON.stringify(usersData));
  sessionStorage.removeItem("userId");

  const sbmtBtn = document.querySelector("button[type='submit']");
  sbmtBtn.textContent = "Submit";
}

function toast() {
  const toast = new bootstrap.Toast(toastId, { delay: 3000 });
  toast.show();
}

// filter functionality
