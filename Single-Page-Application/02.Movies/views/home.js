import { getAllMovies } from "../api/data.js";
import { e } from "../api/dom.js";
const section = document.getElementById("home-page");
let ctx = null;
let movieCatalog = section.querySelector(
  ".card-deck.d-flex.justify-content-center"
);

//event listener for details
movieCatalog.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.tagName == "BUTTON") {
    target = target.parentElement;
  }
  if (target.tagName == "A") {
    let id = target.dataset.id;
    ctx.goTo("detail", id);
  }
});
//add event listener for add movie

section.querySelector('#createMovie').addEventListener('click', (e) =>{
    e.preventDefault();
    ctx.goTo('create');
})


section.remove();

export function showHomePage(ctxTarget) {
  ctx = ctxTarget;
  //render movie card and then use showSection
  ctx.showSection(section);
  loadMovies();
}
async function loadMovies() {
  let movies = await getAllMovies();
  let fragment = document.createDocumentFragment();
  movies.map(createMovieCard).forEach((x) => fragment.appendChild(x));
  movieCatalog.replaceChildren(fragment);
}

function createMovieCard(movie) {
  let movieCard = document.createElement("div");
  movieCard.classList.add("card", "mb-4");
  movieCard.innerHTML = `
  <img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="#" data-id=${movie._id}>
        <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;
  return movieCard;
}
