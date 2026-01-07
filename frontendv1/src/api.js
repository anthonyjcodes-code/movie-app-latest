import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = {
  // User APIs
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  },

  // Movie APIs
  getAllMovies: async () => {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  },

  getMovieById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
    return response.data;
  },

  searchMovies: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  getMoviesByGenre: async (genre) => {
    const response = await axios.get(`${API_BASE_URL}/movies/genre/${encodeURIComponent(genre)}`);
    return response.data;
  },

  // Screen APIs
  getScreens: async () => {
    const response = await axios.get(`${API_BASE_URL}/screens`);
    return response.data;
  },

  // Show APIs
  getShowsForMovie: async (movieId) => {
    const response = await axios.get(`${API_BASE_URL}/movies/${movieId}/shows`);
    return response.data;
  },

  getShowDetails: async (showId) => {
    const response = await axios.get(`${API_BASE_URL}/shows/${showId}`);
    return response.data;
  },

  // Booking APIs
  createBooking: async (bookingData) => {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  },

  getBookingDetails: async (orderId) => {
    const response = await axios.get(`${API_BASE_URL}/bookings/${orderId}`);
    return response.data;
  },

  getUserBookingHistory: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/bookings`);
    return response.data;
  },

  cancelBooking: async (orderId) => {
    const response = await axios.post(`${API_BASE_URL}/bookings/${orderId}/cancel`);
    return response.data;
  },

  // Format movie data for frontend
  formatMovieData: (backendMovie) => {
    return {
      id: backendMovie.id,
      title: backendMovie.title,
      overview: backendMovie.description,
      poster_path: backendMovie.imageUrl,
      backdrop_path: backendMovie.backdropUrl,
      release_date: backendMovie.releaseDate,
      vote_average: backendMovie.rating,
      vote_count: 1000,
      genre_ids: [],
      genres: backendMovie.genre ? backendMovie.genre.split(',').map(g => ({ id: 1, name: g.trim() })) : [],
      runtime: parseInt(backendMovie.duration) || 120,
      price: backendMovie.price,
      language: backendMovie.language,
      tagline: '',
      budget: 0,
      revenue: 0,
      production_companies: [],
      production_countries: [],
      spoken_languages: [],
      director: backendMovie.director,
      cast: backendMovie.cast,
      ageRating: backendMovie.ageRating,
      status: backendMovie.status
    };
  },

  // Get poster URL
  getPosterUrl: (posterPath) => {
    if (!posterPath) {
      return 'https://via.placeholder.com/500x750?text=No+Poster';
    }
    if (posterPath.startsWith('http') || posterPath.startsWith('/images/')) {
      return posterPath;
    }
    return `http://localhost:8080${posterPath}`;
  }
};
