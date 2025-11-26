import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  animation: ${slideIn} 0.6s ease-out;
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
  max-width: 600px;
  width: 100%;
  transition: all 0.3s ease;

  ${props => props.isFocused && css`
    transform: scale(1.02);
  `}
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid var(--border-color, #e1e5e9);
  border-radius: 50px 0 0 50px;
  background: linear-gradient(135deg, var(--secondary-color, #f8f9fa) 0%, #ffffff 100%);
  color: var(--font-color, #333);
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: var(--accent-color, #007bff);
    background: linear-gradient(135deg, #ffffff 0%, var(--secondary-color, #f8f9fa) 100%);
    animation: ${pulse} 2s infinite;
  }

  &::placeholder {
    color: #6c757d;
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: transparent;
  }

  ${props => props.hasError && css`
    border-color: #dc3545;
    animation: ${shake} 0.5s ease-in-out;
  `}
`;

const SearchButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid var(--accent-color, #007bff);
  border-left: none;
  border-radius: 0 50px 50px 0;
  background: linear-gradient(135deg, var(--accent-color, #007bff) 0%, #0056b3 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};

  &:hover {
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
  }
`;

const SuggestionBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f1f3f4;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
  animation: ${slideIn} 0.3s ease;
`;

const SearchBar = ({ onSearch, isLoading = false, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setShowSuggestions(false);
    } else if (!query.trim()) {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handleClear = () => {
    setQuery('');
    setHasError(false);
    inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHasError(false);
    setShowSuggestions(e.target.value.length > 0);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SearchContainer>
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
        <SearchForm 
          onSubmit={handleSubmit} 
          isFocused={isFocused}
        >
          <SearchInput
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for a movie or series..."
            hasError={hasError}
            disabled={isLoading}
          />
          
          <ClearButton 
            type="button" 
            onClick={handleClear}
            show={query.length > 0}
            aria-label="Clear search"
          >
            ✕
          </ClearButton>

          <SearchButton 
            type="submit" 
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? <LoadingSpinner /> : 'Search'}
          </SearchButton>
        </SearchForm>

        <SuggestionBox show={showSuggestions && suggestions.length > 0}>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionBox>

        {hasError && (
          <ErrorMessage>
            Please enter a search term
          </ErrorMessage>
        )}
      </div>
    </SearchContainer>
  );
};

export default SearchBar;