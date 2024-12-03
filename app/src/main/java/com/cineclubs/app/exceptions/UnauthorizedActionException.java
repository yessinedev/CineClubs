package com.cineclubs.app.exceptions;

public class UnauthorizedActionException extends ApplicationException {
    public UnauthorizedActionException(String resource, String action) {
        super(
                String.format("You are not authorized to %s this %s", action, resource),
                String.format("UNAUTHORIZED_%s_%s", resource.toUpperCase(), action.toUpperCase()),
                ErrorType.UNAUTHORIZED);
    }
}