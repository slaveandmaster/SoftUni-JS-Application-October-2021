import { render, page} from './lib.js';
import { clearUserData, getUserData } from './api/helper.js';
import { logout } from '../src/api/data.js';
import { showLoginPage } from './views/login.js';
import { showCatalogPage } from './views/catalog.js';
import { showHomePage } from './views/home.js';
import { showRegisterPage } from './views/register.js';
import { showDetailsPage } from './views/details.js';
import { showCreatePage } from './views/create.js';
import { showProfilePage } from './views/userProfile.js';
import { showEditPage } from './views/edit.js';

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);
page(decorateContext);
page('/', showHomePage);
page('/catalog', showCatalogPage);
page('/login', showLoginPage);
page('/register', showRegisterPage);
page('/details/:id', showDetailsPage);
page('/create', showCreatePage);
page('/profile', showProfilePage);
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
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.profile > span').textContent = `Welcome, ${userInfo.email}`;

    }
    else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';

    }
}