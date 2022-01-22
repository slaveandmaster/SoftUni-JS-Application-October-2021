import { createIdea } from "../src/data.js";

const section = document.getElementById('createPage');
const form = section.querySelector('form');
form.addEventListener('submit',onCreate);
section.remove();
let ctx = null;

export async function showCreatePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onCreate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('title').trim();
    let description = formData.get('description').trim();
    let img = formData.get('imageURL').trim()
    // let fields = [...formData.entries()].reduce((acc,[key, value])=> {
    //     acc[key] = value.trim();
    //     return acc;
    // },{})
    
    if (title.length < 6) {
        return alert('The title should be at least 6 characters long');
    }
    if (description.length < 10) {
        return alert('The description should be at least 10 characters long');

    }
    if (img.length < 5) {
        return alert('The image should be at least 5 characters long');

    }
    
    createIdea({title, description, img});
    form.reset();
    ctx.goTo('dashboard-holder');

}