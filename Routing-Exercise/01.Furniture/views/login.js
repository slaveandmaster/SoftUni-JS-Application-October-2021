import { login } from '../src/api/data.js';
import { html } from '../src/lib.js';

export function showLogin(ctx) {
    ctx.render(loginTemplate(onSubmit));
    
    async function onSubmit(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
    
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}

const loginTemplate = (onSubmit) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`

    