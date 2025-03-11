package com.kaity.travel.backend.domain.todo.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Itinerary {
    private Long id;
    private Long tripId;
    private int dayNumber;
    private String title;
    private String description;
    private LocalTime timeSlot;
    private String location; 
    private String address;
    private Double latitude; 
    private Double longitude;
    private LocalDateTime createdAt;
}
