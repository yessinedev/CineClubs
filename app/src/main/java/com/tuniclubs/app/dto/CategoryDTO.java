package com.tuniclubs.app.dto;

import com.tuniclubs.app.models.Category;

import java.time.LocalDateTime;

public class CategoryDTO {
    private Long id;
    private String name;
    private int clubsCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public CategoryDTO() {}

    // Constructor with fields
    public CategoryDTO(Category category) {
        id = category.getId();
        name = category.getName();
        clubsCount = category.getClubs() != null ? category.getClubs().size() : 0;
        createdAt = category.getCreatedAt();
        updatedAt = category.getUpdatedAt();
    }

    // Getters and setters
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

    public int getClubsCount() {
        return clubsCount;
    }

    public void setClubsCount(int clubsCount) {
        this.clubsCount = clubsCount;
    }
}
