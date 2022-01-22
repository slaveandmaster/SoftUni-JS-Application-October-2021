import { login } from "../api/data.js";
const section = document.getElementById("form-login");
const form = section.querySelector("form");
//add form eventListener
form.addEventListener("submit", onLogin);
section.remove();
let ctx = null;
export async function showLoginPage(ctxTarget) {
  ctx = ctxTarget;
  ctx.showSection(section);
}

async function onLogin(event) {
  event.preventDefault();
  let formData = new FormData(form);

  let email = formData.get("email").trim();
  let password = formData.get("password").trim();

  await login(email, password);
  form.reset();
  ctx.updateNav();
  ctx.goTo('home');
}
