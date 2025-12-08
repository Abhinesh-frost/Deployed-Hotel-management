package com.example.le_mans_hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.le_mans_hotel.model.Booking;
import com.example.le_mans_hotel.model.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
	List<Booking> findByRoomId(Long id);
}
