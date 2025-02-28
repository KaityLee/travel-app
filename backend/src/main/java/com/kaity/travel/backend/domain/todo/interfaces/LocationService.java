package com.kaity.travel.backend.domain.todo.interfaces;

import com.kaity.travel.backend.domain.todo.entity.Location;

public interface LocationService {
    
    // List<Location> getAllLocation();
    Location getLocationsByTrip(Long tripId);
    void createLocation(Location location);
    void updateLocation(Location location);
    void deleteLocation(Long id);
}
