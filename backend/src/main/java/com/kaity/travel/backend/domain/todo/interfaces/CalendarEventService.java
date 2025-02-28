package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;

import com.kaity.travel.backend.domain.todo.entity.CalendarEvent;

public interface CalendarEventService {
    
    List<CalendarEvent> getAllEvents();
    CalendarEvent getEventById(Long id);
    void createEvent(CalendarEvent event);
    void updateEvent(CalendarEvent event);
    void deleteEvent(Long id);
    
}
