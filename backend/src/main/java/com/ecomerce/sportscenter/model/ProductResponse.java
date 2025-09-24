package com.ecomerce.sportscenter.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private String productType;
    private String productBrand;
    private Integer productQuantity;

    private List<Variant> variants; // <-- Ajouter les variantes

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Variant {
        private Long id;
        private String size;
        private String color;
        private Integer stock;
        private String pictureUrl;
    }
}
