function createTemplate({ _id, title }) {
  let divAccordion = createTag("div", { className: "accordion" });
  let divHead = createTag("div", { className: "head" });
  let spanTitle = createTag("span", {}, `${title}`);
  let btnMore = createTag(
    "button",
    { className: "button", id: `${_id}` },
    "More"
  );
  divHead.appendChild(spanTitle);
  divHead.appendChild(btnMore);
  let divExtra = createTag("div", { className: "extra" });
  let pExtra = createTag("p", {}, "Scalable Vector Graphics .....");
  divExtra.appendChild(pExtra);
  divAccordion.appendChild(divHead);
  divAccordion.appendChild(divExtra);

  btnMore.addEventListener("click", async (e) => {
    if (btnMore.textContent == "More") {
      const urlContent = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`;
      const dataInfo = await fetch(urlContent);
      const dataContent = await dataInfo.json();
      e.target.textContent = "Less";
      divExtra.style.display = "block";
      pExtra.textContent = dataContent.content;
    } else {
      e.target.textContent = "More";
      divExtra.style.display = "none";
    }
  });

  return divAccordion;
}
function createTag(tag, obj, content) {
  let element = document.createElement(tag);
  for (const [key, value] of Object.entries(obj)) {
    element[key] = value;
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}

async function solution() {
  const main = document.getElementById("main");
  const url = "http://localhost:3030/jsonstore/advanced/articles/list";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((a) => {
    main.appendChild(createTemplate(a));
  });
}

window.onload = solution;
