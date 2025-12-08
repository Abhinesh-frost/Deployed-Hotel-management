package com.example.le_mans_hotel.configurations;

import com.example.le_mans_hotel.model.Dish;
import com.example.le_mans_hotel.model.Role;
import com.example.le_mans_hotel.model.User;
import com.example.le_mans_hotel.repository.DishRepository;
import com.example.le_mans_hotel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("abinesh.bolt@gmail.com").isEmpty()) {
                User admin = User.builder()
                        .name("Admin")
                        .email("abinesh.bolt@gmail.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("Admin user created: abinesh.bolt@gmail.com / admin123 ");
            }
        };
    }

    @Bean
    CommandLineRunner initDishes(DishRepository dishRepository) {
        return args -> {
            if (dishRepository.count() == 0) {
                Dish french = Dish.builder()
                        .cuisineName("French")
                        .description("Classic French haute cuisine in an elegant setting.")
                        .pricePerPerson(150.0)
                        .build();

                Dish italian = Dish.builder()
                        .cuisineName("Italian")
                        .description("Authentic Italian flavors with a modern twist.")
                        .pricePerPerson(120.0)
                        .build();

                Dish japanese = Dish.builder()
                        .cuisineName("Japanese")
                        .description("Traditional sushi and kaiseki dining experience.")
                        .pricePerPerson(180.0)
                        .build();

                Dish indian = Dish.builder()
                        .cuisineName("Indian")
                        .description("A culinary journey through the rich flavors of India.")
                        .pricePerPerson(100.0)
                        .build();

                Dish chinese = Dish.builder()
                        .cuisineName("Chinese")
                        .description("Exquisite Cantonese and Szechuan dishes.")
                        .pricePerPerson(110.0)
                        .build();

                dishRepository.saveAll(Arrays.asList(french, italian, japanese, indian, chinese));
                System.out.println("Default dishes initialized: 5 cuisines added");
            }
        };
    }
}
