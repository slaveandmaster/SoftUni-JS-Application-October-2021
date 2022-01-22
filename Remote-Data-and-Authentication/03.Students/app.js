let table = document.querySelector("#results > tbody");

async function loadStudents() {
  const url = "http://localhost:3030/jsonstore/collections/students";
  const response = await fetch(url);
  let data = await response.json();
  table.replaceChildren(...Object.values(data).map(createRow));
}
function createRow(item) {
  let row = document.createElement("tr");
  row.innerHTML = `<td>${item.firstName}</td><td>${item.lastName}</td><td>${item.facultyNumber}</td><td>${item.grade}</td>`;
  return row;
}
async function createStudent(student) {
  const url = "http://localhost:3030/jsonstore/collections/students";
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
}
async function onCreate(event) {
  event.preventDefault();
  const form = document.getElementById("form");
  let formData = new FormData(form);
  let firstName = formData.get("firstName").trim();
  let lastName = formData.get("lastName").trim();
  let facultyNumber = formData.get("facultyNumber").trim();
  let grade = formData.get("grade").trim();
  if (firstName && lastName && facultyNumber && grade) {
    let student = {
      firstName,
      lastName,
      facultyNumber,
      grade,
    };
    let result = await createStudent(student);
    table.appendChild(createRow(result));
  }
  Array.from(document.querySelectorAll(".inputs > input")).forEach(
    (i) => (i.value = "")
  );
}
let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", onCreate);
loadStudents();
