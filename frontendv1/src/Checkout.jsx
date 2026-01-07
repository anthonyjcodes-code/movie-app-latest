import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from './api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, session, selectedSeats, totalPrice } = location.state || {};

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    if (!movie || !session || selectedSeats.length === 0) return;

    setLoading(true);
    try {
      const orderPayload = {
        customerId: 1, // Hardcoded user ID for simplicity
        userName: "John Doe", // Hardcoded for simplicity
        orderDate: new Date().toISOString().split('T')[0],
        movieId: movie.id,
        movieTitle: movie.title,
        movieGenres: movie.genre,
        movieLanguage: movie.language,
        moviePrice: movie.price,
        movieRuntime: movie.runtime,
        seat: selectedSeats
      };

      const response = await api.createOrder(orderPayload);
      setOrderData(response);
      
      // Navigate to my-booking after successful order
      setTimeout(() => {
        navigate('/my-booking');
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!movie || !session) {
    return <div className="error">No booking data found</div>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="order-summary">
        <h2>Order Summary</h2>
        
        <div className="movie-details">
          <h3>Movie Details</h3>
          <p><strong>Title:</strong> {movie.title}</p>
          <p><strong>Session:</strong> {session}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        </div>

        <div className="booking-details">
          <h3>Booking Details</h3>
          <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
          <p><strong>Number of Seats:</strong> {selectedSeats.length}</p>
          <p><strong>Price per Seat:</strong> ${movie.price}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
      </div>

      <div className="actions">
        {orderData ? (
          <div className="success-message">
            <h3>Booking Confirmed!</h3>
            <p>Order ID: {orderData.orderId}</p>
            <p>Redirecting to your bookings...</p>
          </div>
        ) : (
          <button 
            onClick={handleConfirmBooking}
            className="confirm-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
