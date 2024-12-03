package com.cineclubs.app.controllers;

import com.cineclubs.app.dto.ClubDTO;
import com.cineclubs.app.dto.UserDTO;
import com.cineclubs.app.models.Club;
import com.cineclubs.app.services.ClubService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")

public class ClubController {
    private final ClubService clubService;

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping
    public ResponseEntity<List<ClubDTO>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ClubDTO> getClubById(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeMembers) {
        return ResponseEntity.ok(clubService.getClubDTO(id, includePosts, includeMembers));
    }

    @PostMapping
    public ResponseEntity<ClubDTO> createClub(@RequestBody Club club, @RequestParam String userId) {
        return ResponseEntity.ok(clubService.createClub(club, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClubDTO> updateClub(@PathVariable Long id, @RequestBody Club club,
            @RequestParam String userId) {
        return ResponseEntity.ok(clubService.updateClub(id, club, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable Long id, @RequestParam String userId) {
        clubService.deleteClub(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/join")
    public ResponseEntity<Void> joinClub(@RequestParam String userId, @RequestParam Long clubId) {
        clubService.joinClub(userId, clubId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/leave")
    public ResponseEntity<Void> leaveClub(@RequestParam String userId, @RequestParam Long clubId) {
        clubService.leaveClub(userId, clubId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/quick-search")
    public ResponseEntity<List<ClubDTO>> quickSearchClubs(@RequestParam String query) {
        return ResponseEntity.ok(clubService.quickSearchClubs(query));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClubDTO>> searchClubs(@RequestParam String query) {
        return ResponseEntity.ok(clubService.searchClubs(query));
    }

    @PutMapping("/banner/{clubId}")
    public ResponseEntity<ClubDTO> updateBanner(
            @PathVariable Long clubId,
            @RequestBody String imageUrl) {
        try {
            ClubDTO updatedClub = clubService.updateBanner(clubId, imageUrl);
            return ResponseEntity.ok(updatedClub);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ClubDTO> getClubBySlug(
            @PathVariable String slug,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeMembers) {
        return ResponseEntity.ok(clubService.getClubDTOBySlug(slug, includePosts, includeMembers));
    }
}
