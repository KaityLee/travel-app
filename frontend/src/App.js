import React, { useState } from "react";
import { Button, FloatButton, Drawer, Layout, Menu, theme } from "antd";
import NoticeCalendar from "./components/Notice_Calendar";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import ChatWithLLMModal from "./components/ChatWithLLMModal"; 
import "./index.css";
import { OpenAIOutlined, DoubleRightOutlined, FormOutlined, RocketOutlined } from "@ant-design/icons";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null); 
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); 
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]); 

  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleAddTodo = (newTodos) => {
    setTaskList([...taskList, ...newTodos]); 
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "18px", marginRight: "20px" }}>
          Travel App
        </div>
        <Menu
          theme="dark"
          mode="horizontal"          
          style={{ flex: 1, minWidth: 0 }}
        >
        </Menu>
      </Header>
      <Content>
    <div style={{ display: "flex", height: "100vh", transition: "margin 0.3s ease" }}>
      {/* Main (Calendar + Task List) */}
      <div
        style={{
          flex: 1,
          padding: "40px 80px 0 80px",
          transition: "margin-right 0.3s ease",
          marginRight: isSidebarOpen ? "400px" : "0px"
        }}
      >
        <NoticeCalendar />
      </div>

      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? "400px" : "0px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          background: "#f0f2f5",
          padding: isSidebarOpen ? "20px" : "0px",
          whiteSpace: "nowrap",
          boxShadow: isSidebarOpen ? "-2px 0px 5px rgba(0,0,0,0.1)" : "none",
          position: "absolute",
          right: 0,
          height: "200%",
        }}
      >
        {isSidebarOpen && <Sidebar setSelectedTrip={setSelectedTrip} />} 
      </div>

      {/* 📌 Sidebar Button */}
      <FloatButton
        type="primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        shape="square"
        icon={isSidebarOpen ? <DoubleRightOutlined /> : <RocketOutlined />}
        style={{
          position: "fixed",
          right: isSidebarOpen ? "380px" : "20px", 
          top: "50%",
          transform: "translateY(-50%)",
          height: "60px",
          transition: "right 0.3s ease",
        }}
      />

      {/* 📌 Task List Button */}
      {!isTaskListOpen && (
        <FloatButton
          type="primary"
          icon={<FormOutlined />} 
          tooltip={<div>📝 To-Do 리스트</div>}
          shape="square"
          style={{
            transition: "bottom 0.3s ease",
            position: "fixed",
            top: "90%",
            // bottom: "80px", // ✅ Keep it near the bottom
            right: "50%",
            // right: "30px", // ✅ Position it properly
          }}
          onClick={() => setIsTaskListOpen(true)} // ✅ Open Task List Drawer
        />
      )}

      {/* Task List Drawer */}
      <Drawer
        title="📝 To-Do 리스트"
        placement="bottom" 
        closable={true}
        onClose={() => setIsTaskListOpen(false)} 
        open={isTaskListOpen} 
        height={450} 
        extra={ 
          <Button type="primary" onClick={() => setIsTaskModalOpen(true)}>
            + 할 일 추가
          </Button>
        }
      >
        <TaskList 
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen} 
        />
        <FloatButton
          icon={<OpenAIOutlined />}
          tooltip={<div>🤖AI와 대화하기</div>}
          style={{
            transition: "right 0.3s ease",
            right: isSidebarOpen ? "460px" : "30px",
          }}
          onClick={() => setIsChatModalOpen(true)} 
        />
      </Drawer>

      {/* 📌 AI Chat Button */}
      <FloatButton
        icon={<OpenAIOutlined />}
        tooltip={<div>🤖AI와 대화하기</div>}
        style={{
          transition: "right 0.3s ease",
          right: isSidebarOpen ? "460px" : "30px",
        }}
        onClick={() => setIsChatModalOpen(true)} 
      />

      <ChatWithLLMModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        onAddTodo={handleAddTodo}
      />
    </div>
    </Content>
      <Footer style={{ textAlign: 'center' }}>
        Travel-App ©{new Date().getFullYear()} Created by Kaity
      </Footer>
    </Layout>
  );
};

export default App;
