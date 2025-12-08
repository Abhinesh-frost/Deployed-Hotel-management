package com.example.le_mans_hotel.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.le_mans_hotel.exception.ResourceNotFoundException;
import com.example.le_mans_hotel.model.Dish;
import com.example.le_mans_hotel.repository.DishRepository;
import com.example.le_mans_hotel.service.DishService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DishServiceImpl implements DishService{

	DishRepository dishRepository;
	@Override
	public Dish save(Dish dish) {
		return dishRepository.save(dish);
	}

	@Override
	public Optional<Dish> findById(Long id) {
		return dishRepository.findById(id);
	}

	@Override
	public void deleteById(Long id) {
		dishRepository.deleteById(id);
	}

	@Override
	public List<Dish> findAll() {
		return dishRepository.findAll();
	}
	@Override
	public Dish updateDish(Long id,Dish dishDetails) {
         Dish dish = dishRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The Dish With this Id is Not Found."));;
         dish.setCuisineName(dishDetails.getCuisineName());
         dish.setDescription(dishDetails.getDescription());
         dish.setPricePerPerson(dishDetails.getPricePerPerson());
         return dishRepository.save(dish);
     }
}
