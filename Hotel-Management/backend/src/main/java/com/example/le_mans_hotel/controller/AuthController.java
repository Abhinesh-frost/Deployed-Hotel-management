package com.example.le_mans_hotel.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.le_mans_hotel.dto.AuthResponse;
import com.example.le_mans_hotel.dto.LoginRequest;
import com.example.le_mans_hotel.dto.RegisterRequest;
import com.example.le_mans_hotel.model.User;
import com.example.le_mans_hotel.service.AuthService;
import com.example.le_mans_hotel.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        User user = new User();
        user.setName(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        User saved = authService.registerUser(user);

        // Send welcome email
        try {
            String subject = "Welcome to Le Mans Hotel!";
            String body = String.format(
                    "Dear %s,\n\n" +
                            "Welcome to Le Mans Hotel - Your Premium Luxury Experience Awaits!\n\n" +
                            "Thank you for registering with us. We're delighted to have you as part of the Le Mans Hotel family.\n\n"
                            +
                            "With your account, you can now:\n" +
                            "- Browse and book our luxurious rooms\n" +
                            "- Explore our fine dining options\n" +
                            "- Manage your bookings effortlessly\n" +
                            "- Receive exclusive offers and updates\n\n" +
                            "If you have any questions or need assistance, our dedicated support team is always here to help.\n\n"
                            +
                            "We look forward to serving you!\n\n" +
                            "Best regards,\n" +
                            "The Le Mans Hotel Team\n" +
                            "Premium Luxury Since 1890",
                    saved.getName());
            emailService.sendEmail(saved.getEmail(), subject, body);
        } catch (Exception e) {
            // Log the error but don't fail registration if email fails
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }

        return ResponseEntity.ok("Registered: " + saved.getEmail());
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req) {
        authService.sendOtp(req.get("email"));
        return ResponseEntity.ok("OTP sent to email.");
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        boolean ok = authService.verifyOtpAndReset(
                req.get("email"),
                req.get("otp"),
                req.get("newPassword"));

        return ok ? ResponseEntity.ok("Password reset successful.")
                : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        String token = authService.login(req.getEmail(), req.getPassword());
        User user = authService.findByEmail(req.getEmail()).get();
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole().name()));
    }

}
