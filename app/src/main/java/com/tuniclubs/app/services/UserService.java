package com.tuniclubs.app.services;

import com.tuniclubs.app.dto.UserDTO;
import com.tuniclubs.app.mapper.UserMapper;
import com.tuniclubs.app.models.User;
import com.tuniclubs.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createOrUpdateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());

        if (!userRepository.existsByUserId(user.getUserId())) {
            user.setCreatedAt(LocalDateTime.now());
        } else {
            User existingUser = getUserByUserId(user.getUserId());
            if (existingUser.getImageUrl() != null && !existingUser.getImageUrl().contains("clerk.com")) {
                user.setImageUrl(existingUser.getImageUrl());
            }
            user.setPosts(existingUser.getPosts());
            user.setComments(existingUser.getComments());
            user.setLikedPosts(existingUser.getLikedPosts());
            user.setLikedComments(existingUser.getLikedComments());
        }

        User savedUser = userRepository.save(user);
        return UserMapper.toUserDTO(savedUser);
    }

    public UserDTO getUserDTO(String userId, boolean includePosts, boolean includeJoinedClubs) {
        User user = getUserByUserId(userId);
        return UserMapper.toUserDTO(user, includePosts, includeJoinedClubs);
    }

    public User getUserByUserId(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO updateProfilePicture(String userId, String imageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        String cleanImageUrl = imageUrl.replace("\"", "");
        user.setImageUrl(cleanImageUrl);
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserDTO(updatedUser);
    }

    public List<UserDTO> quickSearchUsers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        Pageable limit = PageRequest.of(0, 4); // Limit to 4 results
        return userRepository.quickSearchUsers(query.trim(), limit).stream()
                .map(UserMapper::toUserDTO)
                .toList();
    }

    public List<UserDTO> searchUsers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        return userRepository.searchUsers(query.trim()).stream()
                .map(UserMapper::toUserDTO)
                .toList();
    }
}
