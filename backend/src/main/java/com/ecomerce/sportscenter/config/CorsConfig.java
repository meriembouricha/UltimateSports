package com.ecomerce.sportscenter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tous les endpoints
                .allowedOrigins(
                    "http://localhost:4200", 
                    "http://localhost", 
                    "http://138.68.114.34",
                    "http://138.68.114.34:80",
                    "https://138.68.114.34",
                    "*"
                ) // Angular dev + prod + production + wildcard for troubleshooting
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*") // Tous les headers
                .allowCredentials(true)
                .maxAge(3600); // Cache du preflight request (1h)
    }
}
