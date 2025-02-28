package com.kaity.travel.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaity.travel.backend.common.utils.ApiResponseUtils;

@RestController
@RequestMapping("/api/todo")
public class ToDoApiController {
    
    @GetMapping
    public Map<String, Object> getTodoList() {

        return ApiResponseUtils.createResponse();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getTodo(@PathVariable Long id) {

        return ApiResponseUtils.createResponse();
    }

    @PostMapping
    public Map<String, Object> createTodo() {

        return ApiResponseUtils.createResponse();
    }

    @PutMapping
    public Map<String, Object> updateTodo() {

        return ApiResponseUtils.createResponse();
    }

    @DeleteMapping
    public Map<String, Object> delTodoList() {

        return ApiResponseUtils.createResponse();
    }

}
