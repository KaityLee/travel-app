package com.kaity.travel.backend.controller;

import com.kaity.travel.backend.common.enums.ApiResponseErrorCode;
import com.kaity.travel.backend.common.utils.ApiResponseUtils;
import com.kaity.travel.backend.domain.todo.entity.Task;
import com.kaity.travel.backend.domain.todo.interfaces.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
@Tag(name = "Task", description = "할일 API")
public class TaskApiController {
    private final TaskService taskService;

    public TaskApiController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    @Operation(summary = "할일 목록 조회", description = "할일 목록을 조회합니다.")
    public Map<String,Object> getAllTasks() {
        try {
            List<Task> results = taskService.getAllTasks();
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e); 
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "할일 상세 조회", description = "할일 상세 정보를 조회합니다.")
    public Map<String,Object> getTaskById(@PathVariable Long id) {
        try {
            Task results = taskService.getTaskById(id);
            return ApiResponseUtils.createResponse(results); 
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e);
        }
    }

    @PostMapping
    @Operation(summary = "할일 생성", description = "할일을 생성합니다.")
    public Map<String,Object> createTask(@RequestBody Task task) {
        try {
            boolean isCreated = taskService.createTask(task);
            if (isCreated) {
                return ApiResponseUtils.createResponse("작업 생성 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e);
        }
    }

    @PutMapping
    @Operation(summary = "할일 수정", description = "할일을 수정합니다.")
    public Map<String,Object> updateTask(@RequestBody Task task) {
        try {
            boolean isUpdated = taskService.updateTask(task);
            if (isUpdated) {
                return ApiResponseUtils.createResponse("작업 수정 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "할일 삭제", description = "할일을 삭제합니다.")
    public Map<String,Object> deleteTask(@PathVariable Long id) {
        try {
            boolean isDeleted = taskService.deleteTask(id);
            if (isDeleted) {
                return ApiResponseUtils.createResponse("작업 삭제 완료");
            } else {
                return ApiResponseUtils.createErrorResponse(ApiResponseErrorCode.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseUtils.handleException(e);
        }
    }

}
