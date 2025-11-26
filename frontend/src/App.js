import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>🎬 OMDB Movie Explorer</h1>
      </Header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
