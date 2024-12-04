package com.cineclubs.app.models;

import com.cineclubs.app.enums.ClubRole;
import com.cineclubs.app.enums.MemberStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "club_members")
public class ClubMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    private MemberStatus status = MemberStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private ClubRole role = ClubRole.MEMBER;

    @Column(name = "joined_at")
    private java.time.LocalDateTime joinedAt;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt = LocalDateTime.now();

    public ClubMember() {
    }

    public ClubMember(Long id, User user, Club club, MemberStatus status, ClubRole role) {
        this.id = id;
        this.user = user;
        this.club = club;
        this.status = status;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
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
}
