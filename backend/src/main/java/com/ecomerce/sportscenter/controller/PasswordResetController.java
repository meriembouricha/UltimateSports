package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/password")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        boolean success = passwordResetService.resetPassword(email);
        if (!success) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email non trouvé"));
        }
        return ResponseEntity.ok(Map.of("message", "Un nouveau mot de passe a été envoyé à votre email"));
    }
}
