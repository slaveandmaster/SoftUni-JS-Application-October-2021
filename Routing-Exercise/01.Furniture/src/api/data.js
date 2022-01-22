import * as api from '../api/api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

const endpoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myItem: (ownerId) => `/data/catalog?where=_ownerId%3D%22${ownerId}%22`,
    add: '/data/catalog',
    editItem: '/data/catalog/',
    delItem: '/data/catalog/'
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}
export async function getMainItems(owner) {
    return api.get(endpoints.myItem(owner));
}

export async function createItem(data) {
    return api.post(endpoints.add, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.editItem + id, data)
}

export async function deleteItem(id) {
    return api.del(endpoints.delItem + id);
}