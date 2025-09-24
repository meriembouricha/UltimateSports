package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.entity.Product;
import com.ecomerce.sportscenter.exceptions.ProductNotFoundException;
import com.ecomerce.sportscenter.model.ProductResponse;
import com.ecomerce.sportscenter.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        log.info("Fetching Product by Id: {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product with given id doesn't exist"));
        ProductResponse response = mapToProductResponse(product);
        log.info("Fetched Product by Id: {}", productId);
        return response;
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable pageable) {
        log.info("Fetching products");
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductResponse> responses = productPage.map(this::mapToProductResponse);
        log.info("Fetched all products");
        return responses;
    }

    @Override
    public List<ProductResponse> searchProductsByName(String keyword) {
        log.info("Searching product(s) by name: {}", keyword);
        List<Product> products = productRepository.searchByName(keyword);
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProductsByBrand(Integer brandId) {
        log.info("Searching product(s) by brandId: {}", brandId);
        List<Product> products = productRepository.searchByBrand(brandId);
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProductsByType(Integer typeId) {
        log.info("Searching product(s) by typeId: {}", typeId);
        List<Product> products = productRepository.searchByType(typeId);
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProductsByBrandAndType(Integer brandId, Integer typeId) {
        log.info("Searching product(s) by brandId {}, and typeId: {}", brandId, typeId);
        List<Product> products = productRepository.searchByBrandAndType(brandId, typeId);
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProductsByBrandTypeAndName(Integer brandId, Integer typeId, String keyword) {
        log.info("Searching product(s) by brandId {}, typeId:{} and keyword {}", brandId, typeId, keyword);
        List<Product> products = productRepository.searchByBrandTypeAndName(brandId, typeId, keyword);
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse createProduct(Product product) {
        if (product.getVariants() != null) {
            product.getVariants().forEach(v -> v.setProduct(product));
        }
        Product saved = productRepository.save(product);
        return mapToProductResponse(saved);
    }

    @Override
    public ProductResponse updateProduct(Integer id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setPictureUrl(updatedProduct.getPictureUrl());
        existing.setQunatity(updatedProduct.getQunatity());
        existing.setBrand(updatedProduct.getBrand());
        existing.setType(updatedProduct.getType());

        // Clear old variants and add new ones
        existing.getVariants().clear();
        if (updatedProduct.getVariants() != null) {
            updatedProduct.getVariants().forEach(v -> v.setProduct(existing));
            existing.getVariants().addAll(updatedProduct.getVariants());
        }

        Product saved = productRepository.save(existing);
        return mapToProductResponse(saved);
    }

    @Override
    public void deleteProduct(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        productRepository.delete(product);
    }

    @Override
    public void incrementQuantity(Integer productId, Integer amount) {
        log.info("Incrementing product {} quantity by {}", productId, amount);
        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Product not found");
        }
        productRepository.incrementProductQuantity(productId, amount);
    }

    @Override
    public void decrementQuantity(Integer productId, Integer amount) {
        log.info("Decrementing product {} quantity by {}", productId, amount);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        if (product.getQunatity() < amount) {
            throw new IllegalArgumentException("Not enough quantity in stock");
        }
        productRepository.decrementProductQuantity(productId, amount);
    }

    // ------------------- Mapping utility -------------------
    private ProductResponse mapToProductResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setPictureUrl(product.getPictureUrl());
        response.setProductBrand(product.getBrand() != null ? product.getBrand().getName() : "Unknown");
        response.setProductType(product.getType() != null ? product.getType().getName() : "Unknown");
        response.setProductQuantity(product.getQunatity());

        if (product.getVariants() != null) {
            response.setVariants(product.getVariants().stream().map(v -> {
                ProductResponse.Variant var = new ProductResponse.Variant();
                var.setId(v.getId());
                var.setSize(v.getSize());
                var.setColor(v.getColor());
                var.setStock(v.getStock());
                var.setPictureUrl(v.getPictureUrl()); // <-- ici
                return var;
            }).toList());
        }
        return response;
    }
}
