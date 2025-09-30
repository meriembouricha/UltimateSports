package com.ecomerce.sportscenter.config;

import com.ecomerce.sportscenter.Security.JwtAuthenticationEntryPoint;
import com.ecomerce.sportscenter.Security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint entryPoint;
    private final JwtAuthenticationFilter filter;
    private final AuthService authService;
    private final CorsConfigurationSource corsConfigurationSource;
    
    public SecurityConfig(JwtAuthenticationEntryPoint entryPoint, 
                         @Lazy JwtAuthenticationFilter filter, 
                         @Lazy AuthService authService,
                         CorsConfigurationSource corsConfigurationSource) {
        this.entryPoint = entryPoint;
        this.filter = filter;
        this.authService = authService;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF as we're using JWT tokens
            .csrf(AbstractHttpConfigurer::disable)
            
            // Enable CORS with our custom configuration
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // Configure authorization rules
            .authorizeHttpRequests((requests) -> requests
                // Allow all OPTIONS requests (CORS preflight)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // Public authentication endpoints
                .requestMatchers("/auth/login", "/auth/signup").permitAll()
                
                // Public API endpoints
                .requestMatchers("/api/**").permitAll()
                
                // Public product and store endpoints
                .requestMatchers("/products/**", "/store/**").permitAll()
                
                // Actuator health endpoint for Kubernetes health checks
                .requestMatchers("/actuator/health").permitAll()
                
                // Role-based access
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("USER")
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Configure exception handling
            .exceptionHandling(ex -> ex.authenticationEntryPoint(entryPoint))
            
            // Configure session management (stateless for JWT)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Add JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(authService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Collections.singletonList("*")); // Allow any host
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
