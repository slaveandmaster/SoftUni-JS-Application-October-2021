import { getMovieById, updateMovie } from "../api/data.js";
import { e } from "../api/dom.js";
const section = document.getElementById('edit-movie');
const form = section.querySelector('form'); 
form.addEventListener('submit', onEdit);
//section.remove();
let ctx = null;

export async function showEditPage(ctxTarget,id){
    ctx = ctxTarget;
    ctx.showSection(section);
    console.log('edit page', id);
    editPage(id);

}

async function editPage(id) {
    let movie = await getMovieById(id);
    form.dataset.id = movie._id;
    form.querySelector('[name="title"]').value = movie.title;
    form.querySelector('[name="description"]').value = movie.description;
    form.querySelector('[name="imageUrl"]').value = movie.img;

}
function onEdit(e) {
    e.preventDefault();
    console.log(e.target.id);

    let formData = new FormData(form);
    let id = form.dataset.id;
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
    updateMovie(id, {title,description,img});
    form.reset();
    ctx.goTo('home');

}

function createEditForm(movie){
    let element = document.createElement('form');
    element.classList.add('text-center', 'border', 'border-light', 'p-5');
    element.setAttribute('method','""');
    element.setAttribute('action', '#');
    element.dataset.id = movie._id; 
    element.innerHTML = `
    <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input id="title" type="text" class="form-control" placeholder="Movie Title" value="${movie.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description">${movie.description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value="${movie.img}" name="imageUrl">
        </div>
        <button type="submit"  class="btn btn-primary">Submit</button>
    `
    return element;
}




