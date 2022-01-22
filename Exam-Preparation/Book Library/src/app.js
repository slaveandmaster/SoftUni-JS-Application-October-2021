import { render, page} from './lib.js';
import { getUserData } from './api/helper.js';
import { logout } from '../src/api/data.js';
import { showLoginPage } from './views/login.js';
import { showHomePage } from './views/home.js';
import { showRegisterPage } from './views/register.js';
import { showDetailsPage } from './views/details.js';
import { showCreatePage } from './views/create.js';
import { showEditPage } from './views/edit.js';
import { showMyBooksPage } from './views/mybooks.js';

const root = document.querySelector('main');//"site-content"
document.getElementById('logoutBtn').addEventListener('click', onLogout);
page(decorateContext);
page('/', showHomePage);
page('/login', showLoginPage);
page('/register', showRegisterPage);
page('/details/:id', showDetailsPage);
page('/create', showCreatePage);
page('/mybooks', showMyBooksPage);
page('/edit/:id', showEditPage);


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
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user > span').textContent = `Welcome, ${userInfo.email}`;

    }
    else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';

    }
}