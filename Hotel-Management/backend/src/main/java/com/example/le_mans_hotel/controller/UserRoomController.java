package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.model.Room;
import com.example.le_mans_hotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user/rooms")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserRoomController {

    private final RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.findAll();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomService.findByAvailable(true);
    }
}
