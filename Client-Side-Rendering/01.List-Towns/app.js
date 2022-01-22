import { html, render } from './node_modules/lit-html/lit-html.js';

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let towns = document.getElementById('towns').value.split(',').map(t => t.trim());
    
    let root = document.getElementById('root');
    let res = townTemplate(towns);
    render(res , root);

})

const townTemplate = (towns) => html`
    <ul>
        ${towns.map(t => html`<li>${t}</li>`)}
    </ul>
    `

