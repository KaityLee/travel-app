package com.kaity.travel.backend.domain.todo.service;

import java.util.List;

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
    public void updateTask(Task task) {
        taskMapper.updateTask(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskMapper.deleteTask(id);
    }
    
}
