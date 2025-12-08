package com.example.le_mans_hotel.dto;

import lombok.Data;

@Data
public class DishDTO {
    private Long id;
    private String dishName;
    private String cuisineType;
    private double pricePerPerson;
}
