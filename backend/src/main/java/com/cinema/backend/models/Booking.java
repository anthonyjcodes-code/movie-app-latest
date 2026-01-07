package com.cinema.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer totalAmount;

    @Column(nullable = false)
    private Integer seatCount;

    @Column(nullable = false)
    private LocalDateTime bookingTime;

    @Column(nullable = false)
    private String status; // CONFIRMED, CANCELLED

    // Constructors
    public Booking() {}

    public Booking(Show show, User user, Integer totalAmount, Integer seatCount, String status) {
        this.show = show;
        this.user = user;
        this.totalAmount = totalAmount;
        this.seatCount = seatCount;
        this.bookingTime = LocalDateTime.now();
        this.status = status;
    }

    // Getters and Setters
    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(Integer seatCount) {
        this.seatCount = seatCount;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "orderId=" + orderId +
                ", show=" + (show != null ? show.getShowId() : "null") +
                ", user=" + (user != null ? user.getId() : "null") +
                ", totalAmount=" + totalAmount +
                ", seatCount=" + seatCount +
                ", bookingTime=" + bookingTime +
                ", status='" + status + '\'' +
                '}';
    }
}
