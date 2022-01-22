import { getMainItems } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';

export async function showProfilePage(ctx) {
    const userId = getUserData().id;
    let userInfo = getUserData();
    let memes = await getMainItems(userId);
    ctx.render(profileTemplate(userInfo,memes));
}

const profileTemplate = (userInfo,memes) => html`
    <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${userInfo.gender}.png">
                <div class="user-content">
                    <p>Username: ${userInfo.username}</p>
                    <p>Email: ${userInfo.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${memes.length != 0 ? memes.map(memeBox) :
                    html`<p class="no-memes">No memes in database.</p>`
                
            } 
                
            </div>
        </section>
`

const memeBox = (meme) => html`
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>`