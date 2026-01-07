package com.cinema.backend.controllers;

import com.cinema.backend.models.*;
import com.cinema.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Random;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"})
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderSeatRepository orderSeatRepository;

    @PostMapping("/api/v1/bookings")
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Map<String, Object> request) {
        try {
            Integer showId = (Integer) request.get("showId");
            Integer seats = (Integer) request.get("seats");
            Integer userId = (Integer) request.get("userId"); // Add userId to request

            Show show = showRepository.findByShowId(showId);
            if (show == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Show not found"));
            }

            User user = userRepository.findById(userId.longValue()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }

            if (show.getAvailableSeats() < seats) {
                return ResponseEntity.badRequest().body(Map.of("error", "Not enough available seats"));
            }

            // Calculate total amount
            Integer totalAmount = show.getTicketPrice() * seats;

            // Create booking
            Booking booking = new Booking(show, user, totalAmount, seats, "CONFIRMED");
            booking = bookingRepository.save(booking);

            // Generate random seat numbers for simplicity
            List<Integer> seatNumbers = new ArrayList<>();
            Random random = new Random();
            for (int i = 0; i < seats; i++) {
                int seatNumber;
                do {
                    seatNumber = random.nextInt(show.getScreen().getTotalSeats()) + 1;
                } while (seatNumbers.contains(seatNumber));
                seatNumbers.add(seatNumber);

                // Create order seat record
                OrderSeat orderSeat = new OrderSeat(booking, seatNumber);
                orderSeatRepository.save(orderSeat);
            }

            // Update available seats
            show.setAvailableSeats(show.getAvailableSeats() - seats);
            showRepository.save(show);

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", booking.getOrderId());
            response.put("status", booking.getStatus());
            response.put("totalAmount", booking.getTotalAmount());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to create booking: " + e.getMessage()));
        }
    }

    @GetMapping("/api/v1/bookings/{orderId}")
    public ResponseEntity<Map<String, Object>> getBookingDetails(@PathVariable Integer orderId) {
        Booking booking = bookingRepository.findByOrderId(orderId);
        
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        List<OrderSeat> orderSeats = orderSeatRepository.findByBookingOrderId(orderId);
        List<Integer> seatNumbers = orderSeats.stream().map(OrderSeat::getSeatNumber).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", booking.getOrderId());
        response.put("movie", booking.getShow().getMovie().getTitle());
        response.put("screen", booking.getShow().getScreen().getScreenName());
        response.put("date", booking.getShow().getShowDate().toString());
        response.put("time", booking.getShow().getShowTime().toString());
        response.put("seats", seatNumbers);
        response.put("amount", booking.getTotalAmount());
        response.put("status", booking.getStatus());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/users/{userId}/bookings")
    public ResponseEntity<List<Map<String, Object>>> getUserBookingHistory(@PathVariable Integer userId) {
        List<Booking> bookings = bookingRepository.findByUserIdOrderByBookingTimeDesc(userId);
        
        List<Map<String, Object>> response = bookings.stream().map(booking -> {
            Map<String, Object> bookingData = new HashMap<>();
            bookingData.put("orderId", booking.getOrderId());
            bookingData.put("movie", booking.getShow().getMovie().getTitle());
            bookingData.put("date", booking.getShow().getShowDate().toString());
            bookingData.put("time", booking.getShow().getShowTime().toString());
            bookingData.put("status", booking.getStatus());
            return bookingData;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/bookings/{orderId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelBooking(@PathVariable Integer orderId) {
        Booking booking = bookingRepository.findByOrderId(orderId);
        
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        if (!"CONFIRMED".equals(booking.getStatus())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Booking cannot be cancelled"));
        }

        // Update booking status
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        // Restore available seats
        Show show = booking.getShow();
        show.setAvailableSeats(show.getAvailableSeats() + booking.getSeatCount());
        showRepository.save(show);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", booking.getOrderId());
        response.put("status", booking.getStatus());

        return ResponseEntity.ok(response);
    }
}
