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
    public boolean createTask(Task task) {
        return taskMapper.createTask(task) > 0;
    }
    
    @Override
    public boolean updateTask(Task task) {
        return taskMapper.updateTask(task) > 0;
    }

    // @Override
    // public int updateTask(Task task) {
    //     taskMapper.updateTask(task);
    // }

    @Override
    public boolean deleteTask(Long id) {
        return taskMapper.deleteTask(id) > 0;
    }
    
}
