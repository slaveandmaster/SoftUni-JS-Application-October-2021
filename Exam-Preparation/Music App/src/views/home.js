import { html } from '../lib.js';

export async function showHomePage(ctx) {
    ctx.render(homeTemplate());
    console.log('home page');    
    
}

const homeTemplate = (books) => html`
<section id="welcomePage">
            <div id="welcome-message">
                <h1>Welcome to</h1>
                <h1>My Music Application!</h1>
            </div>

            <div class="music-img">
                <img src="./images/musicIcons.webp">
            </div>
        </section>
`