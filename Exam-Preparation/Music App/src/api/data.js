import * as api from '../api/api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/albums/',
    add: '/data/albums',
    editItem: '/data/albums/',
    delItem: '/data/albums/',
}

export function getAll() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
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
export async function searchAlbums(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}