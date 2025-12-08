package com.example.le_mans_hotel.service;

import java.util.List;
import java.util.Optional;

import com.example.le_mans_hotel.dto.BookingRequest;
import com.example.le_mans_hotel.dto.BookingResponse;
import com.example.le_mans_hotel.model.Booking;

public interface BookingService {
    List<Booking> findAll();
    Optional<Booking> findById(Long id);
    Booking save(Booking booking);
    List<Booking> findByUserEmail(String email);
    BookingResponse createBooking(BookingRequest request, String userEmail);
    double calculateTotalCost(Booking booking);
	Booking update(Long id, String status);
}
