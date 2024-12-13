package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.UserDTO;
import com.tuniclubs.app.models.User;
import com.tuniclubs.app.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Create User")
    @PostMapping
    public ResponseEntity<UserDTO> createOrUpdateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createOrUpdateUser(user));
    }
    @Operation(summary = "Fetch One User")
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeJoinedClubs) {
        return ResponseEntity.ok(userService.getUserDTO(userId, includePosts, includeJoinedClubs));
    }
    @Operation(summary = "Update user Profile Picture")
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
    @Operation(summary = "Search Users: Return the first 4 matches")
    @GetMapping("/quick-search")
    public ResponseEntity<List<UserDTO>> quickSearchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.quickSearchUsers(query));
    }
    @Operation(summary = "Search Users: Return all matches")
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }
}
