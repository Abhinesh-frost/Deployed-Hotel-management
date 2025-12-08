package com.example.le_mans_hotel.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.le_mans_hotel.model.Offer;
import com.example.le_mans_hotel.model.User;
import com.example.le_mans_hotel.repository.OfferRepository;
import com.example.le_mans_hotel.repository.UserRepository;
import com.example.le_mans_hotel.service.EmailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OfferScheduler {

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 10 * * ?")
    public void sendDailyOffers() {
        List<Offer> offers = offerRepository.findAll();
        List<User> users = userRepository.findAll();

        if (offers.isEmpty() || users.isEmpty()) {
            System.out.println("No offers or users found. Skipping email dispatch.");
            return;
        }

        for (Offer offer : offers) {
        	if(offer.getActive()==false)continue;
            for (User user : users) {
                String subject = "Le Mans Hotel Offer: " + offer.getTitle();
                String body = offer.getDescription() +
                              "\n\nBook now at Le Mans Hotel!";
                emailService.sendOfferMail(user.getEmail(), subject, body);
            }
            offer.setActive(false);
        }
        
        offerRepository.saveAll(offers);

        System.out.println(" Daily offers sent successfully to all users.");
    }
}

