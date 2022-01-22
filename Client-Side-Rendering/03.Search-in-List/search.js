import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let content = document.getElementById('towns');
document.querySelector('button').addEventListener('click', onSearch);


let townsInfo = towns.map((t) => ({ town: t, match: false}));


const townsTemplate = (towns) => 
html`

<ul>
${ towns.map((t) => html`<li class="${t.match ? 'active': ''}">${t.town}</li>`)}
</ul>
` 
update();
function update() {

   render(townsTemplate(townsInfo), content);
}
function onSearch() {
   const result = document.getElementById('result');
   const input = document.getElementById('searchText').value.trim().toLocaleLowerCase();
   let counter = 0;
   townsInfo.forEach(t => {
      if (input && t.town.toLocaleLowerCase().includes(input)) {
         t.match = true;
         counter++;
      }
      else {
         t.match = false;
      }
   })
   result.textContent = `${counter} matches found`;
   update();   
}
