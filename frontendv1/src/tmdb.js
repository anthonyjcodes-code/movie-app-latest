import axios from 'axios';

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmQ3NjY3ZDQ0MzA4ZjAwYzE5ZjI3MjY3NjM1ZjQ3MCIsInN1YiI6IjY1OTJhZjIzZmQzMWUyMDE3YmFjNGU4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8CkKmZN2H0L8d5m5w0Z8hNqTlGn2mF6yX3Y9K0W7X4'; // Replace with your actual TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
        language: 'en-US'
      }
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
        language: 'en-US'
      }
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });
    return response.data;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });
    return response.data;
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        page: page,
        language: 'en-US'
      }
    });
    return response.data;
  },

  // Get movie poster URL
  getPosterUrl: (posterPath, size = 'w500') => {
    return posterPath ? `https://image.tmdb.org/t/p/${size}${posterPath}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  },

  // Format movie data for our app
  formatMovieData: (tmdbMovie) => {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      poster_path: tmdbMovie.poster_path,
      backdrop_path: tmdbMovie.backdrop_path,
      release_date: tmdbMovie.release_date,
      vote_average: tmdbMovie.vote_average,
      vote_count: tmdbMovie.vote_count,
      genre_ids: tmdbMovie.genre_ids,
      genres: tmdbMovie.genres || [],
      runtime: tmdbMovie.runtime || 120, // Default runtime
      price: (Math.random() * 8 + 8).toFixed(2), // Random price between $8-16
      language: tmdbMovie.original_language === 'en' ? 'English' : tmdbMovie.original_language,
      tagline: tmdbMovie.tagline || '',
      budget: tmdbMovie.budget || 0,
      revenue: tmdbMovie.revenue || 0,
      production_companies: tmdbMovie.production_companies || [],
      production_countries: tmdbMovie.production_countries || [],
      spoken_languages: tmdbMovie.spoken_languages || []
    };
  }
};
