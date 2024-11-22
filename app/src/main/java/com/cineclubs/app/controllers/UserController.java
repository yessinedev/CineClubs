package com.cineclubs.app.controllers;


import com.cineclubs.app.models.User;
import com.cineclubs.app.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> createOrUpdateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createOrUpdateUser(user));
    }

    @GetMapping("/{clerkId}")
    public ResponseEntity<User> getUserByClerkId(@PathVariable String clerkId) {
        return ResponseEntity.ok(userService.getUserByClerkId(clerkId));
    }
}
