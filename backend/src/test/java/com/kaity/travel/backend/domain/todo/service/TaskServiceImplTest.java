package com.kaity.travel.backend.domain.todo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kaity.travel.backend.domain.todo.entity.Task;
import com.kaity.travel.backend.domain.todo.mapper.TaskMapper;

// @SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task mockTask;
    
    @BeforeEach
    void setUp() {
        mockTask = new Task();
        mockTask.setId(1L);
        mockTask.setTitle("테스트 작업");
        mockTask.setDescription("테스트 설명");
        mockTask.setDueDate(LocalDateTime.of(2025, 3, 10, 12, 0));
        mockTask.setStatus("pending");
        mockTask.setPriority("medium");
        mockTask.setCreatedAt(LocalDateTime.now());
    }

    @Test
    void testCreateTask() {
        // Given    
        when(taskMapper.createTask(mockTask)).thenReturn(1); // ✅ 1 리턴하도록 설정

        // When
        boolean result = taskService.createTask(mockTask);

        // Then
        assertTrue(result);
        verify(taskMapper, times(1)).createTask(mockTask);
    }

    @Test
    void testDeleteTask() {
        // Given
        when(taskMapper.deleteTask(1L)).thenReturn(1);

        // When
        boolean result = taskService.deleteTask(1L);

        // Then
        assertTrue(result);
        verify(taskMapper, times(1)).deleteTask(1L);

    }

    @Test
    void testGetAllTasks() {
        // Given (Mock 설정)
        List<Task> mockTasks = Arrays.asList(mockTask);
        when(taskMapper.getAllTasks()).thenReturn(mockTasks);

        // When (서비스 호출)
        List<Task> result = taskService.getAllTasks();

        // Then (검증)
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("테스트 작업", result.get(0).getTitle());
        verify(taskMapper, times(1)).getAllTasks(); // Mapper가 1번 호출되었는지 확인

    }

    @Test
    void testGetTaskById() {
        // Given
        when(taskMapper.getTaskById(1L)).thenReturn(mockTask);

        // When
        Task result = taskService.getTaskById(1L);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("테스트 작업", result.getTitle());
        verify(taskMapper, times(1)).getTaskById(1L);
    }

    @Test
    void testUpdateTask() {
        // Given
        when(taskMapper.updateTask(mockTask)).thenReturn(1);

        // When
        boolean result = taskService.updateTask(mockTask);

        // Then
        assertTrue(result);
        verify(taskMapper, times(1)).updateTask(mockTask);
    }
}
