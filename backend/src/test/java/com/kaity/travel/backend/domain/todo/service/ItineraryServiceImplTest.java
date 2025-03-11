package com.kaity.travel.backend.domain.todo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kaity.travel.backend.domain.todo.entity.Itinerary;
import com.kaity.travel.backend.domain.todo.mapper.ItineraryMapper;

@ExtendWith(MockitoExtension.class) 
public class ItineraryServiceImplTest {

    @Mock
    private ItineraryMapper itineraryMapper;

    @InjectMocks
    private ItineraryServiceImpl itineraryService; 

    private Itinerary mockItinerary;
 
    @BeforeEach
    void setUp() {
        mockItinerary = new Itinerary();
        mockItinerary.setId(1L);
        mockItinerary.setTripId(10L);
        mockItinerary.setDayNumber(1);
        mockItinerary.setTitle("Sightseeing Tour");
        mockItinerary.setDescription("Visit famous landmarks");
        mockItinerary.setTimeSlot(LocalTime.of(10, 0));
        mockItinerary.setLocation("Paris");
        mockItinerary.setAddress("Eiffel Tower");
        mockItinerary.setLatitude(48.8584);
        mockItinerary.setLongitude(2.2945);
        mockItinerary.setCreatedAt(LocalDateTime.now());
    }

    @Test
    void testCreateItinerary() {
        // Given
        when(itineraryMapper.createItinerary(mockItinerary)).thenReturn(1); 

        // When
        boolean result = itineraryService.createItinerary(mockItinerary);

        // Then
        assertTrue(result);
        verify(itineraryMapper, times(1)).createItinerary(mockItinerary);
    }

    @Test
    void testDeleteItinerary() {
        // Given
        when(itineraryMapper.deleteItinerary(1L)).thenReturn(1);

        // When
        boolean result = itineraryService.deleteItinerary(1L);

        // Then
        assertTrue(result);
        verify(itineraryMapper, times(1)).deleteItinerary(1L);
    }

    @Test
    void testGetItineraryById() {
                // Given
        List<Itinerary> mockItineraries = Arrays.asList(mockItinerary);
        when(itineraryMapper.getItineraryByTrip(10L)).thenReturn(mockItineraries);

        // When
        List<Itinerary> result = itineraryService.getItineraryByTrip(10L);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Sightseeing Tour", result.get(0).getTitle());
        verify(itineraryMapper, times(1)).getItineraryByTrip(10L);
    }

    @Test
    void testGetItineraryByTrip() {
        // Given
        when(itineraryMapper.getItineraryById(1L)).thenReturn(mockItinerary);

        // When
        Itinerary result = itineraryService.getItineraryById(1L);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Sightseeing Tour", result.getTitle());
        verify(itineraryMapper, times(1)).getItineraryById(1L);
    }

    @Test
    void testUpdateItinerary() {
        // Given
        when(itineraryMapper.updateItinerary(mockItinerary)).thenReturn(1);

        // When
        boolean result = itineraryService.updateItinerary(mockItinerary);

        // Then
        assertTrue(result);
        verify(itineraryMapper, times(1)).updateItinerary(mockItinerary);
    }
}
