package com.kaity.travel.backend.common.utils;

import java.util.HashMap;
import java.util.Map;

import com.kaity.travel.backend.common.enums.ApiResponseErrorCode;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ApiResponseUtils {

    private static String RESULT_CODE = "200";
    private static String SUCCESS_MESSAGE = "정상적으로 처리되었습니다";
    private static String NODATA_MESSAGE = "조회된 데이터가 없습니다";
    
    private static String ERROR_RESULT_CODE = "500";
    private static String ERROR_MESSAGE = "처리중 오류가 발생하였습니다";

    public static <T> Map<String, Object> createResponse(T value) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put("result", value);

        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);

        return response;
    }

    public static <T> Map<String, Object> createResponse(String key, T value) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put(key, value);

        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);

        return response;
    }
    
    public static <T> Map<String, Object> createPageResponse(String key, T value, int pagesize, int totalrows) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put(key, value);
        
        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);

        double pageCount = (double)totalrows / pagesize;
        data.put("totalrows",  totalrows);
        data.put("totalpages", (int)Math.ceil(pageCount));
        
        return response;
    }

    public static <T> Map<String, Object> createPageResponse(T value, int pagesize, int totalrows) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put("result", value);
        
        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);

        double pageCount = (double)totalrows / pagesize;
        data.put("totalrows",  totalrows);
        data.put("totalpages", (int)Math.ceil(pageCount));
        
        return response;
    }

    public static <T> Map<String, Object> createNoDataResponse(String key) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put(key, null);

        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", NODATA_MESSAGE);
        response.put("data", data);
        response.put("totalrows", 0);
        response.put("totalpages",0);

        return response;
    }

    public static <T> Map<String, Object> createNoDataResponse() {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put("result", null);

        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", NODATA_MESSAGE);
        response.put("data", data);
        response.put("totalrows", 0);
        response.put("totalpages",0);

        return response;
    }
    
    public static <T> Map<String, Object> createResponse() {

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        
        response.put("success", "Y"); 
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);
        //data.put("totalrows",  0);
        //data.put("totalpages", 0);
        
        return response;
    }
    
    public static <T> Map<String, Object> createErrorResponse(String code, String message) {
        log.error("API 에러 - 코드 : {}, 메시지 : {}", code, message);
        Map<String, Object> response = new HashMap<>();
        response.put("success", "N");
        response.put("code", code);
        response.put("message", message);
        
        return response;
    }
    
    public static <T> Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", "N");
        response.put("code", "");
        response.put("message", message);
        
        return response;
    }

    public static <T> Map<String, Object> createErrorResponse(ApiResponseErrorCode errorCode) {
        return createErrorResponse(errorCode.getCode(), errorCode.getMessage());
    }

    public static <T> Map<String, Object> createErrorResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", "N");
        response.put("code", ERROR_RESULT_CODE);
        response.put("message", ERROR_MESSAGE);
        
        return response;
    }

    public static Map<String, Object> handleException(Exception e) {
        log.error("Exception Occurred: {}", e.getMessage(), e);

        if (e instanceof NullPointerException) {
            return createErrorResponse(ApiResponseErrorCode.INTERNAL_SERVER_ERROR);
        } else if (e instanceof IllegalArgumentException) {
            return createErrorResponse(ApiResponseErrorCode.PARAMETER_MISSING);
        } else {
            return createErrorResponse(ApiResponseErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public static Map<String, Object> handleDatabaseException(Exception e) {
        log.error("Database Exception: {}", e.getMessage(), e);
        return createErrorResponse(ApiResponseErrorCode.SERVICE_UNAVAILABLE);
    }
}
