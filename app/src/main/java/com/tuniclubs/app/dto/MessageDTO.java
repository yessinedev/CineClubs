package com.tuniclubs.app.dto;

import com.tuniclubs.app.mapper.UserMapper;
import com.tuniclubs.app.models.Message;
import java.time.LocalDateTime;

public class MessageDTO {
    private Long id;
    private String content;
    private UserDTO sender;
    private Long clubId;
    private LocalDateTime createdAt;

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.content = message.getContent();
        this.sender = UserMapper.toUserDTO(message.getSender());
        this.clubId = message.getClub().getId();
        this.createdAt = message.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 