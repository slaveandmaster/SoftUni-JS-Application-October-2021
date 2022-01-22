import { deleteItem, getById } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';

export async function showDetailsPage(ctx) {
    let userInfo = getUserData();
    let meme = await getById(ctx.params.id);
    let isOwner = userInfo && userInfo.id == meme._ownerId;

    ctx.render(detailTemplate(meme,isOwner,onDelete));

    async function onDelete() {
        let choice = confirm('Are you sure you want to delete this memo?');
        if (choice) {
            
            await deleteItem(meme._id);
            ctx.page.redirect('/catalog');
        }
    }
}

const detailTemplate = (meme, isOwner,onDelete) => html`
<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src="${meme.imageUrl}">
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>
        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>` : null}
        
        
    </div>
</div>
</section>
`