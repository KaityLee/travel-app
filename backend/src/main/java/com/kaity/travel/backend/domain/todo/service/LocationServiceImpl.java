package com.kaity.travel.backend.domain.todo.service;

import org.springframework.stereotype.Service;

import com.kaity.travel.backend.domain.todo.entity.Location;
import com.kaity.travel.backend.domain.todo.interfaces.LocationService;
import com.kaity.travel.backend.domain.todo.mapper.LocationMapper;

@Service
public class LocationServiceImpl implements LocationService{

    private final LocationMapper locationMapper;

    public LocationServiceImpl(LocationMapper locationMapper) {
        this.locationMapper = locationMapper;
    }

    @Override
    public Location getLocationsByTrip(Long tripId) {
        return locationMapper.getLocationsByTrip(tripId);    
    }

    @Override
    public void createLocation(Location location) {
        locationMapper.createLocation(location);
    }

    @Override
    public void updateLocation(Location location) {
        locationMapper.updateLocation(location);
    }

    @Override
    public void deleteLocation(Long id) {
        locationMapper.deleteLocation(id);
    }
    
}
