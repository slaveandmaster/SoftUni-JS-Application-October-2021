import { getAll } from '../api/data.js';
import { html } from '../lib.js';

export async function showHomePage(ctx) {
    let books = await getAll();
    ctx.render(homeTemplate(books));
    console.log('home page');    
    
}

const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
${books.length > 0 ? html`
            <ul class="other-books-list">
                
            ${books.map(listTemplate)}
               
            </ul>
            ` : html`
            <!-- Display paragraph: If there are no books in the database -->
            <p class="no-books">No books in database!</p>
            `}
            
        </section>
`

const listTemplate = (item) => html`
        <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
        </li>
`