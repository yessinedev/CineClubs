package com.tuniclubs.app.dto;

import java.util.List;

public class PageResponse<T> {
    private List<T> items;
    private Long nextCursor;
    private boolean hasMore;

    public PageResponse(List<T> items, Long nextCursor, boolean hasMore) {
        this.items = items;
        this.nextCursor = nextCursor;
        this.hasMore = hasMore;
    }

    public List<T> getItems() {
        return items;
    }

    public Long getNextCursor() {
        return nextCursor;
    }

    public boolean isHasMore() {
        return hasMore;
    }
}