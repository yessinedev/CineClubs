package com.cineclubs.app.exceptions;

public class ValidationException extends ApplicationException {
    public ValidationException(String resource, String message) {
        super(
                message,
                String.format("%s_VALIDATION_ERROR", resource.toUpperCase()),
                ErrorType.VALIDATION);
    }
}