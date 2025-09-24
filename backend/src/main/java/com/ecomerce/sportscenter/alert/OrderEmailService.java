package com.ecomerce.sportscenter.alert;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ecomerce.sportscenter.entity.Order;

@Service
@RequiredArgsConstructor
public class OrderEmailService {

    private final JavaMailSender mailSender;

    public void sendOrderStatusUpdate(Order order) {
        String to = order.getUser().getEmail();
        String subject = "Mise à jour de votre commande #" + order.getId();
        String content = "Bonjour " + order.getUser().getUsername() + ",\n\n"
                + "Le statut de votre commande est désormais : " + order.getDeliveryStatus() + ".\n"
                + "Montant total : " + order.getTotalAmount() + " DT\n\n"
                + "Merci pour votre confiance.\nCordialement,\nSportsCenter";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }
}
