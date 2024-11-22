package com.cineclubs.app.services;

import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createOrUpdateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());

        if (!userRepository.existsByClerkId(user.getClerkId())) {
            user.setCreatedAt(LocalDateTime.now());
        }

        return userRepository.save(user);
    }

    public User getUserByClerkId(String clerkId) {
        return userRepository.findById(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
