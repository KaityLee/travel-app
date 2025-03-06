package com.kaity.travel.backend.common.enums;

public enum ApiResponseErrorCode {
    SUCCESS("200", "정상적으로 처리되었습니다."),
    NO_DATA("201", "조회된 데이터가 없습니다."),
    PARAMETER_MISSING("400", "파라미터가 누락되었습니다."),
    UNAUTHORIZED("401", "권한이 없습니다."),
    NOT_FOUND("404", "요청한 데이터를 찾을 수 없습니다."),
    INTERNAL_SERVER_ERROR("500", "내부 서버 오류가 발생했습니다."),
    SERVICE_UNAVAILABLE("503", "서비스를 사용할 수 없습니다."),
    DATABASE_ERROR("600", "데이터베이스 오류가 발생했습니다.");


    private final String code;
    private final String message;

    ApiResponseErrorCode(String code, String message) {
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
