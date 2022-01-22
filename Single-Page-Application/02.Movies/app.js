import { logout } from "./api/data.js";
import { showSection } from "./api/dom.js";
import { showCreatePage } from "./views/create.js";
import { showDetailsPage } from "./views/detail.js";
import { showHomePage } from "./views/home.js";
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showEditPage } from "./views/edit.js";
let menu = document.querySelector("nav");
document.getElementById("logoutBtn").addEventListener("click", onLogout);
menu.addEventListener("click", onNavigate);
//assoc buttons from nav
const links = {
  homeBtn: "home",
  loginBtn: "login",
  logoutBtn: "logout",
  registerBtn: "register",
};
//assoc views
const views = {
  home: showHomePage,
  login: showLoginPage,
  register: showRegisterPage,
  detail: showDetailsPage,
  create: showCreatePage,
  edit: showEditPage,
};

//context object
const ctx = {
  showSection,
  goTo,
  updateNav,
};

function updateNav() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  
  let visible = [...menu.querySelectorAll(".users")];
  let invisible = [...menu.querySelectorAll(".guests")];
  if (userData && userData != null) {
    document.getElementById('welcomeMsg').innerHTML = `Welcome, ${userData.email}`;  
    visible.forEach((row) => (row.style.display = "block"));
    invisible.forEach((row) => (row.style.display = "none"));
  } else {
    visible.forEach((row) => (row.style.display = "none"));
    invisible.forEach((row) => (row.style.display = "block"));
    
  }
}

function onNavigate(e) {
  if (e.target.tagName == "A") {
    let name = links[e.target.id];
    console.log(name);
    if (name) {
      e.preventDefault();
      goTo(name);
    }
  }
}

function goTo(name, ...params) {
  const view = views[name];
  if (view) {
    view(ctx, ...params);
  }
}

async function onLogout(e) {
  
  e.preventDefault();
  e.stopImmediatePropagation();
  await logout();
  ctx.goTo("home");
  ctx.updateNav();
}
goTo("home");
updateNav();
