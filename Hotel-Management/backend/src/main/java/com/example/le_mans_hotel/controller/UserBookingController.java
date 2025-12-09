package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.dto.BookingRequest;
import com.example.le_mans_hotel.dto.BookingResponse;
import com.example.le_mans_hotel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.le_mans_hotel.dto.DtoMapper;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/bookings")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserBookingController {

    private final BookingService bookingService;

    @GetMapping
    public List<BookingResponse> getUserBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return bookingService.findByUserEmail(email).stream()
                .map(DtoMapper::toBookingResponse)
                .collect(Collectors.toList());
    }

    @PostMapping
    public BookingResponse createBooking(@RequestBody BookingRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return bookingService.createBooking(request, email);
    }

}
