package com.cineclubs.app.repository;

import com.cineclubs.app.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByClubIdOrderByCreatedAtDesc(Long clubId);

    List<Post> findByAuthorUserIdOrderByCreatedAtDesc(String userId);
    
    List<Post> findAllByOrderByCreatedAtDesc();
}
