package com.example.le_mans_hotel.exception;

@SuppressWarnings("serial")
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
