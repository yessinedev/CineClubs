package com.cineclubs.app.controllers;

import com.cineclubs.app.dto.UserDTO;
import com.cineclubs.app.models.User;
import com.cineclubs.app.services.UserService;
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
    public ResponseEntity<UserDTO> getUserByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserDTOByUserId(userId));
    }

    @GetMapping("/{userId}/with-posts")
    public ResponseEntity<UserDTO> getUserWithPosts(
            @PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserDTOWithPostsByUserId(userId));
    }
}
