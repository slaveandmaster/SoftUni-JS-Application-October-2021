import {html, render} from './node_modules/lit-html/lit-html.js';

let host = 'http://localhost:3030/jsonstore/advanced/dropdown';
const select = document.getElementById('menu');

const dropTemplate = (data) => html`
${data.map(d => html`<option value=${d._id}>${d.text}</option>`)}
`
loadData()
function update(items) {
    render(dropTemplate(items),select);
}


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = document.getElementById('itemText').value.trim();
    addItem({text: item});
    e.target.reset();
})

async function addItem(item) {
    let res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(item)
        
    })
    if (res.ok) {
        loadData();
    }
}

async function loadData() {
    let res = await fetch(host);
    if (res.ok !=true) {
        const error = await res.json();
        throw new Error('Something wrong!');
    }
    let data = await res.json();
    update(Object.values(data));
    
}