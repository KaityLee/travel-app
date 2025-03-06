package com.kaity.travel.backend.controller;

import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Itinerary;
import com.kaity.travel.backend.domain.todo.interfaces.ItineraryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/itinerary")
@Tag(name = "Itinerary", description = "일정 API")
public class ItineraryApiController {
    
    private final ItineraryService itineraryService;

    public ItineraryApiController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }
    
    
    @GetMapping("/trip/{tripId}")
    @Operation(summary = "여행별 일정 조회", description = "여행별 일정을 조회합니다.")
    public Map<String,Object> getItineraryByTrip(@PathVariable Long tripId) {
        try {
            List<Itinerary> results = itineraryService.getItineraryByTrip(tripId);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "일정 상세 조회", description = "일정 상세 정보를 조회합니다.")
    public Map<String,Object> getItineraryById(@PathVariable Long id) {
        try {
            Itinerary results = itineraryService.getItineraryById(id);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @PostMapping
    @Operation(summary = "일정 생성", description = "일정을 생성합니다.")
    public Map<String,Object> createItinerary(@RequestBody Itinerary param) {
        try {
            itineraryService.createItinerary(param);
            return ApiResponseUtils.createResponse("생성완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }
    @PutMapping
    @Operation(summary = "일정 수정", description = "일정을 수정합니다.")
    public Map<String,Object> updateItinerary(@RequestBody Itinerary param) {
        try {
            itineraryService.updateItinerary(param);
            return ApiResponseUtils.createResponse("수정완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "일정 삭제", description = "일정을 삭제합니다.")
    public Map<String,Object> deleteItinerary(@PathVariable Long id) {
        try {
            itineraryService.deleteItinerary(id);
            return ApiResponseUtils.createResponse("삭제완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    
}
