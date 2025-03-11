package com.kaity.travel.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaity.travel.backend.common.enums.ApiResponseErrorCode;
import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Trip;
import com.kaity.travel.backend.domain.todo.interfaces.TripService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/trip")
@Tag(name = "Trip", description = "여행 API")
public class TripApiController {
    private final TripService tripService;

    public TripApiController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    @Operation(summary = "여행 목록 조회", description = "여행 목록을 조회합니다.")
    public Map<String, Object> getAllTrips() {
        try {
            List<Trip> results = tripService.getAllTrips();
            return ApiResponseUtils.createResponse(results);
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "여행 상세 조회", description = "여행 상세 정보를 조회합니다.")
    public Map<String, Object> getTripById(@PathVariable Long id) {
        try {
            Trip result = tripService.getTripById(id);
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            log.error("여행 상세 조회 에러발생  ID: {}", id, e);
            return ApiResponseUtils.handleException(e);
        }
    }

    @PostMapping
    @Operation(summary = "여행 생성", description = "여행을 생성합니다.")
    public Map<String, Object> createTrip(@RequestBody Trip trip) {
        try {
            boolean isCreated = tripService.createTrip(trip);
            if (isCreated) {
                return ApiResponseUtils.createResponse("여행 생성 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.error("여행 생성 에러 발생 trip = {}", trip, e);
            return ApiResponseUtils.handleException(e);
        }
    }

    @PutMapping
    @Operation(summary = "여행 수정", description = "여행을 수정합니다.")
    public Map<String, Object> updateTrip(@RequestBody Trip trip) {
        try {
            boolean isUpdated = tripService.updateTrip(trip);
            if (isUpdated) {
                return ApiResponseUtils.createResponse("여행 수정 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("여행 수정 에러발생 trip: {}", trip, e);
            return ApiResponseUtils.handleException(e);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "여행 삭제", description = "여행을 삭제합니다.")
    public Map<String, Object> deleteTrip(@PathVariable Long id) {
        try {
            boolean isDeleted = tripService.deleteTrip(id);
            if (isDeleted) {
                return ApiResponseUtils.createResponse("여행 삭제 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("여행 삭제 에러 발생 ID: {}", id, e);
            return ApiResponseUtils.handleException(e);
        }
    }
}
