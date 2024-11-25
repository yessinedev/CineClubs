package com.cineclubs.app.services;

import com.cineclubs.app.dto.ClubDTO;
import com.cineclubs.app.models.Club;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.ClubRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service

public class ClubService {
    private final ClubRepository clubRepository;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public ClubService(ClubRepository clubRepository, UserService userService,
            SimpMessagingTemplate messagingTemplate) {
        this.clubRepository = clubRepository;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    public List<ClubDTO> getAllClubs() {
        return clubRepository.findAll().stream()
                .map(club -> new ClubDTO(club, false, false))
                .toList();
    }

    public Club getClubById(Long id) {
        return clubRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Club not found with id: " + id));
    }

    public ClubDTO createClub(Club club, String clerkId) {
        User user = userService.getUserByUserId(clerkId);
        club.setUser(user);
        if (club.getMembers() == null) {
            club.setMembers(new HashSet<>());
        }
        club.getMembers().add(user);
        Club savedClub = clubRepository.save(club);

        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(savedClub, false, false));
        return new ClubDTO(savedClub, false, false);
    }

    public ClubDTO updateClub(Long id, Club clubDetails, String clerkId) {
        Club club = getClubById(id);

        if (!club.getUser().getuserId().equals(clerkId)) {
            throw new RuntimeException("Unauthorized to update this club");
        }

        club.setName(clubDetails.getName());
        club.setDescription(clubDetails.getDescription());
        club.setImageUrl(clubDetails.getImageUrl());

        Club updatedClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(updatedClub, false, false));
        return new ClubDTO(updatedClub, false, false);
    }

    public void deleteClub(Long id) {
        Club club = getClubById(id);
        clubRepository.delete(club);
        messagingTemplate.convertAndSend("/topic/clubs/delete", id);
    }

    public boolean isUserJoined(Club club, User user) {
        return club.getMembers().contains(user);
    }

    public void joinClub(String clerkId, Long clubId) {
        Club club = getClubEntityById(clubId);
        User user = userService.getUserByUserId(clerkId);
        boolean isJoined = isUserJoined(club, user);
        if (!isJoined) {
            club.getMembers().add(user);
            Club joinedClub = clubRepository.save(club);
            messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(joinedClub, false, false));
        }
    }

    public void leaveClub(String clerkId, Long clubId) {
        Club club = getClubById(clubId);
        User user = userService.getUserByUserId(clerkId);
        boolean isJoined = isUserJoined(club, user);
        if (isJoined) {
            club.getMembers().remove(user);
            Club leftClub = clubRepository.save(club);
            messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(leftClub, false, false));
        }
    }

    private Club getClubEntityById(Long id) {
        return clubRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Club not found with id: " + id));
    }

    public ClubDTO getClubDTO(Long id, boolean includePosts, boolean includeMembers) {
        Club club = getClubById(id);
        return new ClubDTO(club, includePosts, includeMembers);
    }
}
