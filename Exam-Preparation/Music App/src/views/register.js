import { register } from '../api/api.js';
import { html } from '../lib.js';

export function showRegisterPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
     

    async function onSubmit(e) {
        e.preventDefault();
        

        const form = e.target;
        let formData = new FormData(form);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('conf-pass').trim();

        if (email == "" || password == "") {
            return alert('All Fields are required!');
        }
        if (password != rePass) {
            return alert('Password don`t match!');
        }
        await register(email, password);
        ctx.page.redirect('/');
        ctx.updateNavigation();
    }
    
}

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`