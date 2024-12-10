package com.tuniclubs.app.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
    private LocalDateTime timestamp;
    private String errorCode;
    private String message;
    private String path;

    public ErrorResponse(String errorCode, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
    }

    // Getters and setters
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}