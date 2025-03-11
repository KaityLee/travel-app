package com.kaity.travel.backend.controller;

import com.kaity.travel.backend.common.enums.ApiResponseErrorCode;
import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Itinerary;
import com.kaity.travel.backend.domain.todo.interfaces.ItineraryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
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
            log.error("tripId 에러 확인  trip ID = {}", tripId, e);
            return ApiResponseUtils.handleException(e); 
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "일정 상세 조회", description = "일정 상세 정보를 조회합니다.")
    public Map<String,Object> getItineraryById(@PathVariable Long id) {
        try {
            Itinerary results = itineraryService.getItineraryById(id);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            log.error("id 에러 확인  id = {}", id, e);
            return ApiResponseUtils.handleException(e); 
        }
    }

    @PostMapping
    @Operation(summary = "일정 생성", description = "일정을 생성합니다.")
    public Map<String,Object> createItinerary(@RequestBody Itinerary param) {
        try {
            boolean isCreated = itineraryService.createItinerary(param);
            if (isCreated) {
                return ApiResponseUtils.createResponse("일정 생성 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.error("일정 생성 에러 itinerary : {}", param, e);
            return ApiResponseUtils.handleException(e); 
        }
    }
    @PutMapping
    @Operation(summary = "일정 수정", description = "일정을 수정합니다.")
    public Map<String,Object> updateItinerary(@RequestBody Itinerary param) {
        try {
            boolean isUpdated = itineraryService.updateItinerary(param);
            if (isUpdated) {
                return ApiResponseUtils.createResponse("일정 수정 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("일정 수정 에러 itinerary : {}", param, e);
            return ApiResponseUtils.handleException(e); 
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "일정 삭제", description = "일정을 삭제합니다.")
    public Map<String,Object> deleteItinerary(@PathVariable Long id) {
        try {
            boolean isDeleted = itineraryService.deleteItinerary(id);
            if (isDeleted) {
                return ApiResponseUtils.createResponse("일정 삭제 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("일정 삭제 에러 id : {}", id, e);
            return ApiResponseUtils.handleException(e); 
        }
    }

    
}
