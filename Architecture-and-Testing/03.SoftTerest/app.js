import { showSection } from './src/dom.js';
import { showHomePage } from './views/home.js';
import { showCatalogPage } from './views/catalog.js';
import { showRegisterPage } from './views/register.js';
import { showDetailPage } from './views/detail.js';
import { showLoginPage } from './views/login.js';
import { showCreatePage } from './views/create.js'
import { logout } from './src/api.js';
const nav = document.querySelector('.navbar-nav.ml-auto');
const navLogout = document.getElementById('logout');
navLogout.addEventListener('click', onLogout);
nav.addEventListener('click', onNavigate);


function onNavigate(e) {
    
    console.log(e.target.id);
    if (e.target.tagName == 'A') {
        let link = links[e.target.id];
        if (link) {
            e.preventDefault();
            goTo(link);
        }
    }
}
//link get all links id as property and assign view as value
let links = {
    'catalog' : 'dashboard-holder',
    'login' : 'loginPage',
    //'logout' : 'logoutPage',
    'register' : 'registerPage',
    'create': 'createPage',
    'home': 'homePage',
    'homeLink' : 'homePage'

}
//set view as property and assaign function for controller

let views = {
    'dashboard-holder': showCatalogPage ,
    'loginPage': showLoginPage,
    'registerPage': showRegisterPage,
    'createPage': showCreatePage,
    'detailPage': showDetailPage,
    'homePage' : showHomePage
}
//context methods as showSection,goTo or update Navigation
// ctx contain method which you can use to transport showSection
//goTo and other methods

let ctx = {
    goTo,
    showSection,
    updateNav
} 
function goTo(name, ...params) {
    let view = views[name];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}
function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData !=null) {
        
        [...document.querySelectorAll('.nav-link.users')].forEach(x => x.style.display = 'block');
        [...document.querySelectorAll('.nav-link.guests')].forEach(x => x.style.display = 'none');
    }
    else {
        [...document.querySelectorAll('.nav-link.users')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('.nav-link.guests')].forEach(x => x.style.display = 'block');
    }
}

async function onLogout(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    await logout();
    updateNav();
    goTo('homePage');
}
updateNav();
goTo('homePage');