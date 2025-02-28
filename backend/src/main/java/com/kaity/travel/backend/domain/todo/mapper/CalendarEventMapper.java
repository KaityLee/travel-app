package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.CalendarEvent;

@Mapper
public interface CalendarEventMapper {
    
    List<CalendarEvent> getAllEvents();
    CalendarEvent getEventById(Long id);
    void createEvent(CalendarEvent event);
    void updateEvent(CalendarEvent event);
    void deleteEvent(Long id);
    
}
