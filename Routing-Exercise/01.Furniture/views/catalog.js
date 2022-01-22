import { getAll, getMainItems } from "../src/api/data.js";
import { getUserData } from "../src/api/helper.js";
import { html,until } from "../src/lib.js";

const catalogTemplate = (dataPromises, myPage) => html`
  <div class="row space-top">
    <div class="col-md-12">
      ${myPage
        ? html` <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>`
        : html` <h1>Welcome to Furniture System</h1> `}
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">
    ${until(dataPromises, html`<p>Loading....</p>`)}
  </div>
`;
const itemTemplate = (item) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${item.img}" />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href="/detail/${item._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;
export function showCatalog(ctx) {
  const myPage = ctx.pathname == "/my-furniture";
  ctx.render(catalogTemplate(loadData(myPage), myPage));
}

async function loadData(myPage) {
  let items = [];
  if (myPage) {
    let ownerId = getUserData().id;
    items = await getMainItems(ownerId);
  } else {
    items = await getAll();
  }

  return items.map(itemTemplate);
}
