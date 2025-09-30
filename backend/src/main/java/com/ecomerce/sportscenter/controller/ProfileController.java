package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.config.AuthService;
import com.ecomerce.sportscenter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth/profile")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProfileController {

    private final AuthService userService; // service gérant les utilisateurs

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> passwords) {

        String username = passwords.get("username");
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");

        boolean success = userService.changePassword(username, oldPassword, newPassword);

        if (!success) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Mot de passe actuel incorrect"));
        }

        return ResponseEntity.ok(Map.of("message", "Mot de passe changé avec succès"));
    }
}
