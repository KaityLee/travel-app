package com.kaity.travel.backend.domain.todo.service;

import org.springframework.stereotype.Service;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;
import com.kaity.travel.backend.domain.todo.interfaces.ItineraryService;
import com.kaity.travel.backend.domain.todo.mapper.ItineraryMapper;

@Service
public class ItineraryServiceImpl implements ItineraryService{

    private final ItineraryMapper itineraryMapper;

    public ItineraryServiceImpl(ItineraryMapper itineraryMapper) {
        this.itineraryMapper = itineraryMapper;
    }
    
    @Override
    public Itinerary getItineraryByTrip(Long tripId) {
        return itineraryMapper.getItineraryByTrip(tripId);
    }

    @Override
    public void createItinerary(Itinerary itinerary) {
        itineraryMapper.createItinerary(itinerary);
    }

    @Override
    public void updateItinerary(Itinerary itinerary) {
        itineraryMapper.updateItinerary(itinerary);
    }

    @Override
    public void deleteItinerary(Long id) {
        itineraryMapper.deleteItinerary(id);
    }
    
}
