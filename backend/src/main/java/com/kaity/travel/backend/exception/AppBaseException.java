package com.kaity.travel.backend.exception;

public class AppBaseException extends RuntimeException {

    private final String errorCode;

    public AppBaseException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}

