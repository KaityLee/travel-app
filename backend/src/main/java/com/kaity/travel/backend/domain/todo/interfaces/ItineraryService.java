package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;

public interface ItineraryService {
    
    List<Itinerary> getItineraryByTrip(Long tripId);
    Itinerary getItineraryById(Long id);
    boolean createItinerary(Itinerary itinerary);
    boolean updateItinerary(Itinerary itinerary);
    boolean deleteItinerary(Long id);
}
