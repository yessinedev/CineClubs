package com.tuniclubs.app.dto;

import com.tuniclubs.app.models.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int joinedClubsCount;
    private int postsCount;
    private int commentsCount;
    private int likedPostsCount;
    private int likedCommentsCount;
    private List<PostDTO> posts;
    private List<ClubDTO> joinedClubs;

    // Default constructor
    public UserDTO() {
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getPostsCount() {
        return postsCount;
    }

    public void setPostsCount(int postsCount) {
        this.postsCount = postsCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public int getLikedPostsCount() {
        return likedPostsCount;
    }

    public void setLikedPostsCount(int likedPostsCount) {
        this.likedPostsCount = likedPostsCount;
    }

    public int getLikedCommentsCount() {
        return likedCommentsCount;
    }

    public void setLikedCommentsCount(int likedCommentsCount) {
        this.likedCommentsCount = likedCommentsCount;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostDTO> posts) {
        this.posts = posts;
    }

    public int getJoinedClubsCount() {
        return joinedClubsCount;
    }

    public void setJoinedClubsCount(int joinedClubsCount) {
        this.joinedClubsCount = joinedClubsCount;
    }

    public List<ClubDTO> getJoinedClubs() {
        return joinedClubs;
    }

    public void setJoinedClubs(List<ClubDTO> joinedClubs) {
        this.joinedClubs = joinedClubs;
    }
}