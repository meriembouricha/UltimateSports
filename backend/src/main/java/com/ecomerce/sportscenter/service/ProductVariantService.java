package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.entity.ProductVariant;
import com.ecomerce.sportscenter.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductVariantService {
    private final ProductVariantRepository variantRepository;

    public List<ProductVariant> getAllVariants() {
        return variantRepository.findAll();
    }

    public List<ProductVariant> getVariantsByProductId(Long productId) {
        return variantRepository.findByProductId(productId);
    }

    public ProductVariant saveVariant(ProductVariant variant) {
        return variantRepository.save(variant);
    }

    public void deleteVariant(Long id) {
        variantRepository.deleteById(id);
    }
}