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
<section id="login-page" class="login">
            <form id="login-form" action="" method="" @submit=${onSubmit}>
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>
`