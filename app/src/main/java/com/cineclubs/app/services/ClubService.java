package com.cineclubs.app.services;

import com.cineclubs.app.dto.CategoryDTO;
import com.cineclubs.app.dto.ClubDTO;
import com.cineclubs.app.enums.ClubRole;
import com.cineclubs.app.enums.MemberStatus;
import com.cineclubs.app.exceptions.*;
import com.cineclubs.app.models.Category;
import com.cineclubs.app.models.Club;
import com.cineclubs.app.models.ClubMember;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.ClubMemberRepository;
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
    private final CategoryService categoryService;
    private final ClubMemberRepository clubMemberRepository;

    public ClubService(ClubRepository clubRepository, UserService userService,
                       SimpMessagingTemplate messagingTemplate, CategoryService categoryService, ClubMemberRepository clubMemberRepository) {
        this.clubRepository = clubRepository;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
        this.categoryService = categoryService;
        this.clubMemberRepository = clubMemberRepository;
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

    public ClubDTO createClub(Club club, String userId, Long categoryId) {
        // Validate inputs (can be handled via annotations for cleaner code)
        if (club.getName() == null || club.getName().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club name is required");
        }
        if (club.getDescription() == null || club.getDescription().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club description is required");
        }
        if (club.getImageUrl() == null || club.getImageUrl().trim().isEmpty()) {
            throw new ValidationException("CLUB", "Club image URL is required");
        }

        // Generate slug
        String slug = SlugGenerator.generateUniqueSlug(club.getName());

        // Fetch related entities
        User user = userService.getUserByUserId(userId);
        Category category = categoryService.getCategoryById(categoryId);

        // Set relationships
        club.setCategory(category);
        club.setUser(user);
        club.setSlug(slug);

        // Add creator as a member with ADMIN role
        ClubMember member = new ClubMember();
        member.setUser(user);
        member.setRole(ClubRole.ADMIN);
        member.setStatus(MemberStatus.APPROVED);
        club.addMember(member); // Use helper method to maintain bidirectional relationship

        // Save club and broadcast
        Club savedClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(savedClub, false, false));

        return new ClubDTO(savedClub, false, false);
    }


    public ClubDTO updateClub(Long id, Club clubDetails, String userId) {
        Club club = getClubById(id);

        if (!club.getUser().getUserId().equals(userId)) {
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

    public void deleteClub(Long id, String userId) {
        Club club = getClubById(id);

        if (!club.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedActionException("CLUB", "delete");
        }

        clubRepository.delete(club);
        messagingTemplate.convertAndSend("/topic/clubs/delete", id);
    }

    public boolean isUserJoined(Club club, User user) {
        return club.getMembers().stream().anyMatch(member -> member.getUser().equals(user));
    }

    public void joinClub(String userId, Long clubId) {
        Club club = getClubById(clubId);
        User user = userService.getUserByUserId(userId);

        if (isUserJoined(club, user)) {
            throw new ValidationException("CLUB", "User is already a member of this club");
        }

        ClubMember member = new ClubMember();
        member.setClub(club);
        member.setUser(user);
        if (club.isPublic()) {
            member.setRole(ClubRole.MEMBER);
            member.setStatus(MemberStatus.APPROVED);
        } else {
            member.setRole(ClubRole.MEMBER);
            member.setStatus(MemberStatus.PENDING);
        }
        club.getMembers().add(member);
        Club joinedClub = clubRepository.save(club);
        messagingTemplate.convertAndSend("/topic/clubs", new ClubDTO(joinedClub, false, false));
    }

    public void leaveClub(String userId, Long clubId) {
        Club club = getClubById(clubId);
        User user = userService.getUserByUserId(userId);

        if (!isUserJoined(club, user)) {
            throw new ValidationException("CLUB", "User is not a member of this club");
        }

        if (club.getUser().getUserId().equals(userId)) {
            throw new ValidationException("CLUB", "Club owner cannot leave the club");
        }
        club.getMembers().removeIf(member -> member.getUser().equals(user));
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
