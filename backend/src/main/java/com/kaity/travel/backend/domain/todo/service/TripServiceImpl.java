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
    public boolean createTrip(Trip trip) {
        return tripMapper.createTrip(trip) > 0;
    }


    @Override
    public boolean updateTrip(Trip trip) {
        return tripMapper.updateTrip(trip) > 0;
    }


    @Override
    public boolean deleteTrip(Long id) {
        return tripMapper.deleteTrip(id) > 0;
    }

    
}
