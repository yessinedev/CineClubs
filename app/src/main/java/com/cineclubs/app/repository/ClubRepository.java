package com.cineclubs.app.repository;


import com.cineclubs.app.models.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    @Query("SELECT COALESCE(SUM(SIZE(c.posts)), 0) FROM Club c")
    long sumPosts();

}
