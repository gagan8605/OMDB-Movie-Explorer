const axios = require('axios');
const cache = require('../utils/cache');

const API_KEY = process.env.OMDB_API_KEY;
if (!API_KEY) {
  // Fail fast with a clear message so caller gets a helpful error.
  throw new Error('OMDB_API_KEY environment variable is not set. Please add it to your .env file.');
}
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const searchMovies = async (query) => {
  const cacheKey = `search:${query.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    console.log(`Fetching search results for '${query}' from cache.`);
    return cache.get(cacheKey);
  }

  const response = await axios.get(`${BASE_URL}&s=${query}`);
  if (response.data.Response === 'True') {
    console.log(`Fetching search results for '${query}' from API and caching.`);
    cache.set(cacheKey, response.data.Search);
    return response.data.Search;
  }
  return [];
};

const getMovieDetails = async (id) => {
  const cacheKey = `movie:${id}`;
  if (cache.has(cacheKey)) {
    console.log(`Fetching details for movie ID '${id}' from cache.`);
    return cache.get(cacheKey);
  }

  // Use plot=full to get the complete plot summary.
  const response = await axios.get(`${BASE_URL}&i=${id}&plot=full`);
  if (response.data.Response === 'True') {
    console.log(`Fetching details for movie ID '${id}' from API and caching.`);
    cache.set(cacheKey, response.data);
    return response.data;
  }
  return null;
};

module.exports = {
  searchMovies,
  getMovieDetails,
};