package com.kaity.travel.backend.controller;

import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Itinerary;
import com.kaity.travel.backend.domain.todo.interfaces.ItineraryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryApiController {
    
    private final ItineraryService itineraryService;

    public ItineraryApiController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }
    
    
    @GetMapping("/{tripId}")
    public Map<String,Object> getItineraryByTrip(@PathVariable Long tripId) {
        try {
            List<Itinerary> results = itineraryService.getItineraryByTrip(tripId);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }
    
    @GetMapping("/{tripId}")
    public Map<String,Object> getItineraryById(@PathVariable Long id) {
        try {
            Itinerary results = itineraryService.getItineraryById(id);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @PostMapping
    public Map<String,Object> createItinerary(@RequestBody Itinerary param) {
        try {
            itineraryService.createItinerary(param);
            return ApiResponseUtils.createResponse("생성완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }
    @PutMapping
    public Map<String,Object> updateItinerary(@RequestBody Itinerary param) {
        try {
            itineraryService.updateItinerary(param);
            return ApiResponseUtils.createResponse("수정완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @DeleteMapping("/{id}")
    public Map<String,Object> deleteItinerary(@PathVariable Long id) {
        try {
            itineraryService.deleteItinerary(id);
            return ApiResponseUtils.createResponse("삭제완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    
}
