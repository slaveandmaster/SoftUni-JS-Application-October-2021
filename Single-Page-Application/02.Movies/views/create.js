import { createNewMovie } from "../api/data.js";
const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate)
section.remove();

let ctx = null;
export async function showCreatePage(ctxTarget) {
 ctx = ctxTarget;
 ctx.showSection(section);
 
}

async function onCreate(e) {
    e.preventDefault();
    
    const formData = new FormData(form);

    let title = formData.get('title').trim();
    let description = formData.get('description').trim();
    let img = formData.get('imageUrl').trim();

    if (!title || !description || !img) {
        return alert(`All fields are required!!!`)
    }
    if (title.length < 6) {
        return alert('Title must be at least 6 characters')
    }
    if (description.length < 10) {
        return alert('Description must be at least 10 characters')
    }
    if (img.length < 5) {
        return alert('Image must be at least 5 characters')
    }

    createNewMovie({title, description, img});
    form.reset();
    ctx.goTo('home');
}