package com.cineclubs.app.repository;

import com.cineclubs.app.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByClubIdOrderByCreatedAtDesc(Long clubId);

    List<Post> findByAuthorUserIdOrderByCreatedAtDesc(String userId);

    List<Post> findAllByOrderByCreatedAtDesc();

    @Query("SELECT p FROM Post p WHERE p.club.id = :clubId AND p.id < :cursor ORDER BY p.id DESC LIMIT :limit")
    List<Post> findByClubIdAndIdLessThanOrderByIdDesc(Long clubId, Long cursor, int limit);

    @Query("SELECT p FROM Post p WHERE p.club.id = :clubId ORDER BY p.id DESC LIMIT :limit")
    List<Post> findFirstByClubIdOrderByIdDesc(Long clubId, int limit);
}
