import { register } from '../api/api.js';
import { html } from '../lib.js';

export function showRegisterPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    console.log('register page');    

    async function onSubmit(e) {
        e.preventDefault();
        console.log(e.target);

        const form = e.target;
        let formData = new FormData(form);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('confirm-pass').trim();

        if (email == "" || password == "") {
            return alert('All Fields are required!');
        }
        if (password != rePass) {
            return alert('Password don`t match!');
        }
        await register(email, password);
        ctx.page.redirect('/home');
        ctx.updateNavigation();
    }
    
}

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
<form id="register-form" action="" method="" @submit=${onSubmit}>
    <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>
`