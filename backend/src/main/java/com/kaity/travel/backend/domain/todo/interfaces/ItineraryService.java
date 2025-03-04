package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;

public interface ItineraryService {
    
    List<Itinerary> getItineraryByTrip(Long tripId);
    void createItinerary(Itinerary itinerary);
    void updateItinerary(Itinerary itinerary);
    void deleteItinerary(Long id);
}
