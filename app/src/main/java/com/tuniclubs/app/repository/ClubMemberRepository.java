package com.tuniclubs.app.repository;

import com.tuniclubs.app.models.ClubMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubMemberRepository extends JpaRepository<ClubMember, Long> {
}
