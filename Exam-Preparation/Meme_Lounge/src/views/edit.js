import { editItem, getById } from '../api/data.js';
import { html } from '../lib.js';
import { notify } from './notify.js';

export async function showEditPage(ctx) {
    let item = await getById(ctx.params.id);
    ctx.render(editTemplate(item,onSubmit));
    
    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);
        
        let title = formData.get('title').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();

        if (!title || !description || !imageUrl) {
            return notify('All Fields Are required!');
        }

        await editItem(ctx.params.id,{
            title,
            description,
            imageUrl
        })
        ctx.page.redirect('/details/'+ ctx.params.id);

    }
}

const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value="${meme.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" >
                    ${meme.description}
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${meme.imageUrl}" >
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`