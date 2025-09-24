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
        response.setQuantity(10);
        response.setBrandName("Test Brand");
        response.setTypeName("Test Type");
        
        assertNotNull(response);
        assertEquals(1, response.getId());
        assertEquals("Test Product", response.getName());
        assertEquals("Test Description", response.getDescription());
        assertEquals(1000L, response.getPrice());
        assertEquals("test.jpg", response.getPictureUrl());
        assertEquals(10, response.getQuantity());
        assertEquals("Test Brand", response.getBrandName());
        assertEquals("Test Type", response.getTypeName());
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
        assertNull(response.getQuantity());
        assertNull(response.getBrandName());
        assertNull(response.getTypeName());
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
}
