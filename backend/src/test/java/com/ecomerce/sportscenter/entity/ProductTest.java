package com.ecomerce.sportscenter.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    void testProductCreation() {
        // Test basic product creation
        Product product = Product.builder()
                .name("Test Product")
                .description("Test Description")
                .price(1000L)
                .pictureUrl("test.jpg")
                .qunatity(10)
                .build();

        assertNotNull(product);
        assertEquals("Test Product", product.getName());
        assertEquals("Test Description", product.getDescription());
        assertEquals(1000L, product.getPrice());
        assertEquals("test.jpg", product.getPictureUrl());
        assertEquals(10, product.getQunatity());
    }

    @Test
    void testProductWithNoArgsConstructor() {
        // Test default constructor
        Product product = new Product();
        
        assertNotNull(product);
        assertNull(product.getName());
        assertNull(product.getDescription());
        assertNull(product.getPrice());
        assertNull(product.getPictureUrl());
        assertNull(product.getQunatity());
    }

    @Test
    void testProductSettersAndGetters() {
        // Test setters and getters
        Product product = new Product();
        
        product.setId(1);
        product.setName("Test Product");
        product.setDescription("Test Description");
        product.setPrice(2000L);
        product.setPictureUrl("test2.jpg");
        product.setQunatity(5);
        
        assertEquals(1, product.getId());
        assertEquals("Test Product", product.getName());
        assertEquals("Test Description", product.getDescription());
        assertEquals(2000L, product.getPrice());
        assertEquals("test2.jpg", product.getPictureUrl());
        assertEquals(5, product.getQunatity());
    }

    @Test
    void testProductEquality() {
        // Test equals and hashCode
        Product product1 = Product.builder()
                .name("Test Product")
                .price(1000L)
                .build();
                
        Product product2 = Product.builder()
                .name("Test Product")
                .price(1000L)
                .build();
        
        // Since we're using Lombok @Data, equals should work
        assertEquals(product1, product2);
        assertEquals(product1.hashCode(), product2.hashCode());
    }
}
