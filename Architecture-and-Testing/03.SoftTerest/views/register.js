import { register } from "../src/data.js";

const section = document.getElementById('registerPage');
const form = section.querySelector('.row-form.d-md-flex.flex-mb-equal')
form.addEventListener('submit', onRegister);
section.remove();
let ctx = null;

export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}


async function onRegister(e) {
    e.preventDefault();
    
    const el = e.target;
    let formData = new FormData(el);
    let fields = [...formData.entries()].reduce((acc,[key,value]) => {
        acc[key] = value.trim();
        return acc;
    },{})
    if(fields.email.length < 0) {
         return alert('Email must be at least 3 characters,must have digit and special characters');
    }
    if (fields.password.length < 3) {
        return alert('Password must be at least 3 characters long');
    }
    if (fields.repeatPassword != fields.password) {
         return alert('Passwords shoud be equal');
    }
    console.log(fields.email,fields.password);
    await register(fields.email, fields.password);
    console.log('after');
    el.reset();
 
    ctx.goTo('homePage');   
    ctx.updateNav()
}