package com.example.le_mans_hotel.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.le_mans_hotel.model.Role;
import com.example.le_mans_hotel.model.User;
import com.example.le_mans_hotel.repository.UserRepository;
import com.example.le_mans_hotel.security.JwtService;
import com.example.le_mans_hotel.service.AuthService;
import com.example.le_mans_hotel.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    
    private final Map<String, OtpData> otpMap = new HashMap<>();
    
    @Override
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        return userRepository.save(user);
    }

    @Override
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail());
    }

	@Override
	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
    public void sendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

        otpMap.put(user.getEmail(), new OtpData(otp, LocalDateTime.now().plusMinutes(5)));

        emailService.sendEmail(
            user.getEmail(),
            "Your OTP",
            "Your OTP for password reset is: " + otp + "\nThis OTP is valid for 5 minutes."
        );
    }

	public boolean verifyOtpAndReset(String email, String otp, String newPassword) {
	        OtpData stored = otpMap.get(email);

	        if (stored == null || stored.expiry.isBefore(LocalDateTime.now())) {
	            otpMap.remove(email);
	            return false; // expired or missing
	        }

	        if (!stored.otp.equals(otp)) {
	            return false; // invalid OTP
	        }

	        User user = userRepository.findByEmail(email)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setPassword(passwordEncoder.encode(newPassword));
	        userRepository.save(user);

	        otpMap.remove(email); // clear after successful reset
	        return true;
	    }
	
	 @Scheduled(fixedRate = 300000) // 300000 ms = 5 min
	 public void clearExpiredOtps() {
	        otpMap.entrySet().removeIf(e ->
	            e.getValue().expiry.isBefore(LocalDateTime.now())
	        );
	    }
	
	 private record OtpData(String otp, LocalDateTime expiry) {}
}
