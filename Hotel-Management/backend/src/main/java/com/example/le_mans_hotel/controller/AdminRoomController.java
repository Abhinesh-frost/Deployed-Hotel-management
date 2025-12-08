package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.model.Room;
import com.example.le_mans_hotel.service.RoomService;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/rooms")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminRoomController {

    private final RoomService roomService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Room> createRoom(
            @RequestParam("roomType") String roomType,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "available", defaultValue = "true") Boolean available,
            @RequestParam("image") MultipartFile image) throws IOException {

        Room room = Room.builder()
                .roomType(roomType)
                .description(description)
                .price(price)
                .available(available)
                .imageData(image.getBytes())
                .imageName(image.getOriginalFilename())
                .imageType(image.getContentType())
                .build();

        Room savedRoom = roomService.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return roomService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getRoomImage(@PathVariable Long id) {
        return roomService.findById(id)
                .map(room -> {
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.parseMediaType(
                            room.getImageType() != null ? room.getImageType() : "image/jpeg"));
                    return new ResponseEntity<>(room.getImageData(), headers, HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @RequestParam("roomType") String roomType,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "available", defaultValue = "true") Boolean available,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        return roomService.findById(id)
                .map(existingRoom -> {
                    existingRoom.setRoomType(roomType);
                    existingRoom.setDescription(description);
                    existingRoom.setPrice(price);
                    existingRoom.setAvailable(available);

                    // Only update image if a new one is provided
                    if (image != null && !image.isEmpty()) {
                        try {
                            existingRoom.setImageData(image.getBytes());
                            existingRoom.setImageName(image.getOriginalFilename());
                            existingRoom.setImageType(image.getContentType());
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to process image", e);
                        }
                    }

                    Room updatedRoom = roomService.save(existingRoom);
                    return ResponseEntity.ok(updatedRoom);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        if (roomService.findById(id).isPresent()) {
            roomService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
