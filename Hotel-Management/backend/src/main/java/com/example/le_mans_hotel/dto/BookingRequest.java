package com.example.le_mans_hotel.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long roomId;
    private Long dishId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer noOfPerson;
}
