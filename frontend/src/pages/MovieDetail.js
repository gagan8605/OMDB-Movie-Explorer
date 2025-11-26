import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetails } from '../services/api';

const DetailContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--secondary-color);
  border-radius: 10px;
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
`;

const MetaInfo = styled.p`
  font-size: 1rem;
  color: #bbb;
  margin: 0 0 1.5rem 0;
  display: flex;
  gap: 1rem;
`;

const Rating = styled.span`
  font-weight: bold;
  color: #f3ce13;
`;

const Plot = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;
  strong {
    color: var(--accent-color);
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 2rem 0 0 2rem;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 4rem;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (err) {
        setError('Could not fetch movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Message>Loading details...</Message>;
  if (error) return <Message>{error}</Message>;
  if (!movie) return <Message>Movie not found.</Message>;

  return (
    <>
      <BackLink to="/">&larr; Back to Search</BackLink>
      <DetailContainer>
        <Poster src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} alt={movie.Title} />
        <InfoContainer>
          <Title>{movie.Title}</Title>
          <MetaInfo>
            <span>{movie.Year}</span> |
            <span>{movie.Rated}</span> |
            <span>{movie.Runtime}</span> |
            <Rating>IMDb: {movie.imdbRating}</Rating>
          </MetaInfo>
          <Plot>{movie.Plot}</Plot>
          <DetailItem><strong>Director:</strong> {movie.Director}</DetailItem>
          <DetailItem><strong>Writer:</strong> {movie.Writer}</DetailItem>
          <DetailItem><strong>Actors:</strong> {movie.Actors}</DetailItem>
          <DetailItem><strong>Genre:</strong> {movie.Genre}</DetailItem>
        </InfoContainer>
      </DetailContainer>
    </>
  );
};

export default MovieDetail;