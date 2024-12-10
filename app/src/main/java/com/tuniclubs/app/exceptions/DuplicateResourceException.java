package com.tuniclubs.app.exceptions;

public class DuplicateResourceException extends ApplicationException {
    public DuplicateResourceException(String resource, String field, String value) {
        super(
                String.format("%s with %s '%s' already exists", resource, field, value),
                String.format("DUPLICATE_%s_%s", resource.toUpperCase(), field.toUpperCase()),
                ErrorType.DUPLICATE);
    }
}