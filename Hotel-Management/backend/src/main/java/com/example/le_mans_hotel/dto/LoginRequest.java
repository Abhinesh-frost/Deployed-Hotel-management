package com.example.le_mans_hotel.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
