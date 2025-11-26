const omdbService = require('../services/omdbService');

const search = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('search endpoint called with query:', query);
    if (!query) {
      return res.status(400).json({ message: 'The "query" parameter is required.' });
    }
    const movies = await omdbService.searchMovies(query);
    res.status(200).json(movies);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await omdbService.getMovieDetails(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found.' });
    }
  } catch (error) {
    console.error('Get by ID error:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

module.exports = {
  search,
  getById,
};