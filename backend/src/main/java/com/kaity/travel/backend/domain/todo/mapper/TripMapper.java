package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Trip;

@Mapper
public interface TripMapper {
    
    List<Trip> getAllTrips();
    Trip getTripById(Long id);
    void createTrip(Trip trip);
    void updateTrip(Trip trip);
    void deleteTrip(Long id);
    
}
