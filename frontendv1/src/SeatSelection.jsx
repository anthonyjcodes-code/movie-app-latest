import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from './api';
import './SeatSelection.css';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, session } = location.state || {};

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalSeats = 20;
  const seatPrice = movie?.price || 10;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const seats = await api.getSeats(movie.id, session);
        setBookedSeats(seats);
      } catch (error) {
        console.error('Error fetching seats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movie && session) {
      fetchBookedSeats();
    }
  }, [movie, session]);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleProceed = async () => {
    if (selectedSeats.length === 0) return;

    try {
      const updatedSeats = [...bookedSeats, ...selectedSeats];
      await api.updateSeats(movie.id, session, new Date().toISOString(), updatedSeats);
      
      navigate('/checkout', {
        state: {
          movie,
          session,
          selectedSeats,
          totalPrice: selectedSeats.length * seatPrice
        }
      });
    } catch (error) {
      console.error('Error updating seats:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading seats...</div>;
  }

  if (!movie || !session) {
    return <div className="error">No movie or session selected</div>;
  }

  return (
    <div className="seat-selection-container">
      <div className="movie-header">
        <h2>{movie.title}</h2>
        <p>Session: {session}</p>
      </div>

      <div className="seats-grid">
        <h3>Select Seats</h3>
        <div className="grid">
          {Array.from({ length: totalSeats }, (_, i) => i + 1).map(seatNumber => {
            const isBooked = bookedSeats.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);
            
            return (
              <button
                key={seatNumber}
                className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSeat(seatNumber)}
                disabled={isBooked}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>
      </div>

      <div className="selection-summary">
        <h3>Selection Summary</h3>
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ${selectedSeats.length * seatPrice}</p>
        <button 
          onClick={handleProceed}
          className="proceed-btn"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
