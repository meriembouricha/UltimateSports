package com.ecomerce.sportscenter.model.dto;

import com.ecomerce.sportscenter.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryStatusSummaryDTO {
    private DeliveryStatus deliveryStatus;
    private Long totalAmount;
}
