package com.cineclubs.app.repository;

import com.cineclubs.app.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByClubIdOrderByCreatedAt(Long clubId);
}