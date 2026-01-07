import React, { useState, useEffect } from 'react';
import { api } from './api';
import './MyBooking.css';

const MyBooking = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Hardcoded user ID for simplicity
        const bookingData = await api.getOrder(1);
        setBooking(bookingData);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="my-booking-container">
      <h1>My Bookings</h1>
      
      {booking ? (
        <div className="booking-details">
          <div className="booking-header">
            <h2>Booking Confirmed</h2>
            <div className="order-id">Order ID: {booking.orderId}</div>
          </div>

          <div className="booking-info">
            <div className="info-section">
              <h3>Movie Information</h3>
              <p><strong>Title:</strong> {booking.movieTitle}</p>
              <p><strong>Genre:</strong> {booking.movieGenres}</p>
              <p><strong>Language:</strong> {booking.movieLanguage}</p>
              <p><strong>Runtime:</strong> {booking.movieRuntime} minutes</p>
              <p><strong>Price per Ticket:</strong> ${booking.moviePrice}</p>
            </div>

            <div className="info-section">
              <h3>Booking Information</h3>
              <p><strong>Customer Name:</strong> {booking.userName}</p>
              <p><strong>Order Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
              <p><strong>Booking Date:</strong> {booking.orderDate}</p>
              <p><strong>Seats:</strong> {booking.seat.join(', ')}</p>
              <p><strong>Number of Seats:</strong> {booking.seat.length}</p>
              <p><strong>Total Price:</strong> ${(booking.seat.length * booking.moviePrice).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-bookings">
          <h2>No Bookings Found</h2>
          <p>You haven't made any bookings yet.</p>
          <p>Browse movies and book your tickets now!</p>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
