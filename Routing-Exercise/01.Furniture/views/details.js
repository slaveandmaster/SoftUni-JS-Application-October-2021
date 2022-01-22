import { deleteItem, getById } from "../src/api/data.js";
import { getUserData } from "../src/api/helper.js";
import { html, until } from "../src/lib.js";

export function showDetail(ctx) {
  ctx.render(detailTemplate(loadItem(ctx.params.id, onDelete)));

  async function onDelete() {
      let confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
          await deleteItem(ctx.params.id);
          ctx.page.redirect('/');
      }
  }
}

const detailTemplate = (itemPromises) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
  ${until(itemPromises, html`<p>Loading....</p>`)}
  </div>
`;
const itemTemplate = (item,ownerId,onDelete) => html`
<div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="/${item.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                <div>
                ${ownerId ? html`
                <a href=/edit/${item._id} class="btn btn-info">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
                ` : null}
                </div>
            </div>
`;
async function loadItem(id,onDelete) {
  let result = await getById(id);
  let userData = getUserData();
  let ownerId = userData.id == result._ownerId;

  return itemTemplate(result, ownerId, onDelete)
}
