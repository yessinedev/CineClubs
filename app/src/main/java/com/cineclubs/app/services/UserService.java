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
        } else {
            User existingUser = getUserByUserId(user.getuserId());
            user.setPosts(existingUser.getPosts());
            user.setComments(existingUser.getComments());
            user.setLikedPosts(existingUser.getLikedPosts());
            user.setLikedComments(existingUser.getLikedComments());
        }

        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser);
    }

    public UserDTO getUserDTO(String userId, boolean includePosts, boolean includeJoinedClubs) {
        User user = getUserByUserId(userId);
        return new UserDTO(user, includePosts, includeJoinedClubs);
    }

    public User getUserByUserId(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
