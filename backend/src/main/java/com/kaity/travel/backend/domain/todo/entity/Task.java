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
    private LocalDateTime createdAt;

    public void setStatus(String status) {
        if (status == null || status.isEmpty()) {
            this.status = "대기 중"; 
        } else if (status.equals("대기 중") || status.equals("완료") || status.equals("진행 중")) {
            this.status = status;
        } else {
            this.status = "알 수 없음";
        }
    }

    public void setPriority(String priority) {
        if (priority == null || priority.isEmpty()) {
            this.priority = "보통"; 
        } else if (priority.equals("낮음") || priority.equals("보통") || priority.equals("높음")) {
            this.priority = priority;
        } else {
            this.priority = "알 수 없음"; 
        }
    }

    
}
