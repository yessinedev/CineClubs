package com.cineclubs.app.dto;

public class PageRequest {
    private Long cursor;
    private int limit;
    private String sortDirection;

    public PageRequest() {
        this.limit = 10; // Default limit
        this.sortDirection = "DESC"; // Default sort direction
    }

    public Long getCursor() {
        return cursor;
    }

    public void setCursor(Long cursor) {
        this.cursor = cursor;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = Math.min(limit, 50); // Cap maximum limit at 50
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }
}