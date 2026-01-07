import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import './Movies.css';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const sessions = ["Morning", "Evening", "Night"];

  // Extract unique genres from movies
  const extractGenres = (moviesList) => {
    const genreSet = new Set();
    moviesList.forEach(movie => {
      if (movie.genre) {
        movie.genre.split(',').forEach(g => genreSet.add(g.trim()));
      }
    });
    return Array.from(genreSet).map((name, index) => ({ id: index + 1, name }));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let movieData;
        if (searchQuery) {
          movieData = await api.searchMovies(searchQuery);
        } else if (selectedGenre) {
          movieData = await api.getMoviesByGenre(selectedGenre);
        } else {
          movieData = await api.getAllMovies();
        }
        
        const formattedMovies = movieData.map(movie => api.formatMovieData(movie));
        setMovies(formattedMovies);
        
        // Extract genres from movies
        const allGenres = extractGenres(movieData);
        setGenres(allGenres);
        
        setTotalPages(1); // Backend doesn't support pagination yet
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery, selectedGenre]);

  const handleBookNow = (movie, session) => {
    navigate(`/booking/${movie.id}/${session}`, {
      state: { movie, session }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleGenreChange = (genreName) => {
    setSelectedGenre(genreName === selectedGenre ? null : genreName);
    setPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && page === 1) {
    return <div className="loading-container">Loading movies...</div>;
  }

  return (
    <div className="movies-container">
      {/* Header */}
      <div className="movies-header">
        <h1>Discover Movies</h1>
        <p>Book your favorite movies from our collection</p>
      </div>

      {/* Search and Filters */}
      <div className="movies-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="genre-filters">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`genre-btn ${!selectedGenre ? 'active' : ''}`}
          >
            All
          </button>
          {genres.map(genre => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.name)}
              className={`genre-btn ${selectedGenre === genre.name ? 'active' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie-details?id=${movie.id}`, { state: { movie } })}>
            <div className="movie-poster">
              <img
                src={api.getPosterUrl(movie.poster_path)}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
              />
              <div className="movie-rating">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
            </div>
            
            <div className="movie-content">
              <h3 className="movie-title">{movie.title}</h3>
              
              <div className="movie-info">
                <p className="movie-genres">
                  {movie.genres.length > 0 
                    ? movie.genres.map(g => g.name).slice(0, 2).join(', ')
                    : 'Action, Drama'
                  }
                </p>
                <p className="movie-meta">
                  {formatDate(movie.release_date)} • {movie.language}
                </p>
                <p className="movie-runtime">{movie.runtime} min</p>
                <p className="movie-price">${movie.price}</p>
              </div>

              <div className="movie-sessions">
                <h4>Sessions:</h4>
                <div className="session-buttons">
                  {sessions.map(session => (
                    <button
                      key={session}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(movie, session);
                      }}
                      className="session-btn"
                    >
                      {session}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      {/* Loading for pagination */}
      {loading && page > 1 && (
        <div className="loading-container">Loading more movies...</div>
      )}
    </div>
  );
};

export default Movies;
