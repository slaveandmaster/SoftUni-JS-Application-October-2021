import { deleteById, getIdeaById } from "../src/data.js";
import { e } from '../src/dom.js';

const section = document.getElementById('detailPage');
section.remove();
let ctx = null;

export async function showDetailPage(ctxTarget,id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    let card = await getIdeaById(id);
    section.replaceChildren(createCardDescription(card));

}

function createCardDescription(card) {
    
    let fragment = document.createDocumentFragment();
    let img = e('img', { src: `${card.img}`, className:'det-img' });
    let divDesc = e('div', {className: 'desc'},
        e('h2', {className:'display-5'}, `${card.title}`),
        e('p' ,{className: 'infoType'}, 'Description:'),
        e('p' ,{className: 'idea-description'}, `${card.description}`),
    );
    fragment.appendChild(img);
    fragment.appendChild(divDesc);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.id == card._ownerId) {
        let btn = e('div', {className: 'text-center'},
            e('a', {className: 'btn detb', href: '', onClick: onDelete }, 'Delete')
            );
            fragment.appendChild(btn);
        
    }
    
    async function onDelete(e){
        e.preventDefault();
        await deleteById(card._id);
        ctx.goTo('dashboard-holder');
    }
    return fragment;
}
