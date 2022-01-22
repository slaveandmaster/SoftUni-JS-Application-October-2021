import { register } from "../api/data.js";
let section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
//add on submit event Listener
form.addEventListener('submit', onSubmit);
section.remove();
let ctx = null;

export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}
async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(form);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();
    let rePass = formData.get('repeatPassword').trim();
    if (password != rePass) {
        alert('Password must match');
        return;
    }
    await register(email,password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('home');
}