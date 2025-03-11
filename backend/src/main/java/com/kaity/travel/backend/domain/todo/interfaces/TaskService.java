package com.kaity.travel.backend.domain.todo.interfaces;

import java.util.List;

import com.kaity.travel.backend.domain.todo.entity.Task;

public interface TaskService {
    
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    boolean createTask(Task task);
    boolean updateTask(Task task);
    boolean deleteTask(Long id);
}
