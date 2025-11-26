# OMDB Movie Explorer

A full-stack web application for searching and exploring movies using the OMDB (Open Movie Database) API.

## Project Structure

```
omdb-movie-explorer/
├── backend/          # Node.js REST API service
├── frontend/         # React UI Layer
└── README.md         # Project documentation
```

## Backend

The backend is a Node.js Express server that provides REST API endpoints for movie search and details.

### Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your OMDB API key:
   ```
   OMDB_API_KEY=your_api_key_here
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:5000`

## Frontend

The frontend is a React application that provides a user interface for searching and viewing movies.

### Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The app will run on `http://localhost:3000`

## Features

- Search movies by title
- View movie details including plot, cast, ratings, and more
- In-memory caching for improved performance
- Responsive UI with React components

## API Endpoints

- `GET /api/movies/search?q=<query>` - Search for movies
- `GET /api/movies/:id` - Get movie details by ID

## Tech Stack

### Backend
- Node.js
- Express.js
- Axios (for HTTP requests)

### Frontend
- React
- React Router
- Fetch API

## License

MIT
