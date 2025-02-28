package com.kaity.travel.backend.domain.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kaity.travel.backend.domain.todo.entity.CalendarEvent;
import com.kaity.travel.backend.domain.todo.interfaces.CalendarEventService;
import com.kaity.travel.backend.domain.todo.mapper.CalendarEventMapper;

@Service
public class CalendarEventServiceImpl implements CalendarEventService{
    
    private final CalendarEventMapper eventMapper;

    public CalendarEventServiceImpl(CalendarEventMapper eventMapper) {
        this.eventMapper = eventMapper;
    }

    @Override
    public List<CalendarEvent> getAllEvents() {
        return eventMapper.getAllEvents();
    }

    @Override
    public CalendarEvent getEventById(Long id) {
        return eventMapper.getEventById(id);
    }

    @Override
    public void createEvent(CalendarEvent event) {
        eventMapper.createEvent(event);
    }

    @Override
    public void updateEvent(CalendarEvent event) {
        eventMapper.updateEvent(event);
    }

    @Override
    public void deleteEvent(Long id) {
        eventMapper.deleteEvent(id);
    }


}
