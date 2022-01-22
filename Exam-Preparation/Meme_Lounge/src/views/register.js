import { register } from '../api/data.js';
import { html } from '../lib.js';
import { notify } from './notify.js';

export function showRegisterPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);

        let username = formData.get('username').trim();
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPass').trim();
        let gender = formData.get('gender');
        if (!username || !email || !password) {
            return notify('All fields are required');
            
        }
        if (password != rePass) {
            return notify('Password don`t match!');
        }
        await register(username,email,password,gender);
        form.reset();
        ctx.page.redirect('/catalog');
        ctx.updateNavigation();
    }

}

const registerTemplate = (onSubmit) => html`
<section id="register">
<form id="register-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="#">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>
`