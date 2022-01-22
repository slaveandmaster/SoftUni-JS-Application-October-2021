import { editItem, getById } from "../src/api/data.js";
import { html,until } from "../src/lib.js";

export function showEdit(ctx) {
  let itemPromises = getById(ctx.params.id);
  update(null, {});

  function update(errorMsg, errors) {
    ctx.render(editTemplate(loadItem(itemPromises)));
  }
  async function loadItem(itemPromises) {
    let result = await itemPromises;

    return formTemplate(result, onSubmit);
  }
  async function onSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let fields = [...formData.entries()].reduce(
      (acc, [k, v]) => Object.assign(acc, { [k]: v.trim() }),
      {}
    );
    let isEmpty = Object.values(fields).some((s) => s == "");
    if (isEmpty) {
      throw new Error("All fields are required!");
    }

    let result = await editItem(ctx.params.id, fields);
    e.target.reset();
    ctx.page.redirect("/detail/" + result._id);
  }
}

const editTemplate = (itemPromises) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
    ${until(itemPromises, html`<p>Loading...</p>`)}
  </div>
`;
const formTemplate = (item, onSubmit) => 
  html`
    <form @submit=${onSubmit}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input
              class="form-control"
              id="new-make"
              type="text"
              name="make"
              .value=${item.make}
            />
          </div>
          <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input
              class="form-control is-valid"
              id="new-model"
              type="text"
              name="model"
              .value=${item.model}
            />
          </div>
          <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input
              class="form-control is-invalid"
              id="new-year"
              type="number"
              name="year"
              .value=${item.year}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-description"
              >Description</label
            >
            <input
              class="form-control"
              id="new-description"
              type="text"
              name="description"
              .value=${item.description}
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input
              class="form-control"
              id="new-price"
              type="number"
              name="price"
              .value=${item.price}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input
              class="form-control"
              id="new-image"
              type="text"
              name="img"
              .value=${item.img}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-material"
              >Material (optional)</label
            >
            <input
              class="form-control"
              id="new-material"
              type="text"
              name="material"
              .value=${item.material}
            />
          </div>
          <input type="submit" class="btn btn-info" value="Edit" />
        </div>
      </div>
    </form>
  `;

