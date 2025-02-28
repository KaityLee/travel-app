package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;

import com.kaity.travel.backend.domain.todo.entity.Trip;

public interface TripService {
    
    List<Trip> getAllTrips();
    Trip getTripById(Long id);
    void createTrip(Trip trip);
    void updateTrip(Trip trip);
    void deleteTrip(Long id);
    
}
