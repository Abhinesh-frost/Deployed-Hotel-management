package com.example.le_mans_hotel.dto;

import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private String roomName;
    private String roomType;
    private double pricePerNight;
    private boolean available;
}
