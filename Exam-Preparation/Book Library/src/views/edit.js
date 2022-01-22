import { html } from '../lib.js';
import { editItem, getById } from '../api/data.js';

export async function showEditPage(ctx) {

    let book = await getById(ctx.params.id);
    console.log(book);
    
    ctx.render(editTemplate(book,onSubmit));
    console.log('edit page');    
    
    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);

        let title = formData.get('title').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let type = formData.get('type').trim();

       if (!title || !description || !imageUrl || !type) {
           return alert('All Fields are required!');
       }
       await editItem(ctx.params.id, {title, description, imageUrl, type})
       form.reset();
       ctx.page.redirect('/details/'+ ctx.params.id); 
    }
}

const editTemplate = (book,onSubmit) => html`
<section id="edit-page" class="edit">
            <form id="edit-form" action="#" method="" @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" .value="${book.title}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${book.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" .value="${book.imageUrl}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" .value="${book.type}">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`