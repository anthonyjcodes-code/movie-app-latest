import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tmdbAPI } from './tmdb';
import './MovieDetails.css';

const MovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie: initialMovie } = location.state || {};
  
  const [movie, setMovie] = useState(initialMovie || null);
  const [loading, setLoading] = useState(!initialMovie);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialMovie) {
      // If no movie passed in state, we need to get it from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const movieId = urlParams.get('id');
      
      if (movieId) {
        fetchMovieDetails(movieId);
      } else {
        setError('No movie found');
        setLoading(false);
      }
    }
  }, [initialMovie]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const movieData = await tmdbAPI.getMovieDetails(movieId);
      const formattedMovie = tmdbAPI.formatMovieData(movieData);
      setMovie(formattedMovie);
    } catch (err) {
      setError('Failed to fetch movie details');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (session) => {
    navigate(`/booking/${movie.id}/${session}`, {
      state: { movie, session }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sessions = ["Morning", "Evening", "Night"];

  if (loading) {
    return <div className="loading-container">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="error-container">{error || 'Movie not found'}</div>;
  }

  return (
    <div className="movie-details-container">
      {/* Hero Section with Backdrop */}
      <div 
        className="movie-hero"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(${tmdbAPI.getPosterUrl(movie.backdrop_path, 'w1280')})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <button onClick={() => navigate('/movies')} className="back-btn">
              ← Back to Movies
            </button>
            <div className="hero-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-tagline">{movie.tagline}</p>
              <div className="hero-meta">
                <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                <span className="runtime">{movie.runtime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-content-wrapper">
        <div className="movie-main-content">
          {/* Poster and Basic Info */}
          <div className="movie-poster-section">
            <div className="movie-poster">
              <img
                src={tmdbAPI.getPosterUrl(movie.poster_path)}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
              />
            </div>
            <div className="booking-section">
              <h3>Book Tickets</h3>
              <div className="price-info">
                <span className="price">${movie.price}</span>
                <span className="price-label">per ticket</span>
              </div>
              <div className="session-buttons">
                {sessions.map(session => (
                  <button
                    key={session}
                    onClick={() => handleBookNow(session)}
                    className="book-btn"
                  >
                    {session} Show
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="movie-info-section">
            <div className="info-grid">
              <div className="info-item">
                <h4>Genres</h4>
                <p>{movie.genres.length > 0 
                  ? movie.genres.map(g => g.name).join(', ')
                  : 'Action, Drama, Thriller'
                }</p>
              </div>
              
              <div className="info-item">
                <h4>Language</h4>
                <p>{movie.language}</p>
              </div>
              
              <div className="info-item">
                <h4>Release Date</h4>
                <p>{formatDate(movie.release_date)}</p>
              </div>
              
              <div className="info-item">
                <h4>Runtime</h4>
                <p>{movie.runtime} minutes</p>
              </div>
              
              <div className="info-item">
                <h4>Budget</h4>
                <p>{movie.budget > 0 ? formatCurrency(movie.budget) : 'Not Available'}</p>
              </div>
              
              <div className="info-item">
                <h4>Revenue</h4>
                <p>{movie.revenue > 0 ? formatCurrency(movie.revenue) : 'Not Available'}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="overview-section">
              <h3>Overview</h3>
              <p className="overview-text">{movie.overview}</p>
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="production-section">
                <h3>Production Companies</h3>
                <div className="production-list">
                  {movie.production_companies.map((company, index) => (
                    <div key={index} className="production-item">
                      {company.logo_path && (
                        <img
                          src={tmdbAPI.getPosterUrl(company.logo_path, 'w92')}
                          alt={company.name}
                          className="company-logo"
                        />
                      )}
                      <span>{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
