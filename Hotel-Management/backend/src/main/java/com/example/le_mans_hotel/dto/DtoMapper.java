package com.example.le_mans_hotel.dto;

import com.example.le_mans_hotel.model.*;

public class DtoMapper {

    // ---- Offer ----
    public static Offer toOffer(OfferDTO dto) {
        return Offer.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }

    // ---- Booking ----
    public static BookingResponse toBookingResponse(Booking booking) {
        return BookingResponse.builder()
                .bookingId(booking.getId())
                .cuisineType(booking.getDish().getCuisineName())
                .totalCost(booking.getTotalCost())
                .status(booking.getBookingStatus())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .build();
    }

    // ---- Room ----
    public static RoomDTO toRoomDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setRoomName(room.getRoomType());
        dto.setPricePerNight(room.getPrice());
        dto.setAvailable(room.getAvailable());
        return dto;
    }

    // ---- Dish ----
    public static DishDTO toDishDTO(Dish dish) {
        DishDTO dto = new DishDTO();
        dto.setId(dish.getId());
        dto.setCuisineType(dish.getCuisineName());
        dto.setPricePerPerson(dish.getPricePerPerson());
        return dto;
    }
}
