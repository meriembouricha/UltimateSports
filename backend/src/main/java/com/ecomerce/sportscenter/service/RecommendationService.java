package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.model.ProductResponse;
import com.ecomerce.sportscenter.model.RecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final RestTemplate restTemplate;
    private final ProductService productService;
    private final String recommendationBaseUrl;

    @Autowired
    public RecommendationService(RestTemplate restTemplate,
                                 ProductService productService,
                                 @Value("${recommendation.service.url}") String recommendationBaseUrl) {
        this.restTemplate = restTemplate;
        this.productService = productService;
        this.recommendationBaseUrl = recommendationBaseUrl;
    }

    public List<ProductResponse> fetchRecommendedProducts(Long userId) {
        try {
            String url = recommendationBaseUrl + "/" + userId;
            System.out.println("Calling recommendation service at: " + url);
            
            RecommendationResponse response = restTemplate.getForObject(url, RecommendationResponse.class);

            if (response != null && response.getRecommendations() != null) {
                System.out.println("Received " + response.getRecommendations().length + " recommendations for user " + userId);
                List<ProductResponse> recProducts = Arrays.stream(response.getRecommendations())
                        .map(productId -> productService.getProductById(productId.intValue()))
                        .collect(Collectors.toList());
                return recProducts;
            } else {
                System.out.println("No recommendations received for user " + userId);
            }
        } catch (Exception e) {
            System.err.println("Recommendation service unavailable for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
        }

        // Retourne une liste vide si le service échoue
        return List.of();
    }
}
