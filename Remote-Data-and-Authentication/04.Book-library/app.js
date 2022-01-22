const tbody = document.querySelector("tbody");
document.getElementById("loadBooks").addEventListener("click", loadBooks);
document.getElementById("createBook").addEventListener("submit", onCreate);
tbody.addEventListener("click", onClick);
document.getElementById("btn-update").addEventListener("click", onUpdate);

async function request(url, options) {
  if (options && options.body != undefined) {
    Object.assign(options, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const response = await fetch(url, options);
  if (response.ok != true) {
    const err = await response.json;
    throw new Error(err.message);
  }
  const data = await response.json();
  return data;
}
async function loadBooks() {
  const result = await request(
    "http://localhost:3030/jsonstore/collections/books"
  );
  const res = Object.entries(result).map(([id, book]) => createRow(id, book));
  tbody.replaceChildren(...res);
}
async function createBook(book) {
  const result = await request(
    "http://localhost:3030/jsonstore/collections/books",
    {
      method: "post",
      body: JSON.stringify(book),
    }
  );
  return result;
}

async function updateBook(id, book) {
  const result = fetch(
    "http://localhost:3030/jsonstore/collections/books/" + id,
    {
      method: "PUT",
      body: JSON.stringify(book),
    }
  );
  return result;
}
//delete record
async function deleteBook(bookId) {
  let result = fetch(
    "http://localhost:3030/jsonstore/collections/books/" + bookId,
    {
      method: "delete",
    }
  );
  return result;
}
//get record by id
async function getBookById(bookId) {
  const result = await request(
    "http://localhost:3030/jsonstore/collections/books/" + bookId
  );
  return result;
}

//create html elements
//function to create row
function createRow(id, item) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td data-id="${id}">${item.author}</td><td>${item.title}</td><td><button>Edit</button>
    <button>Delete</button></td>`;
  return tr;
}
//handler functions
async function onCreate(e) {
  e.preventDefault();

  const form = e.target;
  let formData = new FormData(form);
  let author = formData.get("author");
  let title = formData.get("title");
  let book = { author, title };
  let result = await createBook(book);
  tbody.appendChild(createRow(result._id, result));
  form.reset();
}
async function onClick(e) {
  if (e.target.tagName == "BUTTON" && e.target.textContent == "Edit") {
    let id = e.target.parentElement.parentElement.children[0].dataset.id;
    let book = await getBookById(id);

    document.getElementById("createBook").style.display = "none";
    document.getElementById("editBook").style.display = "block";
    let form = document.getElementById("editBook");

    form.querySelector('[name="id"]').value = id;
    form.querySelector('[name="author"]').value = book.author;
    form.querySelector('[name="title"]').value = book.title;
  } else if (e.target.tagName == "BUTTON" && e.target.textContent == "Delete") {
    let row = e.target.parentElement.parentElement;
    let id = e.target.parentElement.parentElement.children[0].dataset.id;
    await deleteBook(id);
    row.remove();
  }
}

async function onUpdate(e) {
  e.preventDefault();
  let form = document.getElementById("editBook");
  console.log(form);
  let formData = new FormData(form);

  let id = formData.get("id");
  let author = formData.get("author");
  let title = formData.get("title");
  let book = { author, title };
  let result = await updateBook(id, book);
  form.reset();
  document.getElementById("createBook").style.display = "block";
  document.getElementById("editBook").style.display = "none";

  //load all books after changes
  loadBooks();
}
//load all book on after page load
loadBooks();
