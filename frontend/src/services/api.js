import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const searchMovies = (query) => {
  return axios.get(`${API_BASE_URL}/movies/search?query=${query}`);
};

export const getMovieDetails = (id) => {
  return axios.get(`${API_BASE_URL}/movies/${id}`);
};