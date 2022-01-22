import { deleteItem, getById } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';

export async function showDetailsPage(ctx) {
    let album = await getById(ctx.params.id);
    
    let userInfo = getUserData();
    let isOwner = userInfo && userInfo.id == album._ownerId;
    console.log(isOwner)
    ctx.render(detailTemplate(album,isOwner,onDelete));
       

    async function onDelete(e) {
        e.preventDefault();
        let confirmed = confirm('Are sure you want to delete thus album?');
        if (confirmed) {
            
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}

const detailTemplate = (album,isOwner,onDelete) => html`
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src="${album.imgUrl}">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: ${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>Description: ${album.description}</p>
        </div>

        <!-- Only for registered user and creator of the album-->
        ${buttonTemplate(album,isOwner,onDelete)}
    </div>
</div>
</section>
`
const buttonTemplate = (album,isOwner,onDelete) => {
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <a href="/edit/${album._id}" class="edit">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
        </div>
        `
    }
    else {
        return null;
    }
}