import { deleteItem, getBooksLikes, getById, getLikedById, likeBooks } from '../api/data.js';
import { getUserData } from '../api/helper.js';
import { html } from '../lib.js';

export async function showDetailsPage(ctx) {
    //let book = await getById(ctx.params.id);
    let userInfo = getUserData();
    let [ book, booksLikes, userLikes ] = await Promise.all([
        getById(ctx.params.id),
        getBooksLikes(ctx.params.id),
        userInfo ? getLikedById(ctx.params.id,userInfo.id) : 0
    ])
    
    console.log(userLikes);
    let isOwner = userInfo && userInfo.id == book._ownerId;
    let isShowBtnLike = userInfo != null && isOwner == false && userLikes == false;
    console.log(isShowBtnLike);
    
    ctx.render(detailTemplate(book,isOwner,onDelete,booksLikes,isShowBtnLike,onLike));
    console.log('detail page');    

    async function onDelete(e) {
        e.preventDefault();
        
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/');
    }
    async function onLike() {
        await likeBooks(ctx.params.id);
        console.log('liked!');
        ctx.page.redirect('/details/'+ ctx.params.id)
    }
    
}

const detailTemplate = (book,isOwner,onDelete,booksLikes,isShowBtnLike,onLike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
               
                <div class="actions">
                 ${booksControls(book,isOwner,onDelete)}                 
                <!-- Bonus -->
                ${buttonsTemplate(isShowBtnLike,onLike)}
            
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${booksLikes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
                
            


            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`
const booksControls = (book,isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a class="button" @click=${onDelete} href="/delete/${book._id}">Delete</a>  `
    }
    else {
        return null;
    }
}
const buttonsTemplate = (isShowBtnLike, onLike) => {
    if (isShowBtnLike) {
        return html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>`
    }
    else {
        return null;
    }
}