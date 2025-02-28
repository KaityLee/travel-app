package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Location;

@Mapper
public interface LocationMapper {
    
    // List<Location> getAllLocation();
    Location getLocationsByTrip(Long tripId);
    void createLocation(Location location);
    void updateLocation(Location location);
    void deleteLocation(Long id);
    
}
