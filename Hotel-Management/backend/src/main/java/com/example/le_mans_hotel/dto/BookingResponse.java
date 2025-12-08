package com.example.le_mans_hotel.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

import com.example.le_mans_hotel.model.BookingStatus;

@Data
@Builder
public class BookingResponse {
    private Long bookingId;
    private String roomName;
    private String cuisineType;
    private double totalCost;
    private BookingStatus status;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

}
