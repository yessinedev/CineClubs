package com.tuniclubs.app.repository;

import com.tuniclubs.app.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByClubIdOrderByCreatedAt(Long clubId);
}