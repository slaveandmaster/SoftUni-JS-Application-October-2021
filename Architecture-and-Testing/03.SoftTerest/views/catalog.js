import { getAllIdeas } from "../src/data.js";
const section = document.getElementById('dashboard-holder');
section.remove();
section.addEventListener('click', onDetails);
let ctx = null;

export async function showCatalogPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
    let data = await getAllIdeas();
    let fragment = document.createDocumentFragment();
    if (data) {
        [...data].forEach((x) => fragment.appendChild(createCard(x)));
        
    }
    else {
        let noData = document.createElement('h1');
        noData.innerHTML =`No ideas yet! Be the first one :)`;
        fragment.appendChild(noData);
    }
    section.replaceChildren(fragment);
}

function createCard(card) {
    const element = document.createElement('div');
    element.classList.add('card','overflow-hidden','current-card','details');
    element.style = 'width: 20rem; height: 18rem;'
    element.innerHTML = `
    <div class="card-body">
    <p class="card-text">${card.title}</p>
</div>
<img class="card-image" src="${card.img}" alt="Card image cap">
<a class="btn" data-id="${card._id}" href="">Details</a>
    `
    
    return element;
}

function onDetails(e){
    if (e.target.tagName == 'A') {
        e.preventDefault();
        const id = e.target.dataset.id;
        ctx.goTo('detailPage',id);
        
    }
}
/*
  <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">Dinner Recipe</p>
            </div>
            <img class="card-image" src="./images/dinner.jpg" alt="Card image cap">
            <a class="btn" href="">Details</a>
        </div>
*/