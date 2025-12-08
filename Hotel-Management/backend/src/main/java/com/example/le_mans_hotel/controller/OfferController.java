package com.example.le_mans_hotel.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.le_mans_hotel.dto.DtoMapper;
import com.example.le_mans_hotel.dto.OfferDTO;
import com.example.le_mans_hotel.model.Offer;
import com.example.le_mans_hotel.service.OfferService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/offers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OfferController {

    private final OfferService offerService;

    @PostMapping("/add")
    public ResponseEntity<Offer> addOffer(@RequestBody OfferDTO dto) {
        Offer offer = DtoMapper.toOffer(dto);
        return ResponseEntity.ok(offerService.saveOffer(offer));
    }


    @GetMapping("/all")
    public ResponseEntity<List<Offer>> getAllOffers() {
        return ResponseEntity.ok(offerService.getAllOffers());
    }
}
