import { render, page} from './lib.js';
import { getUserData } from './api/helper.js';
import { logout } from '../src/api/data.js';
import { showLoginPage } from './views/login.js';
import { showHomePage } from './views/home.js';
import { showRegisterPage } from './views/register.js';
import { showCatalogPage } from './views/catalog.js';
import { showCreatePage } from './views/create.js';
import { showEditPage } from './views/edit.js';
import { showDetailsPage } from './views/details.js';
import { showSearchPage } from './views/search.js';

const root = document.querySelector('main');//"site-content"
document.getElementById('logoutBtn').addEventListener('click', onLogout);
page(decorateContext);
page('/', showHomePage);
page('/login', showLoginPage);
page('/register', showRegisterPage);
page('/catalog', showCatalogPage);
page('/details/:id', showDetailsPage);
page('/create', showCreatePage);
page('/edit/:id', showEditPage);
page('/search', showSearchPage);


updateNavigation();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNavigation = updateNavigation
    next();
}

function onLogout() {
    logout();
    updateNavigation();
    page.redirect('/');
}

function updateNavigation( ) {
    let userInfo = getUserData();
    if (userInfo) {
        [...document.querySelectorAll('.user')].forEach(x => x.style.display = 'inline-block');
        [...document.querySelectorAll('.guest')].forEach(x => x.style.display = 'none');
       

    }
    else {
        [...document.querySelectorAll('.user')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(x => x.style.display = 'inline-block');

    }
}