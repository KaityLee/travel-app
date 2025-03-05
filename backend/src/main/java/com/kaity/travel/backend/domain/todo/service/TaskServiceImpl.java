package com.kaity.travel.backend.domain.todo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kaity.travel.backend.domain.todo.entity.Task;
import com.kaity.travel.backend.domain.todo.interfaces.TaskService;
import com.kaity.travel.backend.domain.todo.mapper.TaskMapper;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskMapper.getAllTasks();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskMapper.getTaskById(id);
    }

    @Override
    public void createTask(Task task) {
        taskMapper.createTask(task);
    }
    
    @Override
    public void updateTask(Long id, Map<String, Object> updates) {
        Task existingTask = taskMapper.getTaskById(id);
        if (existingTask == null) {
            throw new RuntimeException("Task not found");
        }

        // Update only fields that exist in the request
        if (updates.containsKey("title")) {
            existingTask.setTitle((String) updates.get("title"));
        }
        if (updates.containsKey("description")) {
            existingTask.setDescription((String) updates.get("description"));
        }
        if (updates.containsKey("dueDate")) {
            existingTask.setDueDate(LocalDateTime.parse((String) updates.get("dueDate")));
        }
        if (updates.containsKey("status")) {
            existingTask.setStatus((String) updates.get("status"));
        }
        if (updates.containsKey("priority")) {
            existingTask.setPriority((String) updates.get("priority"));
        }

        taskMapper.updateTask(existingTask);
    }

    // @Override
    // public void updateTask(Task task) {
    //     taskMapper.updateTask(task);
    // }

    @Override
    public void deleteTask(Long id) {
        taskMapper.deleteTask(id);
    }
    
}
