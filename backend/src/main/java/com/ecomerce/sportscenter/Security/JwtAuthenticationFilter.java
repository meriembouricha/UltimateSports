package com.ecomerce.sportscenter.Security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Lazy;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtHelper jwtHelper;
    private final UserDetailsService userDetailsService;

    // Define public endpoints that don't require JWT authentication
    private final List<String> publicEndpoints = Arrays.asList(
        "/auth/login",
        "/auth/signup", 
        "/api/",
        "/products/",
        "/store/",
        "/actuator/health"
    );

    public JwtAuthenticationFilter(JwtHelper jwtHelper, @Lazy UserDetailsService userDetailsService) {
        this.jwtHelper = jwtHelper;
        this.userDetailsService = userDetailsService;
    }

    private boolean isPublicEndpoint(String requestURI) {
        return publicEndpoints.stream().anyMatch(endpoint -> 
            requestURI.startsWith(endpoint) || requestURI.equals(endpoint.substring(0, endpoint.length() - 1))
        );
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String requestHeader = request.getHeader("Authorization");
        String requestURI = request.getRequestURI();
        
        log.info("Processing request: {} with header: {}", requestURI, requestHeader);
        
        // Skip JWT processing for public endpoints if no Authorization header is present
        if (requestHeader == null && isPublicEndpoint(requestURI)) {
            log.info("Skipping JWT filter for public endpoint: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        
        // Skip JWT processing for OPTIONS requests (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            log.info("Skipping JWT filter for OPTIONS request");
            filterChain.doFilter(request, response);
            return;
        }
        
        String userName = null;
        String token = null;
        
        if(requestHeader != null && requestHeader.startsWith("Bearer")){
            token = requestHeader.substring(7);
            try{
                userName = this.jwtHelper.getUserNameFromToken(token);
            } catch(IllegalArgumentException | ExpiredJwtException | MalformedJwtException e){
                log.info("JWT Token processing error: {}", e.getMessage());
            }
        } else if (requestHeader != null) {
            log.warn("JWT token doesn't begin with Bearer String");
        }
        
        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
            // fetch user details
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);
            Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
            if(validateToken){
                // set the authentication
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.info("Authentication set for user: {}", userName);
            } else {
                log.info("Token validation failed for user: {}", userName);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
