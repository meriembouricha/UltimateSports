package com.ecomerce.sportscenter.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Set;
import java.util.HashSet;

class AppUserTest {

    @Test
    void testAppUserCreation() {
        // Test basic user creation
        Set<Roles> roles = new HashSet<>();
        roles.add(Roles.USER);
        
        AppUser user = AppUser.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password123")
                .roles(roles)
                .enabled(true)
                .build();

        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertTrue(user.isEnabled());
        assertTrue(user.getRoles().contains(Roles.USER));
    }

    @Test
    void testAppUserWithNoArgsConstructor() {
        // Test default constructor
        AppUser user = new AppUser();
        
        assertNotNull(user);
        assertNull(user.getUsername());
        assertNull(user.getEmail());
        assertNull(user.getPassword());
        assertNull(user.getRoles());
        assertTrue(user.isEnabled()); // Default should be true
    }

    @Test
    void testAppUserSettersAndGetters() {
        // Test setters and getters
        AppUser user = new AppUser();
        Set<Roles> roles = new HashSet<>();
        roles.add(Roles.ADMIN);
        
        user.setId(1L);
        user.setUsername("admin");
        user.setEmail("admin@example.com");
        user.setPassword("admin123");
        user.setRoles(roles);
        user.setEnabled(true);
        
        assertEquals(1L, user.getId());
        assertEquals("admin", user.getUsername());
        assertEquals("admin@example.com", user.getEmail());
        assertEquals("admin123", user.getPassword());
        assertTrue(user.getRoles().contains(Roles.ADMIN));
        assertTrue(user.isEnabled());
    }

    @Test
    void testAppUserWithMultipleRoles() {
        // Test user with multiple roles
        Set<Roles> roles = new HashSet<>();
        roles.add(Roles.USER);
        roles.add(Roles.ADMIN);
        
        AppUser user = AppUser.builder()
                .username("superuser")
                .email("super@example.com")
                .password("super123")
                .roles(roles)
                .enabled(true)
                .build();

        assertNotNull(user);
        assertEquals(2, user.getRoles().size());
        assertTrue(user.getRoles().contains(Roles.USER));
        assertTrue(user.getRoles().contains(Roles.ADMIN));
    }
}
