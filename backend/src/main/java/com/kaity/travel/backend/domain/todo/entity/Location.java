package com.kaity.travel.backend.domain.todo.entity;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Location {
    
    private Long id;
    private Long tripId;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String notes;
    private LocalDateTime createdAt;
}
