const express = require('express');
const cors = require('cors');
const movieController = require('./controllers/movieController');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON requests

// RESTful API Routes
app.get('/api/movies/search', movieController.search);
app.get('/api/movies/:id', movieController.getById);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;