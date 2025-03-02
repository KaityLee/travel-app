import React, { useState } from "react";
import { Button, FloatButton } from "antd";
import NoticeCalendar from "./components/Notice_Calendar";
import Sidebar from "./components/Sidebar";
import { OpenAIOutlined } from '@ant-design/icons';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  return (
    <div style={{ display: "flex", height: "100vh", transition: "margin 0.3s ease" }}>
      {/* Main Content (Calendar) */}
      <div
        style={{
          flex: 1,
          padding: "50px",
          transition: "margin-right 0.3s ease",
          marginRight: isSidebarOpen ? "300px" : "0px", // Push calendar when sidebar is open
        }}
      >
        <NoticeCalendar />
      </div>

      {/* Sidebar (Collapsible, Right-Aligned) */}
      <div
        style={{
          width: isSidebarOpen ? "300px" : "0px", // Expand/Collapse Width
          transition: "width 0.3s ease", // Smooth transition
          overflow: "hidden", // Prevent content overflow when closed
          background: "#f0f2f5", // Sidebar background
          padding: isSidebarOpen ? "20px" : "0px", // Hide padding when closed
          whiteSpace: "nowrap", // Prevent text wrapping
          boxShadow: isSidebarOpen ? "-2px 0px 5px rgba(0,0,0,0.1)" : "none",
          position: "absolute",
          right: 0, // Keep sidebar on the right
          height: "100%",
        }}
      >
        {isSidebarOpen && <Sidebar />} {/* Render Sidebar only when open */}
      </div>

      {/* Toggle Button (Attached to Sidebar Edge) */}
      <FloatButton
        type="primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        shape="square"
        icon={isSidebarOpen ? "x" : "📅"}
        style={{
          position: "absolute",
          right: isSidebarOpen ? "300px" : "0px", // Move with sidebar
          top: "50%",
          transform: "translateY(-50%)",
          // borderRadius: "4px 0 0 4px", // Rounded left side
          height: "60px",
          // fontSize: "16px",
          // padding: "10px 15px",
          transition: "right 0.3s ease",
        }}
      >
      </FloatButton>

      <FloatButton
        icon={<OpenAIOutlined />}
        style={{
          transition: "right 0.3s ease",
          right: isSidebarOpen ? "360px" : "30px"
        }}
      >
      </FloatButton>
    </div>
  );
};

export default App;
