package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;
import java.util.Map;

import com.kaity.travel.backend.domain.todo.entity.Task;

public interface TaskService {
    
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    void createTask(Task task);
    // void updateTask(Task task);
    void updateTask(Task task);
    void deleteTask(Long id);
}
