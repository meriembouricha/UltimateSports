package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.entity.ProductVariant;
import com.ecomerce.sportscenter.service.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService variantService;

    @GetMapping
    public List<ProductVariant> getAllVariants() {
        return variantService.getAllVariants();
    }

    @GetMapping("/product/{productId}")
    public List<ProductVariant> getVariantsByProduct(@PathVariable Long productId) {
        return variantService.getVariantsByProductId(productId);
    }

    @PostMapping
    public ProductVariant createVariant(@RequestBody ProductVariant variant) {
        return variantService.saveVariant(variant);
    }

    @DeleteMapping("/{id}")
    public void deleteVariant(@PathVariable Long id) {
        variantService.deleteVariant(id);
    }
}
