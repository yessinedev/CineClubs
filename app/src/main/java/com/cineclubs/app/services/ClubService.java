package com.cineclubs.app.services;

import com.cineclubs.app.dto.ClubDTO;
import com.cineclubs.app.exceptions.*;
import com.cineclubs.app.models.Club;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.ClubRepository;
import com.cineclubs.app.utils.SlugGenerator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
                .orElseThrow(() -> new ResourceNotFoundException("CLUB", id.toString()));
    }

    public ClubDTO createClub(Club club, String clerkId) {
        if (club.getName() == null || club.getName().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club name is required");
        }
        if (club.getDescription() == null || club.getDescription().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club description is required");
        }
        if (club.getImageUrl() == null || club.getImageUrl().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club image URL is required");
        }

        String slug = SlugGenerator.generateUniqueSlug(club.getName());

        User user = userService.getUserByUserId(clerkId);
        club.setUser(user);
        club.setSlug(slug);

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
            throw new UnauthorizedActionException("CLUB", "update");
        }

        if (clubDetails.getName() == null || clubDetails.getName().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club name is required");
        }
        if (clubDetails.getDescription() == null || clubDetails.getDescription().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club description is required");
        }

        if (!club.getName().equals(clubDetails.getName())) {
            String newSlug = SlugGenerator.generateUniqueSlug(clubDetails.getName());
            club.setSlug(newSlug);
        }

        club.setName(clubDetails.getName());
        club.setDescription(clubDetails.getDescription());
        club.setImageUrl(clubDetails.getImageUrl());

        Club updatedClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(updatedClub, false, false));
        return new ClubDTO(updatedClub, false, false);
    }

    public void deleteClub(Long id, String clerkId) {
        Club club = getClubById(id);

        if (!club.getUser().getuserId().equals(clerkId)) {
            throw new UnauthorizedActionException("CLUB", "delete");
        }

        clubRepository.delete(club);
        messagingTemplate.convertAndSend("/topic/clubs/delete", id);
    }

    public boolean isUserJoined(Club club, User user) {
        return club.getMembers().contains(user);
    }

    public void joinClub(String clerkId, Long clubId) {
        Club club = getClubById(clubId);
        User user = userService.getUserByUserId(clerkId);

        if (isUserJoined(club, user)) {
            throw new ValidationException("CLUB", "User is already a member of this club");
        }

        club.getMembers().add(user);
        Club joinedClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(joinedClub, false, false));
    }

    public void leaveClub(String clerkId, Long clubId) {
        Club club = getClubById(clubId);
        User user = userService.getUserByUserId(clerkId);

        if (!isUserJoined(club, user)) {
            throw new ValidationException("CLUB", "User is not a member of this club");
        }

        if (club.getUser().getuserId().equals(clerkId)) {
            throw new ValidationException("CLUB", "Club owner cannot leave the club");
        }

        club.getMembers().remove(user);
        Club leftClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(leftClub, false, false));
    }

    public ClubDTO getClubDTO(Long id, boolean includePosts, boolean includeMembers) {
        Club club = getClubById(id);
        return new ClubDTO(club, includePosts, includeMembers);
    }

    public ClubDTO updateBanner(Long clubId, String imageUrl) {
        Club club = getClubById(clubId);

        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            throw new ValidationException("CLUB", "Banner image URL is required");
        }

        String cleanImageUrl = imageUrl.replace("\"", "");
        club.setImageUrl(cleanImageUrl);

        Club updatedClub = clubRepository.save(club);
        return new ClubDTO(updatedClub);
    }

    public List<ClubDTO> quickSearchClubs(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        Pageable limit = PageRequest.of(0, 4); // Limit to 4 results
        return clubRepository.quickSearchClubs(query.trim(), limit).stream()
                .map(club -> new ClubDTO(club, false, false))
                .toList();
    }

    public List<ClubDTO> searchClubs(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        return clubRepository.searchClubs(query.trim()).stream()
                .map(club -> new ClubDTO(club, false, true))
                .toList();
    }

    public ClubDTO getClubDTOBySlug(String slug, boolean includePosts, boolean includeMembers) {
        Club club = clubRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("CLUB", "slug: " + slug));
        return new ClubDTO(club, includePosts, includeMembers);
    }
}
