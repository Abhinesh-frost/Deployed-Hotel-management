package com.example.le_mans_hotel.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.le_mans_hotel.model.Offer;
import com.example.le_mans_hotel.repository.OfferRepository;
import com.example.le_mans_hotel.service.OfferService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;

    @Override
    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    @Override
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }
}