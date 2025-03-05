package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;

@Mapper
public interface ItineraryMapper {
    
    List<Itinerary> getItineraryByTrip(Long tripId);
    Itinerary getItineraryById(Long id);
    void createItinerary(Itinerary itinerary);
    void updateItinerary(Itinerary itinerary);
    void deleteItinerary(Long id);
    
}
