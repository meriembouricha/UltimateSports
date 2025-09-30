package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.entity.DeliveryStatus;
import com.ecomerce.sportscenter.model.OrderResponse;
import com.ecomerce.sportscenter.model.dto.DeliveryStatusSummaryDTO;
import com.ecomerce.sportscenter.repository.OrderRepository;
import com.ecomerce.sportscenter.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/{orderId}/status")
//    @PreAuthorize("hasRole('LIVREUR')")
    public void updateDeliveryStatus(@PathVariable Long orderId, @RequestParam DeliveryStatus status) {
        orderService.updateDeliveryStatus(orderId, status);
    }
    @GetMapping("/orders-summary")
    public List<DeliveryStatusSummaryDTO> getOrdersSummary() {
        return orderRepository.getOrdersSummaryByStatus();
    }

}
