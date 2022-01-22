import { logout } from "./src/api/data.js";
import { getUserData } from "./src/api/helper.js";
import { page, render } from "./src/lib.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetail } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

let main = document.querySelector("div.container");
document.getElementById('logoutBtn').addEventListener('click', onLogout);
page(decoratorContext);
page("/", showCatalog);
page("/create", showCreate);
page("/detail/:id", showDetail);
page("/edit/:id", showEdit);
page("/login", showLogin);
page("/register", showRegister);
page("/my-furniture", showCatalog);
updateNav();
page.start();
function decoratorContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.updateNav = updateNav;
  next();
}
function updateNav() {
  let isLogged = getUserData();
  if (isLogged) {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

//window.api = api;
async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}