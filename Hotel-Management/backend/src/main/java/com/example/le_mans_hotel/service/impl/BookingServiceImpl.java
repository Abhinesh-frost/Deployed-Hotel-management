package com.example.le_mans_hotel.service.impl;


import java.time.temporal.ChronoUnit;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.le_mans_hotel.dto.BookingRequest;
import com.example.le_mans_hotel.dto.BookingResponse;
import com.example.le_mans_hotel.dto.DtoMapper;
import com.example.le_mans_hotel.exception.ResourceNotFoundException;
import com.example.le_mans_hotel.exception.RoomNotAvailableException;
import com.example.le_mans_hotel.model.Booking;
import com.example.le_mans_hotel.model.BookingStatus;
import com.example.le_mans_hotel.model.Dish;
import com.example.le_mans_hotel.model.Room;
import com.example.le_mans_hotel.model.User;
import com.example.le_mans_hotel.repository.BookingRepository;
import com.example.le_mans_hotel.repository.DishRepository;
import com.example.le_mans_hotel.repository.RoomRepository;
import com.example.le_mans_hotel.repository.UserRepository;
import com.example.le_mans_hotel.service.BookingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final DishRepository dishRepository;

    @Override
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> findByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return bookingRepository.findAll().stream()
                .filter(b -> b.getUser().getId().equals(user.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse createBooking(BookingRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with email: " + userEmail));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Room not found with ID: " + request.getRoomId()));

        Dish dish = dishRepository.findById(request.getDishId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Dish not found with ID: " + request.getDishId()));
        List<Booking> existingBookings = bookingRepository.findByRoomId(room.getId());

        for (Booking b : existingBookings) {

            // Allow booking if previous booking was cancelled
            if (b.getBookingStatus() == BookingStatus.CANCELLED) {
                continue;
            }

            boolean overlaps =
                    !request.getCheckInDate().isAfter(b.getCheckOutDate()) &&
                    !request.getCheckOutDate().isBefore(b.getCheckInDate());

            if (overlaps) {
                throw new RoomNotAvailableException(
                        "Sorry, Room is not available for the selected dates");
            }
        }
        int noOfDays = (int) ChronoUnit.DAYS.between(
                request.getCheckInDate(),
                request.getCheckOutDate()
        );
        // Calculate total cost
        double totalCost = dish.getPricePerPerson() * request.getNoOfPerson();

        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .dish(dish)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .bookingStatus(BookingStatus.CONFIRMED)
                .noOfPerson(request.getNoOfPerson())
                .totalCost((totalCost + room.getPrice())*noOfDays)
                .build();

        Booking saved = bookingRepository.save(booking);
        return DtoMapper.toBookingResponse(saved);
    }

    
    @Override
    public Booking update(Long id,String status) {
    	  Booking booking = bookingRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The Booking With this Id is Not Found."));
          booking.setBookingStatus(Enum.valueOf(BookingStatus.class, status));
          return bookingRepository.save(booking);
    }

    @Override
    public double calculateTotalCost(Booking booking) {
        double totalCost = 0.0;

        if (booking.getRoom() != null && booking.getRoom().getPrice() != null) {
            totalCost += booking.getRoom().getPrice();
        }

        if (booking.getDish() != null && booking.getDish().getPricePerPerson() != null) {
            totalCost += booking.getDish().getPricePerPerson() * booking.getNoOfPerson();
        }

        return totalCost;
    }
}
