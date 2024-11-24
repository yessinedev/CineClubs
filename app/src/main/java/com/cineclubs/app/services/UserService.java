package com.cineclubs.app.services;

import com.cineclubs.app.dto.UserDTO;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createOrUpdateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());

        if (!userRepository.existsByClerkId(user.getClerkId())) {
            user.setCreatedAt(LocalDateTime.now());
        }

        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser);
    }

    public UserDTO getUserDTOByClerkId(String clerkId) {
        User user = getUserByClerkId(clerkId);
        return new UserDTO(user);
    }

    public UserDTO getUserDTOWithPostsByClerkId(String clerkId) {
        User user = getUserByClerkId(clerkId);
        return new UserDTO(user, true);
    }

    public User getUserByClerkId(String clerkId) {
        return userRepository.findById(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
