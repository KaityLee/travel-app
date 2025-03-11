package com.kaity.travel.backend.domain.todo.entity;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Trip {
    private Long id;
    private String tripName;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String notes;
    private LocalDate createdAt;
}
