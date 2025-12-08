package com.example.le_mans_hotel.exception;


@SuppressWarnings("serial")
public class RoomNotAvailableException extends RuntimeException {
	
	
    public RoomNotAvailableException(String message) {
        super(message);
    }
    
}
