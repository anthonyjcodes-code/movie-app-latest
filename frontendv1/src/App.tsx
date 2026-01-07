import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import SeatSelection from './SeatSelection';
import Checkout from './Checkout';
import MyBooking from './MyBooking';
import MovieGallery from './MovieGallery';
import './App.css';
import './Navigation.css';

interface Message {
  type: 'success' | 'error';
  text: string;
}

// Auth component (existing login/registration)
const Auth = () => {
  const initialLogin = window.location.pathname !== '/register';
  const [isLogin, setIsLogin] = React.useState(initialLogin);
  const [user, setUser] = React.useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<Message | null>(null);

  const API_BASE_URL = 'http://localhost:8080/api/v1';

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      });
      
      if (response.ok) {
        showMessage('success', 'Registration successful! Please login with your credentials.');
        setUser({ name: '', email: '', password: '' });
        // Switch to login tab after successful registration
        setIsLogin(true);
      } else {
        const errorData = await response.json();
        showMessage('error', errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      showMessage('error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      });
      const data = await response.json();
      
      // Store response data in localStorage
      localStorage.setItem('loginResponse', JSON.stringify(data));
      
      // Show success message
      showMessage('success', `Welcome back, ${data.userName}!`);
      
      // Redirect to movies page after a short delay
      setTimeout(() => {
        window.location.replace('/movie-listing.html');
      }, 1000);
      
      setUser({ name: '', email: '', password: '' });
    } catch (error) {
      showMessage('error', 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Sign in to your account' : 'Join Cinema Booking System'}</p>
        </div>

        {message && (
          <div className={`${message.type}-message`}>
            {message.text}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading"></span> {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Navigation component
const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/movies">Movies</Link>
      <Link to="/my-booking">My Bookings</Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/gallery" element={<MovieGallery />} />
        <Route path="/my-booking" element={
          <div className="app-container">
            <Navigation />
            <MyBooking />
          </div>
        } />
        <Route path="/booking/:movieId/:session" element={
          <div className="app-container">
            <Navigation />
            <SeatSelection />
          </div>
        } />
        <Route path="/checkout" element={
          <div className="app-container">
            <Navigation />
            <Checkout />
          </div>
        } />
      </Routes>
    </Router>
  );
}

const NotFound = () => {
  React.useEffect(() => {
    // If it's an HTML file request, redirect to the actual file
    if (window.location.pathname.includes('/htmls/')) {
      window.location.replace(window.location.pathname + window.location.search);
    }
  }, []);
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Go to Login
      </Link>
    </div>
  );
};

export default App;
