package com.kaity.travel.backend.controller;

import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Task;
import com.kaity.travel.backend.domain.todo.interfaces.TaskService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskApiController {
    private final TaskService taskService;

    public TaskApiController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Map<String,Object> getAllTasks() {
        try {
            List<Task> results = taskService.getAllTasks();
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @GetMapping("/{id}")
    public Map<String,Object> getTaskById(@PathVariable Long id) {
        try {
            Task results = taskService.getTaskById(id);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @PostMapping
    public Map<String,Object> createTask(@RequestBody Task task) {
        try {
            taskService.createTask(task);
            return ApiResponseUtils.createResponse("생성완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

    @PatchMapping("/{id}")
    public Map<String, Object> updateTask(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            taskService.updateTask(id, updates);
            return ApiResponseUtils.createResponse("수정 완료");
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage());
        }
}

    // @PutMapping
    // public Map<String,Object> updateTask(@RequestBody Task task) {
    //     try {
    //         taskService.updateTask(task);
    //         return ApiResponseUtils.createResponse("수정완료"); 
    //     } catch (Exception e) {
    //         return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
    //     }
    // }

    @DeleteMapping("/{id}")
    public Map<String,Object> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ApiResponseUtils.createResponse("삭제완료"); 
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 - " + e.getMessage()); 
        }
    }

}
