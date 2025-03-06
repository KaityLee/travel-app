package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Trip;

@Mapper
public interface TripMapper {
    
    List<Trip> getAllTrips();
    Trip getTripById(Long id);
    int createTrip(Trip trip);
    int updateTrip(Trip trip);
    int deleteTrip(Long id);
    
}
