package com.cinema.backend.repositories;

import com.cinema.backend.models.OrderSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderSeatRepository extends JpaRepository<OrderSeat, Integer> {
    List<OrderSeat> findByBookingOrderId(Integer orderId);
}
