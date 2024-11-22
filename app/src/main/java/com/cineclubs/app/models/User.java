package com.cineclubs.app.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String clerkId;

    @Column(nullable = false)
    private String email;

    private String firstName;
    private String lastName;
    private String imageUrl;

    @Column(nullable = false)
    private String username;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> posts;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;

    @ManyToMany(mappedBy = "likes")
    private Set<Post> likedPosts;

    @ManyToMany(mappedBy = "likes")
    private Set<Comment> likedComments;
}
