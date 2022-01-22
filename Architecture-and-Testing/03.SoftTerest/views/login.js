import { login } from '../src/data.js';
const section = document.getElementById('loginPage');
let form = section.querySelector('.row-form.d-md-flex.flex-mb-equal'); 
form.addEventListener('submit', onLogin)
section.remove();
let ctx = null;

export async function showLoginPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onLogin(e) {
    e.preventDefault();
    let el = e.target;
    let formData = new FormData(el);
    let fields = [...formData.entries()].reduce((acc,[key,value])=> {
        acc[key] = value;
        return acc;
    },{})
    const isEmpty = Object.values(fields).some(x => x == '');
    if (isEmpty) {
        alert('All fields are required!!!');
        return;
    }
    await login(fields.email, fields.password);
    el.reset();
    ctx.updateNav();
    ctx.goTo('homePage');
}