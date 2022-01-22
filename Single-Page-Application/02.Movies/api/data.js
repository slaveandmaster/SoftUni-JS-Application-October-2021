import * as api from './api.js';
export const login = api.login;
export const logout = api.logout;
export const register = api.register;
//get all movies
async function getAllMovies(){
    return await api.get('/data/movies');
    
}

async function getMovieById(id) {
    return await api.get('/data/movies/' + id);
}

async function createNewMovie(movie) {
    return await api.post('/data/movies', movie);
}
async function updateMovie(id,movie) {
    return await api.put('/data/movies/' + id, movie);
}
async function deleteById(id) {
    return await api.del('/data/movies/' + id);
}
export {
    getAllMovies,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteById
}