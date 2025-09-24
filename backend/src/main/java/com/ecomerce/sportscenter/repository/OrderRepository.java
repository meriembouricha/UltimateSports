package com.ecomerce.sportscenter.repository;

import com.ecomerce.sportscenter.entity.Order;
import com.ecomerce.sportscenter.model.dto.DeliveryStatusSummaryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT new com.ecomerce.sportscenter.model.dto.DeliveryStatusSummaryDTO(o.deliveryStatus, SUM(o.totalAmount)) " +
            "FROM Order o GROUP BY o.deliveryStatus")
    List<DeliveryStatusSummaryDTO> getOrdersSummaryByStatus();

}
