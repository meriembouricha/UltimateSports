package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.entity.AppUser;
import com.ecomerce.sportscenter.model.dto.UserActivityDTO;
import com.ecomerce.sportscenter.repository.UserActivityLogRepository;
import com.ecomerce.sportscenter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    UserActivityLogRepository logRepository;

    // Récupérer tous les utilisateurs
    @GetMapping
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // Récupérer un utilisateur par son nom d'utilisateur
    @GetMapping("/{username}")
    public AppUser getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    // Vérifier si l'utilisateur existe par son nom d'utilisateur
    @GetMapping("/exists/{username}")
    public boolean userExists(@PathVariable String username) {
        return userService.userExistsByUsername(username);
    }

    // Créer un nouvel utilisateur
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppUser createUser(@RequestBody AppUser user) {
        return userService.saveUser(user);
    }

    // Mettre à jour un utilisateur
    @PutMapping("/{username}")
    public AppUser updateUser(@PathVariable String username, @RequestBody AppUser user) {
        user.setUsername(username);
        return userService.saveUser(user);
    }
    // UserController.java
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build(); // 204: No Content, succès de suppression
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // 404: Not Found, si l'utilisateur n'est pas trouvé
        }
    }

    @PutMapping("/deactivate/{id}")
    public AppUser deactivateUser(@PathVariable Long id) {
        return userService.deactivateUser(id);
    }

    @PutMapping("/activate/{id}")
    public AppUser activateUser(@PathVariable Long id) {
        return userService.activateUser(id);
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = userService.userExistsByUsername(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    // PARTIE BI :
    @GetMapping("/user-activity")
    public List<UserActivityDTO> getUserActivity(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return logRepository.findUserActivityWithUsername(start, end);
    }
}
