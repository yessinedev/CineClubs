package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.StatsDTO;
import com.tuniclubs.app.repository.ClubRepository;
import com.tuniclubs.app.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    private final ClubRepository clubRepository;

    public StatsController(final UserRepository userRepository, final ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @GetMapping("/summary")
    public StatsDTO getStats() {
        long totalClubs = clubRepository.count(); // Count total clubs
        long totalPosts = clubRepository.sumPosts(); // Custom query to sum posts

        return new StatsDTO(totalClubs, totalPosts);
    }


}
