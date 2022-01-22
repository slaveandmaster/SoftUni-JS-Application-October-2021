import { getUserData } from '../api/helper.js';
import { getAll } from '../api/data.js';
import { html } from '../lib.js';

export async function showCatalogPage(ctx) {
    let userInfo = getUserData();
    let isLogged = false;
    if (userInfo !=null) {
        isLogged = true;
    }
    let albums = await getAll();
    update()
    function update() {
        ctx.render(catalogTemplate(albums,isLogged));    
    }
    //ctx.render(catalogTemplate(albums));
    console.log('catalog page');    
}

const catalogTemplate = (albums,isLogged) => html`
<section id="catalogPage">
<h1>All Albums</h1>
${albums.length == 0 ? html`
<!--No albums in catalog-->
<p>No Albums in Catalog!</p>
`:
html`
${albums.map(x => albumTemplate(x,isLogged)) }
`
}
</section>
`
let albumTemplate = (item,isLogged) => html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: ${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${buttonTemplate(item,isLogged)}
    </div>
</div>
`

const buttonTemplate = (album,isLogged) => {
    if (isLogged) {
        return html`
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>
        `
    }
    else {
        return null;
    }
}