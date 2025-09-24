package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.entity.AppUser;
import com.ecomerce.sportscenter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder; // à configurer dans SecurityConfig

    public boolean resetPassword(String email) {
        AppUser user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return false; // email n'existe pas
        }

        String newPassword = generateRandomPassword(8); // génère un mot de passe aléatoire de 8 caractères
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        sendEmail(email, "Réinitialisation de votre mot de passe",
                "Votre nouveau mot de passe est : " + newPassword);

        return true; // succès
    }

    private void sendEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }
}
