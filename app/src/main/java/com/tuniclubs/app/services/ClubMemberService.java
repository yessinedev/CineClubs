package com.tuniclubs.app.services;

import com.tuniclubs.app.dto.ClubMemberDTO;
import com.tuniclubs.app.exceptions.ResourceNotFoundException;
import com.tuniclubs.app.models.ClubMember;
import com.tuniclubs.app.repository.ClubMemberRepository;
import org.springframework.stereotype.Service;

@Service
public class ClubMemberService {
    private final ClubMemberRepository clubMemberRepository;

    public ClubMemberService(ClubMemberRepository clubMemberRepository) {
        this.clubMemberRepository = clubMemberRepository;
    }


}
