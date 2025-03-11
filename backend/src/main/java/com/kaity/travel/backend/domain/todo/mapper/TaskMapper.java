package com.kaity.travel.backend.domain.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kaity.travel.backend.domain.todo.entity.Task;

@Mapper
public interface TaskMapper {
    
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    int createTask(Task task);
    int updateTask(Task task);
    int deleteTask(Long id);
    
}
