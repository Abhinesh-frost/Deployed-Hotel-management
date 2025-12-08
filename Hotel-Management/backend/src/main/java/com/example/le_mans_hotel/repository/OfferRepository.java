package com.example.le_mans_hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.le_mans_hotel.model.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
