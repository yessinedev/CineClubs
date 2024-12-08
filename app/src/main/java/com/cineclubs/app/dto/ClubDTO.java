package com.cineclubs.app.dto;

import com.cineclubs.app.models.Club;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ClubDTO {
    private Long id;
    private String name;
    private String description;
    private boolean isPublic;
    private String imageUrl;
    private String ownerId;
    private String ownerUsername;
    private String ownerImageUrl;
    private int membersCount;
    private int postsCount;
    private CategoryDTO category;
    private List<PostDTO> posts;
    private List<ClubMemberDTO> members;
    private String slug;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ClubDTO(Club club) {
        this(club, false, false);
    }

    public ClubDTO(Club club, boolean includePosts, boolean includeMembers) {
        this.id = club.getId();
        this.name = club.getName();
        this.description = club.getDescription();
        this.imageUrl = club.getImageUrl();
        this.ownerId = club.getUser().getUserId();
        this.ownerUsername = club.getUser().getUsername();
        this.ownerImageUrl = club.getUser().getImageUrl();
        this.membersCount = club.getMembers() != null ? club.getMembers().size() : 0;
        this.postsCount = club.getPosts() != null ? club.getPosts().size() : 0;
        this.slug = club.getSlug();
        this.isPublic = club.isPublic();
        this.category = new CategoryDTO(club.getCategory());
        this.createdAt = club.getCreatedAt();
        this.updatedAt = club.getUpdatedAt();

        if (includePosts && club.getPosts() != null) {
            this.posts = club.getPosts().stream()
                    .map(PostDTO::new)
                    .collect(Collectors.toList());
        }

        if (includeMembers && club.getMembers() != null) {
            this.members = club.getMembers().stream()
                    .map(member -> new ClubMemberDTO(
                            member.getId(),
                            member.getUser().getUserId(),
                            club.getId(),
                            member.getUser().getUsername(),
                            member.getUser().getImageUrl(),
                            member.getStatus(),
                            member.getRole(),
                            club.getPosts() != null ? (int) club.getPosts().stream()
                                    .filter(post -> post.getAuthor().getUserId().equals(member.getUser().getUserId()))
                                    .count() : 0,
                            member.getJoinedAt(),
                            member.getCreatedAt(),
                            member.getUpdatedAt()
                    ))
                    .sorted(Comparator.comparing(ClubMemberDTO::getJoinedAt, Comparator.nullsLast(Comparator.naturalOrder())))
                    .collect(Collectors.toList());
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getOwnerImageUrl() {
        return ownerImageUrl;
    }

    public void setOwnerImageUrl(String ownerImageUrl) {
        this.ownerImageUrl = ownerImageUrl;
    }

    public int getMembersCount() {
        return membersCount;
    }

    public void setMembersCount(int membersCount) {
        this.membersCount = membersCount;
    }

    public int getPostsCount() {
        return postsCount;
    }

    public void setPostsCount(int postsCount) {
        this.postsCount = postsCount;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostDTO> posts) {
        this.posts = posts;
    }

    public List<ClubMemberDTO> getMembers() {
        return members;
    }

    public void setMembers(List<ClubMemberDTO> members) {
        this.members = members;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
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
}