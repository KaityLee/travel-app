package com.kaity.travel.backend.domain.todo.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

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

    // ✅ Convert English status to Korean
    public void setStatus(String status) {
        if (status == null || status.isEmpty()) {
            this.status = "대기 중"; 
        } else {
            switch (status.toLowerCase()) {
                case "pending":
                    this.status = "대기 중";
                    break;
                case "in-progress":
                    this.status = "진행 중";
                    break;
                case "completed":
                    this.status = "완료";
                    break;
                default:
                    this.status = "진행 중";
            }
        }
    }

    // ✅ Convert English priority to Korean
    public void setPriority(String priority) {
        if (priority == null || priority.isEmpty()) {
            this.priority = "보통"; 
        } else {
            switch (priority.toLowerCase()) {
                case "low":
                    this.priority = "낮음";
                    break;
                case "medium":
                    this.priority = "보통";
                    break;
                case "high":
                    this.priority = "높음";
                    break;
                default:
                    this.priority = "보통";
            }
        }
    }

    // ✅ Convert Korean status back to English when sending response
    public String getStatus() {
        switch (this.status) {
            case "대기 중":
                return "pending";
            case "진행 중":
                return "in-progress";
            case "완료":
                return "completed";
            default:
                return "in-progress";
        }
    }

    // ✅ Convert Korean priority back to English when sending response
    public String getPriority() {
        switch (this.priority) {
            case "낮음":
                return "low";
            case "보통":
                return "medium";
            case "높음":
                return "high";
            default:
                return "medium";
        }
    }
}
