import { getUserData } from "../api/helper.js";
import { html } from "../lib.js";

export function showHomePage(ctx) {
  let userInfo = getUserData();
  if (userInfo) {
    ctx.page.reditect("/catalog");
  } else {
    ctx.render(homeTemplate());
    console.log("home page");
  }
}

const homeTemplate = () => html`
  <section id="welcome">
    <div id="welcome-container">
      <h1>Welcome To Meme Lounge</h1>
      <img src="/images/welcome-meme.jpg" alt="meme" />
      <h2>Login to see our memes right away!</h2>
      <div id="button-div">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button">Register</a>
      </div>
    </div>
  </section>
`;
