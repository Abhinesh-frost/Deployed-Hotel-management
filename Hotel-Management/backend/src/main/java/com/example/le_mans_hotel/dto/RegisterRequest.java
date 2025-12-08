package com.example.le_mans_hotel.dto;


import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}
