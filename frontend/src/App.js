import React, { useState } from "react";
import { FloatButton } from "antd";
import NoticeCalendar from "./components/Notice_Calendar";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import ChatWithLLMModal from "./components/ChatWithLLMModal"; // ✅ Import AI Chat Modal
import { OpenAIOutlined } from "@ant-design/icons";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [selectedTrip, setSelectedTrip] = useState(null); // Selected Trip for TaskList
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // ✅ AI Chat Modal State
  const [taskList, setTaskList] = useState([]); // ✅ To-Do List from AI suggestions

  // Function to add AI-generated tasks
  const handleAddTodo = (newTodos) => {
    setTaskList([...taskList, ...newTodos]); // ✅ Add new todos to the existing list
  };

  return (
    <div style={{ display: "flex", height: "100vh", transition: "margin 0.3s ease" }}>
      {/* Main Content (Calendar + Task List) */}
      <div
        style={{
          flex: 1,
          padding: "50px",
          transition: "margin-right 0.3s ease",
          marginRight: isSidebarOpen ? "400px" : "0px", // Push content when sidebar is open
        }}
      >
        {/* 📅 Calendar */}
        <NoticeCalendar />

        {/* 📌 Task List (Now includes AI-generated tasks) */}
        <TaskList />
      </div>

      {/* Sidebar (Collapsible, Right-Aligned) */}
      <div
        style={{
          width: isSidebarOpen ? "400px" : "0px", // Expand/Collapse Width
          transition: "width 0.3s ease",
          overflow: "hidden",
          background: "#f0f2f5",
          padding: isSidebarOpen ? "20px" : "0px",
          whiteSpace: "nowrap",
          boxShadow: isSidebarOpen ? "-2px 0px 5px rgba(0,0,0,0.1)" : "none",
          position: "absolute",
          right: 0,
          height: "100%",
        }}
      >
        {isSidebarOpen && <Sidebar setSelectedTrip={setSelectedTrip} />} {/* ✅ Sidebar Passes Trip Selection */}
      </div>

      {/* 📌 Sidebar Toggle Button */}
      <FloatButton
        type="primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        shape="square"
        icon={isSidebarOpen ? "x" : "📅"}
        style={{
          position: "absolute",
          right: isSidebarOpen ? "400px" : "0px", // Move with sidebar
          top: "50%",
          transform: "translateY(-50%)",
          height: "60px",
          transition: "right 0.3s ease",
        }}
      />

      {/* 📌 AI Chat Button */}
      <FloatButton
        icon={<OpenAIOutlined />}
        tooltip={<div>🤖AI와 대화하기</div>}
        style={{
          transition: "right 0.3s ease",
          right: isSidebarOpen ? "460px" : "30px",
        }}
        onClick={() => setIsChatModalOpen(true)} // ✅ Open AI Chat Modal
      />

      {/* ✅ AI Chat Modal */}
      <ChatWithLLMModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        onAddTodo={handleAddTodo} // ✅ Pass function to add AI tasks
      />
    </div>
  );
};

export default App;
