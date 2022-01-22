import {html, render} from './node_modules/lit-html/lit-html.js';

document.querySelector('button').addEventListener('click', onSearch);
let table = document.querySelector('tbody');
let tableRows;
const tableTemplate = (data) => html`
 ${data.map(r => html`<tr class=${r.match ? 'select' : ''}><td>${r.item.firstName} ${r.item.lastName}</td>
 <td>${r.item.email}</td>
 <td>${r.item.course}</td>
 </tr>` )}
 
 
`
loadData();

function onSearch() {
   console.log(Object.values(tableRows))
   let text = document.getElementById('searchField').value.trim().toLocaleLowerCase();
   tableRows.forEach(r => {
      let row = Object.values(r.item);
      r.match = row.some((s) => text && s.toLocaleLowerCase().includes(text))
   })
   updateTable(tableRows);
    


}

function updateTable(items) {
   render(tableTemplate(items), table);
}
async function loadData() {
   let res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data = await res.json();
   tableRows = Object.values(data).map((x) => ({ item: x , match:false}));  
   updateTable(tableRows);
}