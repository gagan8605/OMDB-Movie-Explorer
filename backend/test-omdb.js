const omdb = require('./src/services/omdbService');

(async () => {
  try {
    const res = await omdb.searchMovies('Sholay');
    console.log('Result length:', Array.isArray(res) ? res.length : 'not array');
    console.dir(res, { depth: 1 });
  } catch (err) {
    console.error('omdb test error:', err.message);
  }
})();
