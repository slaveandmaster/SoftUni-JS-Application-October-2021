import { getMainItems } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';

export async function showMyBooksPage(ctx) {
    let userInfo = getUserData().id;
    const books = await getMainItems(userInfo);

    ctx.render(bookTemplate(books));

    console.log('my book page');    
    
}

const bookTemplate = (books) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${books.length == 0 ? html`
            <!-- Display paragraph: If the user doesn't have his own books  -->
            <p class="no-books">No books in database!</p>
            
            ` : 
            html`
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
             ${books.map(itemTemplate)}   
            </ul>
            `
            }

        </section>
`

const itemTemplate = (item) => html`
        <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
        </li>
`