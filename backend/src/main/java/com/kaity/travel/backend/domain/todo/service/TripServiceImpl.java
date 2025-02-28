package com.kaity.travel.backend.domain.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kaity.travel.backend.domain.todo.entity.Trip;
import com.kaity.travel.backend.domain.todo.interfaces.TripService;
import com.kaity.travel.backend.domain.todo.mapper.TripMapper;

@Service
public class TripServiceImpl implements TripService{

    private final TripMapper tripMapper;

    public TripServiceImpl(TripMapper tripMapper) {
        this.tripMapper = tripMapper;
    }
    

    @Override
    public List<Trip> getAllTrips() {
        return tripMapper.getAllTrips();
    }

    @Override
    public Trip getTripById(Long id) {
        return tripMapper.getTripById(id);
    }


    @Override
    public void createTrip(Trip trip) {
        tripMapper.createTrip(trip);
    }


    @Override
    public void updateTrip(Trip trip) {
        tripMapper.updateTrip(trip);
    }


    @Override
    public void deleteTrip(Long id) {
        tripMapper.deleteTrip(id);
    }

    
}
