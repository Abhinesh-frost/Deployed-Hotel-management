package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.model.Booking;
import com.example.le_mans_hotel.dto.BookingResponse;
import com.example.le_mans_hotel.dto.DtoMapper;
import com.example.le_mans_hotel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final BookingService bookingService;

    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.findAll().stream()
                .map(DtoMapper::toBookingResponse)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/status")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return bookingService.update(id, status);
    }
}
