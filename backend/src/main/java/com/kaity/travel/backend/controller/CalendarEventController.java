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
import com.kaity.travel.backend.domain.todo.entity.CalendarEvent;
import com.kaity.travel.backend.domain.todo.interfaces.CalendarEventService;

@RestController
@RequestMapping("/api/event")
public class CalendarEventController {
    private final CalendarEventService eventService;

    public CalendarEventController(CalendarEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public Map<String, Object> getAllEvents() {
        try {
            List<CalendarEvent> results = eventService.getAllEvents();
            return ApiResponseUtils.createResponse(results);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Map<String, Object> getEventById(@PathVariable Long id) {
        try {
            CalendarEvent result = eventService.getEventById(id);
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PostMapping
    public Map<String, Object> createEvent(@RequestBody CalendarEvent event) {
        try {
            eventService.createEvent(event);
            return ApiResponseUtils.createResponse("생성완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @PutMapping
    public Map<String, Object> updateEvent(@RequestBody CalendarEvent event) {
        try {
            eventService.updateEvent(event);
            return ApiResponseUtils.createResponse("수정완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }

    @DeleteMapping
    public Map<String, Object> deleteEvent(@RequestBody Long id) {
        try {
            eventService.deleteEvent(id);
            return ApiResponseUtils.createResponse("삭제완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
    }
}
