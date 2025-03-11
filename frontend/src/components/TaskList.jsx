import React, { useState, useEffect } from "react";
import { List, Button, Tag, Select } from "antd";
import useTasks from "../hooks/useTasks";
import AddTaskForm from "./AddTaskForm";
import ViewTaskModal from "./ViewTaskModal";
import dayjs from "dayjs";

const TaskList = ({isTaskModalOpen, setIsTaskModalOpen, fetchTasks }) => {
  const { tasks,  deleteTask, updateTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = (task, newStatus) => {
    const updatedTask = updateTask({ ...task, status: newStatus });
    updateTask(updatedTask);
    setSelectedTask(updatedTask); 
  };

  const handleTaskUpdate = async (updatedTask) => {
    setSelectedTask(updatedTask);
    await fetchTasks(); 
  };


  return (
    <div style={{ padding : "0 20px 50px 20px" }}>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            onClick={() => {
              setSelectedTask(task);
              setIsViewModalOpen(true);
            }}
            actions={[
              <span style={{ fontSize: "12px", color: "#888", paddingRight: "20px" }}>
              {task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD HH:mm:ss") : "없음"}
              </span>,
              <Button danger
                size="small"
                onClick={(e) =>{
                e.stopPropagation();
                deleteTask(task.id)
                }}
              >
                삭제
              </Button>,
            ]}
            style={{
              borderLeft: `5px solid ${
                task.priority === "high" ? "red" :
                task.priority === "medium" ? "orange" : "green"
              }`,
              padding: "10px",
            }}
          >
            <div>
              <Tag color={task.priority === "high" ? "red" : task.priority === "medium" ? "orange" : "green"}>
                {task.priority === "high" ? "높음" : task.priority === "medium" ? "보통" : "낮음"}
              </Tag>
              <strong>{task.title}</strong>{" "}
              <Select
                value={task.status}
                onClick={(e) => e.stopPropagation()}
                onChange={(newStatus) => handleStatusChange(task, newStatus)}
                size="small"
                style={{ width: "120px", marginLeft: "10px" }}
              >
                <Select.Option value="pending">🟡 대기 중</Select.Option>
                <Select.Option value="in-progress">🟢 진행 중</Select.Option>
                <Select.Option value="completed">🔵 완료</Select.Option>
              </Select>
            </div>
          </List.Item>
        )}
      />
      {/* ✅ Task Modal */}
      <ViewTaskModal
        visible={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        setTask={handleTaskUpdate}
      />
      <AddTaskForm
        visible={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        fetchTasks={fetchTasks}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};

export default TaskList;
