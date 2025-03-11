package com.kaity.travel.backend.domain.todo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kaity.travel.backend.domain.todo.entity.Trip;
import com.kaity.travel.backend.domain.todo.mapper.TripMapper;

@ExtendWith(MockitoExtension.class)
public class TripServiceImplTest {

    @Mock
    private TripMapper tripMapper;

    @InjectMocks
    private TripServiceImpl tripService;

    private Trip mockTrip;

    @BeforeEach
    void setUp() {
        mockTrip = new Trip();
        mockTrip.setId(1L);
        mockTrip.setTripName("테스트 여행");
        mockTrip.setDestination("테스트 목적지");
        mockTrip.setStartDate(LocalDate.of(2025, 3, 10));
        mockTrip.setEndDate(LocalDate.of(2025, 3, 20));
        mockTrip.setNotes("테스트 노트");
        mockTrip.setCreatedAt(LocalDate.now());
    }

    @Test
    void testCreateTrip() {
        // Given
        when(tripMapper.createTrip(mockTrip)).thenReturn(1);

        // When
        boolean result = tripService.createTrip(mockTrip);

        // Then
        assertTrue(result);
        verify(tripMapper, times(1)).createTrip(mockTrip);
    }

    @Test
    void testDeleteTrip() {
        // Given
        when(tripMapper.deleteTrip(1L)).thenReturn(1);

        // When
        boolean result = tripService.deleteTrip(1L);

        // Then
        assertTrue(result);
        verify(tripMapper, times(1)).deleteTrip(1L);
    }

    @Test
    void testGetAllTrips() {
        // Given
        List<Trip> trips = List.of(mockTrip);
        when(tripMapper.getAllTrips()).thenReturn(trips);

        // When
        List<Trip> result = tripService.getAllTrips();

        // Then
        assertNotNull(result);
        assertEquals(trips, result);
        verify(tripMapper, times(1)).getAllTrips();
    }

    @Test
    void testGetTripById() {
        // Given
        when(tripMapper.getTripById(1L)).thenReturn(mockTrip);

        // When
        Trip result = tripService.getTripById(1L);

        // Then
        assertNotNull(result);
        assertEquals(mockTrip, result);
        verify(tripMapper, times(1)).getTripById(1L);
    }

    @Test
    void testUpdateTrip() {
        // Given
        when(tripMapper.updateTrip(mockTrip)).thenReturn(1);

        // When
        boolean result = tripService.updateTrip(mockTrip);

        // Then
        assertTrue(result);
        verify(tripMapper, times(1)).updateTrip(mockTrip);

    }
}
