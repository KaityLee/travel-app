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

import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Trip;
import com.kaity.travel.backend.domain.todo.interfaces.TripService;

@RestController
@RequestMapping("/api/trip")
public class TripController {
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public Map<String, Object> getAllTrips() {
        try {
            List<Trip> results = tripService.getAllTrips();
            return ApiResponseUtils.createResponse(results);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Map<String, Object> getTripById(@PathVariable Long id) {
        try {
            Trip result = tripService.getTripById(id);
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PostMapping
    public Map<String, Object> createTrip(@RequestBody Trip trip) {
        try {
            tripService.createTrip(trip);
            return ApiResponseUtils.createResponse("생성완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PutMapping
    public Map<String, Object> updateTrip(@RequestBody Trip trip) {
        try {
            tripService.updateTrip(trip);
            return ApiResponseUtils.createResponse("수정완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @DeleteMapping
    public Map<String, Object> deleteTrip(@RequestBody Long id) {
        try {
            tripService.deleteTrip(id);
            return ApiResponseUtils.createResponse("삭제완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }
}
