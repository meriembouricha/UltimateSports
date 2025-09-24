package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.model.ProductResponse;
import com.ecomerce.sportscenter.service.ProductService;
import com.ecomerce.sportscenter.service.BrandService;
import com.ecomerce.sportscenter.service.TypeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private ProductService productService;

    @Mock
    private BrandService brandService;

    @Mock
    private TypeService typeService;

    @InjectMocks
    private ProductController productController;

    @Test
    void testGetProductById() {
        // Given
        Integer productId = 1;
        ProductResponse expectedResponse = new ProductResponse();
        expectedResponse.setId(productId);
        expectedResponse.setName("Test Product");
        expectedResponse.setPrice(1000L);

        when(productService.getProductById(productId)).thenReturn(expectedResponse);

        // When
        ResponseEntity<ProductResponse> response = productController.getProductById(productId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(productId, response.getBody().getId());
        assertEquals("Test Product", response.getBody().getName());
        assertEquals(1000L, response.getBody().getPrice());

        verify(productService, times(1)).getProductById(productId);
    }

    @Test
    void testSearchProducts() {
        // Given
        String keyword = "test";
        List<ProductResponse> expectedProducts = Arrays.asList(
                createProductResponse(1, "Test Product 1"),
                createProductResponse(2, "Test Product 2")
        );

        when(productService.searchProductsByName(keyword)).thenReturn(expectedProducts);

        // When
        ResponseEntity<List<ProductResponse>> response = productController.searchProducts(keyword);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("Test Product 1", response.getBody().get(0).getName());
        assertEquals("Test Product 2", response.getBody().get(1).getName());

        verify(productService, times(1)).searchProductsByName(keyword);
    }

    private ProductResponse createProductResponse(Integer id, String name) {
        ProductResponse response = new ProductResponse();
        response.setId(id);
        response.setName(name);
        response.setPrice(1000L);
        return response;
    }
}
