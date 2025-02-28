package com.kaity.travel.backend.exception;

public enum AppErrorCode {

    MISSING_FILE_ERROR("400", "파일이 누락되었습니다."),
    INVALID_FILE_EXTENSION_ERROR("400", "잘못된 확장자 파일입니다."),
    SERVICE_UNAVAILABLE("503", "서비스를 사용할 수 없습니다.");

    private final String code;
    private final String message;

    AppErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}