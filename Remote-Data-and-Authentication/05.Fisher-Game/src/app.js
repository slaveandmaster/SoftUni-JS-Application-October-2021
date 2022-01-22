let userInfo = null;
window.addEventListener("DOMContentLoaded", () => {
  let logginOut = document.querySelector("#logout");
  //console.log(el);
  userInfo = localStorage.getItem("userInfo");
  const btnLoad = document.querySelector(".load");
  const formAdd = document.getElementById("addForm");
  btnLoad.addEventListener("click", onLoad);
  formAdd.addEventListener("submit", onCreate);

  logginOut.addEventListener("click", logout);

  const user = JSON.parse(userInfo);
  if (userInfo != null) {
    // document.getElementById('user').style.display = 'block';
    document.getElementById("guest").style.display = "none";
    document.querySelector("#addForm .add").disabled = false;
    document.querySelector(".email > span").textContent = user.email;
} else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "block";
    
  }

  document.getElementById("catches").addEventListener("click", (e) => {
    let id = e.target.parentNode;
    let catchId = id.getAttribute("data-set");

    if (e.target.tagName == "BUTTON" && e.target.textContent == "Update") {
      
      let fields = e.target.parentElement.querySelectorAll("input");
      let values = [...fields].reduce((acc, current) => {
        acc[current.className] = current.value;
        return acc;
      }, {});
      let isEmpty = Object.values(values).some((x) => x == "");
      if (isEmpty) {
        throw new Error("All Fileds are required!");
      }
      //console.log(values);
      onUpdate(catchId, values);
      //console.log(e.target.parentElement.querySelectorAll("input"));
    } else if (e.target.tagName == "BUTTON" && e.target.textContent == "Delete") {

      onDelete(catchId);
    }
  });
});
async function onLoad() {
  const allCatches = document.getElementById("catches");
  const response = await fetch("http://localhost:3030/data/catches");
  let data = await response.json();
  let result = data.map((x) => createCatch(x));
  allCatches.replaceChildren(...result);
}
//UPDATE
async function onUpdate(id, content) {
  let userToken = JSON.parse(userInfo).token;

  const res = await fetch("http://localhost:3030/data/catches/" + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": userToken,
    },
    body: JSON.stringify(content),
  });
  let data = await res.json();

  onLoad();
}
//DELETE
async function onDelete(id) {
  let userToken = JSON.parse(userInfo).token;
  const res = await fetch("http://localhost:3030/data/catches/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": userToken,
    },
  });
  let data = await res.json();

  onLoad();
}

function createCatch(item) {
  let owner = userInfo && JSON.parse(userInfo).id == item._ownerId;
  let divCatch = document.createElement("div");
  divCatch.classList.add("catch");
  divCatch.setAttribute("data-set", item._id);
  let labelAngler = document.createElement("label");
  labelAngler.textContent = "Angler";
  let inputAngler = document.createElement("input");
  inputAngler.classList.add("angler");
  inputAngler.disabled = !owner ? true : "";
  inputAngler.value = item.angler;
  let labelWeigth = document.createElement("label");
  labelWeigth.textContent = "Weight";
  let inputWeigth = document.createElement("input");
  inputWeigth.classList.add("weigth");
  inputWeigth.value = item.weigth;
  inputWeigth.disabled = !owner ? true : "";
  let labelSpecies = document.createElement("label");
  labelSpecies.textContent = "Species";
  let inputSpecies = document.createElement("input");
  inputSpecies.classList.add("species");
  inputSpecies.value = item.species;
  inputSpecies.disabled = !owner ? true : "";
  let labelLocation = document.createElement("label");
  labelLocation.textContent = "Location";
  let inputLocation = document.createElement("input");
  inputLocation.classList.add("location");
  inputLocation.value = item.location;
  inputLocation.disabled = !owner ? true : "";
  let labelBait = document.createElement("label");
  labelBait.textContent = "Bait";
  let inputBait = document.createElement("input");
  inputBait.classList.add("bait");
  inputBait.value = item.bait;
  inputBait.disabled = !owner ? true : "";
  let labelCaptureTime = document.createElement("label");
  labelCaptureTime.textContent = "Capture Time";
  let inputCaptureTime = document.createElement("input");
  inputCaptureTime.classList.add("captureTime");
  inputCaptureTime.value = item.captureTime;
  inputCaptureTime.disabled = !owner ? true : "";
  let btnUpdate = document.createElement("button");
  btnUpdate.textContent = "Update";
  btnUpdate.classList.add("update");
  btnUpdate.disabled = !owner ? true : "";
  let btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("delete");
  btnDelete.disabled = !owner ? true : "";
  divCatch.appendChild(labelAngler);
  divCatch.appendChild(inputAngler);
  divCatch.appendChild(labelWeigth);
  divCatch.appendChild(inputWeigth);
  divCatch.appendChild(labelSpecies);
  divCatch.appendChild(inputSpecies);
  divCatch.appendChild(labelLocation);
  divCatch.appendChild(inputLocation);
  divCatch.appendChild(labelBait);
  divCatch.appendChild(inputBait);
  divCatch.appendChild(labelCaptureTime);
  divCatch.appendChild(inputCaptureTime);
  divCatch.appendChild(btnUpdate);
  divCatch.appendChild(btnDelete);

  return divCatch;
}
//CREATE
async function onCreate(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let userToken = JSON.parse(userInfo).token;
  const data = [...formData.entries()].reduce(
    (a, [key, value]) => Object.assign(a, { [key]: value }),
    {}
  );
  try {
    let isEmpty = Object.values(data).some((x) => x == "");
    if (isEmpty) {
      throw new Error("All Fileds are required!");
    }
    let response = await fetch("http://localhost:3030/data/catches", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userToken,
      },
      body: JSON.stringify(data),
    });
    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    let res = await response.json();
    //let res = await response.json();
    e.target.reset();
    onLoad();
  } catch (error) {
    alert(error);
  }
}
function logout() {
  localStorage.removeItem("userInfo");
  window.location = "./index.html";
}
