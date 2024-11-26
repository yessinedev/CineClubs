package com.cineclubs.app.dto;

public class StatsDTO {
    private long totalClubs;
    private long totalPosts;

    public StatsDTO(long totalClubs, long totalPosts) {
        this.totalClubs = totalClubs;
        this.totalPosts = totalPosts;
    }

    public long getTotalClubs() {
        return totalClubs;
    }

    public void setTotalClubs(long totalClubs) {
        this.totalClubs = totalClubs;
    }

    public long getTotalPosts() {
        return totalPosts;
    }

    public void setTotalPosts(long totalPosts) {
        this.totalPosts = totalPosts;
    }
}
