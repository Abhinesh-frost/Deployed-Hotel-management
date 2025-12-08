package com.example.le_mans_hotel.service;

import java.util.List;

import com.example.le_mans_hotel.model.Offer;

public interface OfferService {
	
	Offer saveOffer(Offer offer);
	
    List<Offer> getAllOffers();

}
