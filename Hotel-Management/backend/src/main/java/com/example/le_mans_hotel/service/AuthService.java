package com.example.le_mans_hotel.service;

import java.util.Optional;

import com.example.le_mans_hotel.model.User;

public interface AuthService {
	 User registerUser(User user);
	 String login(String email, String password);
	 Optional<User> findByEmail(String email);
	 void sendOtp(String email);
	 boolean verifyOtpAndReset(String email, String otp, String newPassword);
}
