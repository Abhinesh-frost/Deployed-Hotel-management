package com.example.le_mans_hotel.exception;



@SuppressWarnings("serial")
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
