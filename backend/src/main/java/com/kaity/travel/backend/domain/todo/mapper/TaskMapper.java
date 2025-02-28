package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Task;

@Mapper
public interface TaskMapper {
    
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    void createTask(Task task);
    void updateTask(Task task);
    void deleteTask(Long id);
    
}
