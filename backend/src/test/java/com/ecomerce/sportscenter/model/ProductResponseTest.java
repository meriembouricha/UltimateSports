package com.ecomerce.sportscenter.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ProductResponseTest {

    @Test
    void testProductResponseCreation() {
        // Test basic ProductResponse creation
        ProductResponse response = new ProductResponse();
        
        response.setId(1);
        response.setName("Test Product");
        response.setDescription("Test Description");
        response.setPrice(1000L);
        response.setPictureUrl("test.jpg");
        response.setProductQuantity(10);
        response.setProductBrand("Test Brand");
        response.setProductType("Test Type");
        
        assertNotNull(response);
        assertEquals(1, response.getId());
        assertEquals("Test Product", response.getName());
        assertEquals("Test Description", response.getDescription());
        assertEquals(1000L, response.getPrice());
        assertEquals("test.jpg", response.getPictureUrl());
        assertEquals(10, response.getProductQuantity());
        assertEquals("Test Brand", response.getProductBrand());
        assertEquals("Test Type", response.getProductType());
    }

    @Test
    void testProductResponseWithNullValues() {
        // Test ProductResponse with null values
        ProductResponse response = new ProductResponse();
        
        assertNotNull(response);
        assertNull(response.getId());
        assertNull(response.getName());
        assertNull(response.getDescription());
        assertNull(response.getPrice());
        assertNull(response.getPictureUrl());
        assertNull(response.getProductQuantity());
        assertNull(response.getProductBrand());
        assertNull(response.getProductType());
    }

    @Test
    void testProductResponseEquality() {
        // Test equals and hashCode
        ProductResponse response1 = new ProductResponse();
        response1.setId(1);
        response1.setName("Test Product");
        response1.setPrice(1000L);
        
        ProductResponse response2 = new ProductResponse();
        response2.setId(1);
        response2.setName("Test Product");
        response2.setPrice(1000L);
        
        assertEquals(response1, response2);
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testProductResponseBuilder() {
        // Test builder pattern
        ProductResponse response = ProductResponse.builder()
                .id(1)
                .name("Test Product")
                .description("Test Description")
                .price(1000L)
                .pictureUrl("test.jpg")
                .productQuantity(10)
                .productBrand("Test Brand")
                .productType("Test Type")
                .build();

        assertNotNull(response);
        assertEquals(1, response.getId());
        assertEquals("Test Product", response.getName());
        assertEquals("Test Description", response.getDescription());
        assertEquals(1000L, response.getPrice());
        assertEquals("test.jpg", response.getPictureUrl());
        assertEquals(10, response.getProductQuantity());
        assertEquals("Test Brand", response.getProductBrand());
        assertEquals("Test Type", response.getProductType());
    }

    @Test
    void testVariantInnerClass() {
        // Test Variant inner class
        ProductResponse.Variant variant = ProductResponse.Variant.builder()
                .id(1L)
                .size("M")
                .color("Red")
                .stock(5)
                .pictureUrl("variant.jpg")
                .build();

        assertNotNull(variant);
        assertEquals(1L, variant.getId());
        assertEquals("M", variant.getSize());
        assertEquals("Red", variant.getColor());
        assertEquals(5, variant.getStock());
        assertEquals("variant.jpg", variant.getPictureUrl());
    }

    @Test
    void testVariantWithNoArgsConstructor() {
        // Test Variant default constructor
        ProductResponse.Variant variant = new ProductResponse.Variant();
        
        assertNotNull(variant);
        assertNull(variant.getId());
        assertNull(variant.getSize());
        assertNull(variant.getColor());
        assertNull(variant.getStock());
        assertNull(variant.getPictureUrl());
    }
}
