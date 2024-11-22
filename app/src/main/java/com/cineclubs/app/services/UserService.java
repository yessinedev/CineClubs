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

        if (!userRepository.existsByUserId(user.getuserId())) {
            user.setCreatedAt(LocalDateTime.now());
        }

        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser);
    }

    public UserDTO getUserDTOByUserId(String userId) {
        User user = getUserByUserId(userId);
        return new UserDTO(user);
    }

    public UserDTO getUserDTOWithPostsByUserId(String userId) {
        User user = getUserByUserId(userId);
        return new UserDTO(user, true);
    }

    public User getUserByUserId(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
