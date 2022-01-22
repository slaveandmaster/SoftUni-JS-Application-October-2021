import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllIdeas() {
  let ideas = await  api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
  return ideas;
}
export async function createIdea(data) {
   return api.post('/data/ideas', data);
    
}
export async function getIdeaById(id) {
    let idea = await api.get('/data/ideas/' + id);
    return idea;
}
export async function deleteById(id) {
    return  api.del('/data/ideas/' + id);
}