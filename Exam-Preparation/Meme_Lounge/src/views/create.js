import { createItem } from '../api/data.js';
import { html } from '../lib.js';
import { notify } from './notify.js';

export function showCreatePage(ctx) {
    ctx.render(createTemplate(onSubmit));

   async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);

        let title = formData.get('title').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();

        if (!title || !description || !imageUrl) {
            return notify('Alert All Fields are required!');
            
        }
        await createItem({title, description, imageUrl});
        form.reset();
        ctx.page.redirect('/catalog');
    }
}

const createTemplate = (onSubmit) => html`
<section id="create-meme">
<form id="create-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>
`