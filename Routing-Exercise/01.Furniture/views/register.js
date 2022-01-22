import { register } from "../src/api/api.js";
import { html } from "../src/lib.js";

export function showRegister(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
      e.preventDefault();

      let formData = new FormData(e.target);

      let email = formData.get("email").trim();
      let password = formData.get("password").trim();
      let rePass = formData.get("rePass").trim();

      if (password != rePass) {
        throw new Error("Password don`t match!");
      }
      if (password == "" || email == "") {
        throw new Error("All fileds are required!");
      }
      await register(email, password);
      
      e.target.reset();
      ctx.page.redirect("/");
    }
}

const registerTemplate = (onSubmit) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input
            class="form-control"
            id="rePass"
            type="password"
            name="rePass"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>
`;

