package com.kaity.travel.backend.domain.todo.interfaces;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;

public interface ItineraryService {
    
    Itinerary getItineraryByTrip(Long tripId);
    void createItinerary(Itinerary itinerary);
    void updateItinerary(Itinerary itinerary);
    void deleteItinerary(Long id);
}
