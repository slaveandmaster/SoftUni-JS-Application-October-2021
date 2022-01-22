let userData = null;
function solve() {
  //userData = localStorage.getItem('userData');
  let userSession = sessionStorage.getItem("userData");
  let tbody = document.querySelector("tbody");
  //loadData();
  if (userSession != null) {
    //logout
    document.getElementById("user").addEventListener("click", logout);
  }
  document.querySelector(".wrapper").addEventListener("click", async (e) => {
    //e.preventDefault();
    if (e.target.tagName == "BUTTON" && e.target.textContent == "Register") {
      //console.log("register");
      doRegister(e);
    } else if (
      e.target.tagName == "BUTTON" &&
      e.target.textContent == "Login"
    ) {
      doLogin(e);
    } else if (
      //CREATE
      e.target.tagName == "BUTTON" && e.target.textContent == "Create") {
      e.preventDefault();
      const form = e.target.parentElement;
      let formData = new FormData(form);
      //get all fields
      let fields = [...formData.entries()].reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      let isEmpty = Object.values(fields).some((x) => x == "");

      if (isEmpty) {
        throw new Error("All Fileds are required!");
      }
      let result = await onCreate(fields);
      tbody.appendChild(createTableRow(result));
      form.reset();
      loadData();
    } else if (e.target.tagName == "BUTTON" && e.target.textContent == "Buy") {
      //BUY
      e.preventDefault();
      let checkedFields = Array.from(
        document.querySelectorAll("input[type=checkbox]:checked")
      )
        .map((x) => x.parentElement.parentElement)
        .map((el) => ({
          name: el.children[1].textContent.trim(),
          price: el.children[2].textContent.trim(),
          factor: el.children[3].textContent.trim(),
        }));
      let totalPrice = 0;
      let products = [];
      for (const item of checkedFields) {
        products.push(item.name);
        totalPrice += Number(item.price);
      }
      let order = {
        products,
        totalPrice,
      };
      await onBuy(order);
    } else if (
      e.target.tagName == "BUTTON" && e.target.textContent == "All orders") {
      //ALL ORDERS
      e.preventDefault();
      let myOrders = document.querySelector(".orders");
      let currentUser = JSON.parse(userSession).id;
      let result = await allOrders(currentUser);
      myOrders.replaceChildren(showOrders(...result));
    }
  });
  async function doLogin(e) {
    e.preventDefault();
    let form = e.target.parentElement;
    let formData = new FormData(form);
    let email = formData.get("email");
    let password = formData.get("password");
    try {
      const response = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok != true) {
        const error = await response.json();
        throw new Error(error.message);
      }
      let data = await response.json();

      let userInfo = {
        id: data._id,
        email: data.email,
        token: data.accessToken,
      };
      sessionStorage.setItem("userData", JSON.stringify(userInfo));
      window.location = "homeLogged.html";
    } catch (err) {
      alert(err.message);
    }
  }
  async function doRegister(e) {
    e.preventDefault();
    let form = e.target.parentElement;
    let formData = new FormData(form);
    let fields = [...formData.entries()].reduce((acc, [key, value]) => {
      if (key != "rePass") {
        acc[key] = value;
      }
      return acc;
    }, {});
    try {
      let isEmpty = Object.values(fields).some((x) => x == "");
      if (isEmpty) {
        throw new Error("All Fileds are required!");
      }
      let res = await request("http://localhost:3030/users/register", {
        method: "post",
        body: JSON.stringify(fields),
      });
      let userInfo = {
        id: res._id,
        email: res.email,
        token: res.accessToken,
      };
      sessionStorage.setItem("userData", JSON.stringify(userInfo));
      window.location = "homeLogged.html";
    } catch (err) {
      alert(err.message);
    }
    return res;
  }

  async function onCreate(item) {
    try {
      let res = await fetch("http://localhost:3030/data/furniture", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": JSON.parse(userSession).token,
        },
        body: JSON.stringify(item),
      });
      if (res.ok != true) {
        const err = await res.json();
        throw new Error(err.message);
      }
      let data = await res.json();
      return data;
    } catch (err) {
      alert(err.message);
    }
  }

  async function onBuy(item) {
    try {
      let res = await fetch("http://localhost:3030/data/orders", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": JSON.parse(userSession).token,
        },
        body: JSON.stringify(item),
      });
      if (res.ok != true) {
        const err = await res.json();
        throw new Error(err.message);
      }
      let data = await res.json();
      return data;
    } catch (err) {
      alert(err.message);
    }
  }
  async function allOrders(ownerId) {
    try {
      const res = await fetch(
        "http://localhost:3030/data/orders?where=_ownerId%3D%22" +
          ownerId +
          "%22",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(userSession).token,
          },
        }
      );
      if (res.ok != true) {
        const error = await res.json();
        throw new Error(error.message);
      }
      let data = await res.json();
      return data;
    } catch (err) {
      alert(err.message);
    }
  }
  async function loadData() {
    let res = await request("http://localhost:3030/data/furniture", {
      method: "get",
    });
    let products = res.map((x) => createTableRow(x));
    tbody.replaceChildren(...products);
  }
  async function request(url, options) {
    if (options && options.body != undefined) {
      Object.assign(options, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    let res = await fetch(url, options);
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    let data = await res.json();
    return data;
  }
  function logout() {
    sessionStorage.removeItem("userData");
    window.location = "./login.html";
  }
  function createTableRow(item) {
    let row = document.createElement("tr");
    row.innerHTML = `<td><img src=${item.img}></td><td>${item.name}</td><td>${item.price}</td><td>${item.factor}</td><td><input type="checkbox"/></td>`;
    return row;
  }
  function showOrders(order) {
    let pElement = document.createElement("p");
    pElement.innerHTML = `Bought furniture: <span>${order.products.join(",")}</span>    
<p>Total price: <span>${order.totalPrice} $</span></p>
<button>All orders</button>`;
    return pElement;
  }
}
solve();
