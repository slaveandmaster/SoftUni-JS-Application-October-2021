import { html } from '../lib.js';
import { login } from '../api/data.js';
import { notify } from './notify.js';

export function showLoginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
       
        if (!email || !password) {
            return notify('All fields are required!');
            
        }
        await login(email, password);
        form.reset();
        ctx.page.redirect('/catalog');
        ctx.updateNavigation();
        
    }
}

const loginTemplate = (onSubmit) => html`
<section id="login">
            <form id="login-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="#">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>

`