import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";
console.log(cats);
const catsTemplate = (cats) => html`
  <ul>
    ${cats.map(
      (c) => html` <li>
        <img
          src="./images/${c.imageLocation}.jpg"
          width="250"
          height="250"
          alt="Card image cap"
        />
        <div class="info">
          <button class="showBtn" @click=${() => onClick(c)}>
           ${c.detail ? 'Hide' : 'Show'} status code
          </button>
          ${c.detail
            ? html`<div class="status" id="${c.id}">
                <h4>Status Code: ${c.statusCode}</h4>
                <p>${c.statusMessage}</p>
              </div>`
            : null}
        </div>
      </li>`
    )};
  </ul>
`;
const section = document.getElementById("allCats");
cats.forEach((c) => (c.detail = false));
updateCats();
function updateCats() {
  render(catsTemplate(cats), section);
}

function onClick(cat) {
  cat.detail = !cat.detail;
  updateCats();
}
