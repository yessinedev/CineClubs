package com.tuniclubs.app.dto;

import com.tuniclubs.app.enums.ClubRole;
import com.tuniclubs.app.enums.MemberStatus;

import java.time.LocalDateTime;

public class ClubMemberDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String userId; // Only include the ID to avoid exposing the entire User entity
    private Long clubId; // Only include the ID to avoid exposing the entire Club entity
    private MemberStatus status;
    private ClubRole role;
    private int postsCount;
    private LocalDateTime joinedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ClubMemberDTO() {}




    public ClubMemberDTO(Long id, String userId, Long clubId, String name, String imageUrl, MemberStatus status, ClubRole role, int postsCount,
                         LocalDateTime joinedAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.clubId = clubId;
        this.status = status;
        this.role = role;
        this.name = name;
        this.imageUrl = imageUrl;
        this.postsCount = postsCount;
        this.joinedAt = joinedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public MemberStatus getStatus() {
        return status;
    }

    public void setStatus(MemberStatus status) {
        this.status = status;
    }

    public ClubRole getRole() {
        return role;
    }

    public void setRole(ClubRole role) {
        this.role = role;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
