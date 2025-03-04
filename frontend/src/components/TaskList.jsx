import React, { useState } from "react";
import { List, Button, Divider } from "antd";
import useTasks from "../hooks/useTasks";
import AddTaskForm from "./AddTaskForm";

const TaskList = ({ selectedTrip }) => {
  const { tasks, deleteTask } = useTasks(selectedTrip);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  if (!selectedTrip) return null; // ✅ Don't show tasks if no trip is selected

  return (
    <div style={{ background: "#f5f5f5", borderRadius: "8px" }}>
      <Divider />
      <h3>📌 Tasks for Trip</h3>
      <Button type="primary" onClick={() => setIsTaskModalOpen(true)}>
        + Add Task
      </Button>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button danger size="small" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>,
            ]}
          >
            <strong>{task.title}</strong> ({task.status})
          </List.Item>
        )}
      />
      <AddTaskForm visible={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} tripId={selectedTrip} />
    </div>
  );
};

export default TaskList;
