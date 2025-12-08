package com.example.le_mans_hotel.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.le_mans_hotel.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl  implements EmailService{
	
	    private final JavaMailSender mailSender;

	    public void sendOfferMail(String to, String subject, String body) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(to);
	        message.setSubject(subject);
	        message.setText(body);
	        mailSender.send(message);
	    }
	
	    public void sendEmail(String to, String subject, String body) {
	        try {
	            SimpleMailMessage message = new SimpleMailMessage();
	            message.setTo(to);
	            message.setSubject(subject);
	            message.setText(body);

	            mailSender.send(message);
	            System.out.println("Email sent to: " + to);

	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new RuntimeException("Failed to send email to " + to);
	        }
	    }

}
