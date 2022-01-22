function attachEvents() {
  let btnLoad = document.getElementById("btnLoad");
  let btnCreate = document.getElementById("btnCreate");

  btnLoad.addEventListener("click", loadContacts);
  btnCreate.addEventListener("click", onClick);
}
attachEvents();
let ulElement = document.getElementById("phonebook");
let personField = document.getElementById("person");
let phoneField = document.getElementById("phone");
ulElement.addEventListener("click", onDelete);
async function onClick() {
  let person = personField.value.trim();
  let phone = phoneField.value.trim();
  let contact = { person, phone };
  let result = await createContact(contact);
  ulElement.appendChild(createList(result));
  personField.value = "";
  phoneField.value = "";
  return result;
}

async function loadContacts() {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const response = await fetch(url);
  let data = await response.json();

  ulElement.replaceChildren(...Object.values(data).map(createList));
  //return result;
}

async function createContact(contact) {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  let data = await response.json();
  return data;
}

async function onDelete(event) {
  if (
    event.target.tagName == "BUTTON" &&
    event.target.textContent == "Delete"
  ) {
    let phoneId = event.target.dataset.id;
    if (phoneId !== undefined) {
      await deleteContact(phoneId);
      event.target.parentElement.remove();
    }
  }
}

async function deleteContact(id) {
  const url = "http://localhost:3030/jsonstore/phonebook/" + id;
  const response = await fetch(url, {
    method: "delete",
  });
  let data = await response.json();
  return data;
}

function createList(item) {
  let liElement = document.createElement("li");
  liElement.innerHTML = `${item.person}: ${item.phone} <button data-id="${item._id}"}>Delete</button>`;
  return liElement;
}
