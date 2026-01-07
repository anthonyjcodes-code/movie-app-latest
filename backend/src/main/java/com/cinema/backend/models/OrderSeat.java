package com.cinema.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "order_seats")
public class OrderSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private Integer seatNumber;

    // Constructors
    public OrderSeat() {}

    public OrderSeat(Booking booking, Integer seatNumber) {
        this.booking = booking;
        this.seatNumber = seatNumber;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    @Override
    public String toString() {
        return "OrderSeat{" +
                "id=" + id +
                ", booking=" + (booking != null ? booking.getOrderId() : "null") +
                ", seatNumber=" + seatNumber +
                '}';
    }
}
