import React, { useState, useEffect } from 'react';
import './MovieGallery.css';

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/v1/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Error loading movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="movie-gallery-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Amazing Movies...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-gallery-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>{error}</h2>
          <button onClick={fetchMovies} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-gallery-container">
      <header className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-title">🎬 Cinema Movie Gallery</h1>
          <p className="gallery-subtitle">Discover amazing movies playing now</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{movies.length}</span>
            <span className="stat-label">Movies</span>
          </div>
        </div>
      </header>

      <main className="gallery-main">
        <div className="movies-grid">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="movie-poster-container">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMUExQTFBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjNzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2Ij5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
                <div className="movie-overlay">
                  <div className="movie-rating">
                    ⭐ {movie.rating}
                  </div>
                  <div className="movie-price">
                    ₹{movie.price}
                  </div>
                </div>
              </div>
              
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                  <span className="movie-genre">{movie.genre}</span>
                  <span className="movie-duration">{movie.duration}</span>
                </div>
                <div className="movie-details">
                  <span className="movie-language">{movie.language}</span>
                  <span className="movie-age-rating">{movie.ageRating}</span>
                </div>
                <p className="movie-description">{movie.description.substring(0, 100)}...</p>
                <div className="movie-actions">
                  <button className="book-button">Book Now</button>
                  <button className="details-button">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedMovie && (
        <div className="movie-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img src={selectedMovie.imageUrl} alt={selectedMovie.title} className="modal-poster" />
              <div className="modal-info">
                <h2>{selectedMovie.title}</h2>
                <div className="modal-meta">
                  <span>⭐ {selectedMovie.rating}</span>
                  <span>💰 ₹{selectedMovie.price}</span>
                  <span>⏱️ {selectedMovie.duration}</span>
                </div>
              </div>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p>{selectedMovie.description}</p>
              </div>
              
              <div className="modal-section">
                <h3>Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Genre:</strong> {selectedMovie.genre}
                  </div>
                  <div className="detail-item">
                    <strong>Language:</strong> {selectedMovie.language}
                  </div>
                  <div className="detail-item">
                    <strong>Release Date:</strong> {selectedMovie.releaseDate}
                  </div>
                  <div className="detail-item">
                    <strong>Age Rating:</strong> {selectedMovie.ageRating}
                  </div>
                  <div className="detail-item">
                    <strong>Director:</strong> {selectedMovie.director}
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong> {selectedMovie.status}
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h3>Cast</h3>
                <p>{selectedMovie.cast}</p>
              </div>
              
              <div className="modal-actions">
                <button className="book-now-button">Book Tickets Now</button>
                <button className="watch-trailer-button">Watch Trailer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGallery;
