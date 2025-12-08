package com.example.le_mans_hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.le_mans_hotel.model.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {
	
}