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
import com.kaity.travel.backend.domain.todo.entity.Location;
import com.kaity.travel.backend.domain.todo.interfaces.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationApiController {
    
    private final LocationService locationService;

    public LocationApiController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/{id}")
    public Map<String, Object> getLocationsByTrip(@PathVariable Long tripId) {
        try {
            var result = locationService.getLocationsByTrip(tripId);
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PostMapping
    public Map<String, Object> createLocation(@RequestBody Location location) {
        try {
            locationService.createLocation(location);
            return ApiResponseUtils.createResponse("생성완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PutMapping
    public Map<String, Object> updateLocation(@RequestBody Location location) {
        try {
            locationService.updateLocation(location);
            return ApiResponseUtils.createResponse("수정완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @DeleteMapping
    public Map<String, Object> deleteLocation(@RequestBody Long id) {
        try {
            locationService.deleteLocation(id);
            return ApiResponseUtils.createResponse("삭제완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }
}
