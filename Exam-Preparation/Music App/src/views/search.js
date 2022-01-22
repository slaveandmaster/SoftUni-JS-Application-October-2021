import { searchAlbums } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';
let userInfo = getUserData();
export async function showSearchPage(ctx) {
 
    const params = ctx.querystring.split('=')[1];
    let albums = [];
    if (params) {
        albums = await searchAlbums(decodeURIComponent(params))        
    }
    update()

    function update() {
        ctx.render(searchTemplate(albums,onSearch, params));
        
    }

   //document.querySelector('.button-list').addEventListener('click', onSearch)
    function onSearch(e) {
        e.preventDefault();
        let searchTerm = document.getElementById('search-input').value;
        
        if (searchTerm) {
            ctx.page.redirect('/search?query?='+ encodeURIComponent(searchTerm))
        }
    }
    
}

const searchTemplate = (albums,onSearch) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
            ${albums.length > 0 ? html`
             <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
             ${albums.map(x =>albumPreview(x))}  
                </div>
            ` :
            html`
            <!--If there are no matches-->
            <p class="no-result">No result.</p>
            `
        }
           

            </div>
        </section>
`

const albumPreview = (item) => html`
<!--If have matches-->
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
        ${buttonTemplate(item)}
        
    
    </div>
`

const buttonTemplate = (album) => {
    if (userInfo != null) {
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