package com.example.le_mans_hotel.service;

import java.util.List;
import java.util.Optional;

import com.example.le_mans_hotel.model.Dish;

public interface DishService {

	Dish save(Dish dish);

	Optional<Dish> findById(Long id);

	void deleteById(Long id);

	List<Dish> findAll();
	
	Dish updateDish(Long id,Dish dishDetails);

}
