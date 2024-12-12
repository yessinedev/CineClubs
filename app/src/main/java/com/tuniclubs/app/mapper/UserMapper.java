package com.tuniclubs.app.mapper;

import com.tuniclubs.app.dto.ClubDTO;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.dto.UserDTO;
import com.tuniclubs.app.models.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        return toUserDTO(user, false, false);
    }

    public static UserDTO toUserDTO(User user, boolean includePosts, boolean includeClubs) {
        UserDTO userDTO = new UserDTO();

        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setImageUrl(user.getImageUrl());
        userDTO.setUsername(user.getUsername());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setJoinedClubsCount(user.getJoinedClubs() != null ? user.getJoinedClubs().size() : 0);
        userDTO.setPostsCount(user.getPosts() != null ? user.getPosts().size() : 0);
        userDTO.setCommentsCount(user.getComments() != null ? user.getComments().size() : 0);
        userDTO.setLikedPostsCount(user.getLikedPosts() != null ? user.getLikedPosts().size() : 0);
        userDTO.setLikedCommentsCount(user.getLikedComments() != null ? user.getLikedComments().size() : 0);

        if (includePosts && user.getPosts() != null) {
            userDTO.setPosts(user.getPosts().stream()
                    .map(PostDTO::new)
                    .collect(Collectors.toList()));
        }

        if (includeClubs && user.getJoinedClubs() != null) {
            userDTO.setJoinedClubs(user.getJoinedClubs().stream()
                    .map(ClubMapper::toClubDTO)
                    .collect(Collectors.toList()));
        }

        return userDTO;
    }

    public static UserDTO toUserDTO(User user, Long clubId) {
        UserDTO userDTO = new UserDTO();

        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setImageUrl(user.getImageUrl());
        userDTO.setUsername(user.getUsername());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setJoinedClubsCount(user.getJoinedClubs() != null ? user.getJoinedClubs().size() : 0);
        userDTO.setPostsCount(user.getPosts() != null ? (int) user.getPosts().stream()
                .filter(post -> post.getClub().getId().equals(clubId)).count() : 0);
        userDTO.setCommentsCount(user.getComments() != null ? user.getComments().size() : 0);
        userDTO.setLikedPostsCount(user.getLikedPosts() != null ? user.getLikedPosts().size() : 0);
        userDTO.setLikedCommentsCount(user.getLikedComments() != null ? user.getLikedComments().size() : 0);

        return userDTO;
    }
}
