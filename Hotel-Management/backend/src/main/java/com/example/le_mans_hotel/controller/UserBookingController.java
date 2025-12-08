package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.dto.BookingRequest;
import com.example.le_mans_hotel.dto.BookingResponse;
import com.example.le_mans_hotel.model.Booking;
import com.example.le_mans_hotel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user/bookings")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserBookingController {

    private final BookingService bookingService;

    @GetMapping
    public List<Booking> getUserBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return bookingService.findByUserEmail(email);
    }

    @PostMapping
    public BookingResponse createBooking(@RequestBody BookingRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return bookingService.createBooking(request, email);
    }

}
