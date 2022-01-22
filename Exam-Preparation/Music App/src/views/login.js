import { login } from '../api/api.js';
import { html } from '../lib.js';

export function showLoginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));
    console.log('login page');    
    async function onSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        let formData = new FormData(form);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        if (email == "" || password == "") {
            return alert('All Fields are required!');
        }
        await login(email,password);
        form.reset();
        ctx.page.redirect('/');
        ctx.updateNavigation();
    }
}


const loginTemplate = (onSubmit) => html`
<section id="loginPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`