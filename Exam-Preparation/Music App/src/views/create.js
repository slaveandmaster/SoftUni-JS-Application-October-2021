import { createItem } from '../api/data.js';
import { html } from '../lib.js';

export function showCreatePage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        let formData = new FormData(form);

        let name = formData.get('name').trim();
        let imgUrl = formData.get('imgUrl').trim();
        let price = formData.get('price').trim();
        let releaseDate = formData.get('releaseDate').trim();
        let artist = formData.get('artist').trim();
        let genre = formData.get('genre').trim();
        let description = formData.get('description').trim();

       if (!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description) {
           return alert('All Fields are required!');
       }else {
           
           await createItem({name, imgUrl, price, releaseDate, artist, genre, description});
           form.reset();
           ctx.page.redirect('/catalog');
       }

    }
        
    
}

const createTemplate = (onSubmit) => html`
<section class="createPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Add Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" placeholder="Album name">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" placeholder="Price">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" placeholder="Description"></textarea>

                        <button class="add-album" type="submit">Add New Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`