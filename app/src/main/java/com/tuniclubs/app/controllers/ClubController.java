package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.ClubDTO;
import com.tuniclubs.app.dto.UserDTO;
import com.tuniclubs.app.models.Club;
import com.tuniclubs.app.services.ClubService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Fetch all clubs")
    @GetMapping
    public ResponseEntity<List<ClubDTO>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @Operation(summary = "Fetch club by id")
    @GetMapping("/id/{id}")
    public ResponseEntity<ClubDTO> getClubById(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeMembers) {
        return ResponseEntity.ok(clubService.getClubDTO(id, includePosts, includeMembers));
    }
    @Operation(summary = "Create a club")
    @PostMapping
    public ResponseEntity<ClubDTO> createClub(@RequestBody Club club, @RequestParam String userId, @RequestParam Long categoryId) {
        return ResponseEntity.ok(clubService.createClub(club, userId, categoryId));
    }


    @Operation(summary = "Update a club")
    @PutMapping("/{id}")
    public ResponseEntity<ClubDTO> updateClub(@PathVariable Long id, @RequestBody Club club,
            @RequestParam String userId) {
        return ResponseEntity.ok(clubService.updateClub(id, club, userId));
    }

    @Operation(summary = "Delete a Club")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable Long id, @RequestParam String userId) {
        clubService.deleteClub(id, userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Join a Club")
    @PostMapping("/join")
    public ResponseEntity<Void> joinClub(@RequestParam String userId, @RequestParam Long clubId) {
        clubService.joinClub(userId, clubId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Leave a Club")
    @PutMapping("/leave")
    public ResponseEntity<Void> leaveClub(@RequestParam String userId, @RequestParam Long clubId) {
        clubService.leaveClub(userId, clubId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Search Clubs: Return the first 4 matches clubs")
    @GetMapping("/quick-search")
    public ResponseEntity<List<ClubDTO>> quickSearchClubs(@RequestParam String query) {
        return ResponseEntity.ok(clubService.quickSearchClubs(query));
    }

    @Operation(summary = "Search Users: Return all matches clubs")
    @GetMapping("/search")
    public ResponseEntity<List<ClubDTO>> searchClubs(@RequestParam String query) {
        return ResponseEntity.ok(clubService.searchClubs(query));
    }

    @Operation(summary = "Update Club Banner Image")
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

    @Operation(summary = "Fetch Club By slug")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ClubDTO> getClubBySlug(
            @PathVariable String slug,
            @RequestParam(defaultValue = "false") boolean includePosts,
            @RequestParam(defaultValue = "false") boolean includeMembers) {
        return ResponseEntity.ok(clubService.getClubDTOBySlug(slug, includePosts, includeMembers));
    }
    @Operation(summary = "Fetch Club by Category")
    @GetMapping("/category")
    public ResponseEntity<List<ClubDTO>> getClubsByCategory(@RequestParam Long categoryId) {
        return ResponseEntity.ok(clubService.getClubsByCategory(categoryId));
    }
}
