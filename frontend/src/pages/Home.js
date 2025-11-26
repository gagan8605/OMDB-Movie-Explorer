import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: var(--accent-color);
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const MovieCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: var(--font-color);
`;

const MovieYear = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: #aaa;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearched(true);
    setError('');
    try {
      const response = await searchMovies(query);
      setMovies(response.data || []);
      if (response.data.length === 0) {
        setError('No movies found for your search.');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>OMDB Movie Explorer</Title>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <Message>Loading...</Message>}
      {error && <Message>{error}</Message>}

      {!loading && !error && movies.length > 0 && (
        <ResultsGrid>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} style={{ textDecoration: 'none' }}>
              <MovieCard>
                <Poster src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} alt={movie.Title} />
                <MovieInfo>
                  <MovieTitle>{movie.Title}</MovieTitle>
                  <MovieYear>{movie.Year}</MovieYear>
                </MovieInfo>
              </MovieCard>
            </Link>
          ))}
        </ResultsGrid>
      )}

      {!loading && !error && movies.length === 0 && searched && (
         <Message>No results found. Try a different search term.</Message>
      )}

    </Container>
  );
};

export default Home;