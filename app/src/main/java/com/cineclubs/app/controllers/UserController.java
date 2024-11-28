package com.cineclubs.app.controllers;

import com.cineclubs.app.dto.UserDTO;
import com.cineclubs.app.models.User;
import com.cineclubs.app.services.UserService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createOrUpdateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createOrUpdateUser(user));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeJoinedClubs) {
        return ResponseEntity.ok(userService.getUserDTO(userId, includePosts, includeJoinedClubs));
    }

    @PutMapping("/change/{userId}")
    public ResponseEntity<UserDTO> updateProfilePicture(
            @PathVariable String userId,
            @RequestBody String imageUrl) {
        try {
            UserDTO updatedUser = userService.updateProfilePicture(userId, imageUrl);
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
