package com.example.le_mans_hotel.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI hotelApiDocumentation() {
        return new OpenAPI()
                .info(new Info()
                        .title("Le Mans Hotel Management API")
                        .description("API Documentation for Hotel Booking, Rooms, Customer Support, Admin Features")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Abhinesh")
                                .email("lemans.hotel.france@gmail.com")
                        )
                );
    }
}
