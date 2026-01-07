package com.cinema.backend.repositories;

import com.cinema.backend.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserIdOrderByBookingTimeDesc(Integer userId);
    Booking findByOrderId(Integer orderId);
}
