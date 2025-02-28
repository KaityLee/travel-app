package com.kaity.travel.backend.domain.todo.entity;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Task {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private String status;
    private String priority;
    private Boolean travelRelated;
    private Long tripId;
    private LocalDateTime createdAt;
}
