package com.cineclubs.app.exceptions;

public class ApplicationException extends RuntimeException {
    private final String errorCode;
    private final ErrorType type;

    public ApplicationException(String message, String errorCode, ErrorType type) {
        super(message);
        this.errorCode = errorCode;
        this.type = type;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public ErrorType getType() {
        return type;
    }
}