import React, { useState, useEffect } from "react";
import { List, Button, Divider, Tag, Select } from "antd";
import useTasks from "../hooks/useTasks";
import AddTaskForm from "./AddTaskForm";
import ViewTaskModal from "./ViewTaskModal";

const TaskList = ({isTaskModalOpen, setIsTaskModalOpen }) => {
  const { tasks, fetchTasks, deleteTask, updateStatusTask } = useTasks();
  // const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks(); // ✅ Fetch tasks when the component loads
  }, []);

  return (
    <div style={{ padding : "0 20px 50px 20px" }}>
      

      {/* ✅ Task List */}
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            onClick={() => {
              setSelectedTask(task);
              setIsViewModalOpen(true);
            }}
            actions={[
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
                onChange={(newStatus) => updateStatusTask(task.id, newStatus)}
                size="small"
                style={{ width: "120px", marginLeft: "10px" }}
              >
                <Select.Option value="pending">🟡 대기 중</Select.Option>
                <Select.Option value="in-progress">🟢 진행 중</Select.Option>
                <Select.Option value="completed">🔵 완료</Select.Option>
              </Select>
            </div>
            <small>마감 기한: {task.due_date || "없음"}</small>
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
      />
      <AddTaskForm
       visible={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};

export default TaskList;
