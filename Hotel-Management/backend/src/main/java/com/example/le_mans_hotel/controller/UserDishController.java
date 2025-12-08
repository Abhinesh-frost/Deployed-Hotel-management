package com.example.le_mans_hotel.controller;

import com.example.le_mans_hotel.model.Dish;
import com.example.le_mans_hotel.service.DishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user/dishes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserDishController {

    private final DishService dishService;

    @GetMapping
    public List<Dish> getAllDishes() {
        return dishService.findAll();
    }
}
