package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.service.RoomService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PublicController {

    private final RoomService roomService;

    /**
     * Public endpoint to get room images without authentication.
     * This is needed because <img> tags cannot send JWT tokens in headers.
     */
    @GetMapping("/rooms/{id}/image")
    public ResponseEntity<byte[]> getRoomImage(@PathVariable Long id) {
        return roomService.findById(id)
                .map(room -> {
                    if (room.getImageData() == null) {
                        return ResponseEntity.notFound().<byte[]>build();
                    }
                    HttpHeaders headers = new HttpHeaders();
                    String contentType = room.getImageType();
                    headers.setContentType(MediaType.parseMediaType(
                            contentType != null ? contentType : "image/jpeg"));
                    return new ResponseEntity<>(room.getImageData(), headers, HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
