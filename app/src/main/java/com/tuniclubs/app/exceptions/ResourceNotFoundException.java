package com.tuniclubs.app.exceptions;

import com.tuniclubs.app.exceptions.ApplicationException;
import com.tuniclubs.app.exceptions.ErrorType;

public class ResourceNotFoundException extends ApplicationException {
    public ResourceNotFoundException(String resource, String identifier) {
        super(
                String.format("%s not found with identifier: %s", resource, identifier),
                String.format("%s_NOT_FOUND", resource.toUpperCase()),
                ErrorType.NOT_FOUND);
    }
}