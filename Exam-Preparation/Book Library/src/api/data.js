import * as api from '../api/api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

const endpoints = {
    all: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    myItem: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    add: '/data/books',
    editItem: '/data/books/',
    delItem: '/data/books/',
    getLikesUser: (bookId,userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    getBooksLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    like: '/data/likes/'
}

export function getAll() {
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

export async function getLikedById(bookId,userId) {
    return api.get(endpoints.getLikesUser(bookId,userId));
}
export async function getBooksLikes(bookId) {
    return api.get(endpoints.getBooksLikes(bookId));
}

export async function likeBooks(bookId) {
    return api.post(endpoints.like, { bookId });
}