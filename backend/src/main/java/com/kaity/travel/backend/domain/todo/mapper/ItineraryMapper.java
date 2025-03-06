package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;

@Mapper
public interface ItineraryMapper {
    
    List<Itinerary> getItineraryByTrip(Long tripId);
    Itinerary getItineraryById(Long id);
    int createItinerary(Itinerary itinerary);
    int updateItinerary(Itinerary itinerary);
    int deleteItinerary(Long id);
    
}
