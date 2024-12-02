package com.cineclubs.app.repository;

import com.cineclubs.app.models.Club;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    @Query("SELECT COALESCE(SUM(SIZE(c.posts)), 0) FROM Club c")
    long sumPosts();

    @Query("SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Club> searchClubs(@Param("query") String query);

    @Query(value = "SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Club> quickSearchClubs(@Param("query") String query, Pageable pageable);

    boolean existsBySlug(String slug);

    Optional<Club> findBySlug(String slug);
}
