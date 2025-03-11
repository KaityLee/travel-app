import { Modal, Input, Button, List, Checkbox, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import useTasks from "../hooks/useTasks";

const ChatWithLLMModal = ({ isOpen, onClose, onAddTodo }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedTasks, setSuggestedTasks] = useState([]); 
  const [selectedTasks, setSelectedTasks] = useState([]); 
  const chatEndRef = useRef(null);
  const { tasks, addTask, fetchTasks } = useTasks();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newChatHistory = [...chatHistory, { sender: "user", text: userInput }];
    setChatHistory(newChatHistory);
    setUserInput("");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions", // ✅ Groq API
        {
          model: "qwen-2.5-32b", 
          messages: [
            { role: "system", content: "당신은 사용자의 할 일을 정리하는 것을 도와주는 AI 비서입니다. 사용자가 추천할 작업을 요청하면 먼저 제안을 요약한 한문장을 줍니다. ':' 기호 이후에, 목록 형식으로 추천사항을 응답하세요. 목록은 반드시 '- ' 기호로 시작해야 합니다. 예를 들어:\n- 비행기 표 예약하기\n- 짐 싸기\n- 여행 일정 확인하기\n- 예산 계획 세우기\n이런 형식으로 대답하세요. 항상 한국어로 대답하세요." },
            { role: "user", content: userInput }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer [API_KEY]`, 
            "Content-Type": "application/json",
          },
        }
      );

      const llmReply = response.data.choices[0].message.content;
      newChatHistory.push({ sender: "llm", text: llmReply });

      const recommendedTasks = extractTasksFromResponse(llmReply);
      setSuggestedTasks(recommendedTasks);
      setChatHistory([...newChatHistory]);
    } catch (error) {
      console.error("Groq API error:", error);
      message.error("Failed to get response from AI.");
    }
  };

  const extractTasksFromResponse = (responseText) => {
    return responseText.includes(":")
      ? responseText
        .split("\n") 
        .map((line) => line.trim()) 
        .filter((line) => line.startsWith("- ")) 
        .map((task) => task.replace("- ", ""))
      : [];
  };

  const handleTaskSelection = (task) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const handleAddSelectedTasks = async () => {
    if (selectedTasks.length === 0) {
      message.warning("추가할 항목을 선택하세요.");
      return;
    }

    const tasksToAdd = selectedTasks.map((task) => ({
      title: task,
      description: "",
      dueDate: null, 
      status: "pending",
      priority: "medium",
    }));

    try {
      await addTask(tasksToAdd); 
      await fetchTasks();
      message.success("성공적으로 추가되었습니다.");
      setSelectedTasks([]); 
      // setSuggestedTasks([]); 
      // onAddTodo(); 
      onClose(); 
    } catch (error) {
      message.error("할 일 추가 중 오류 발생");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  

  return (
    <Modal
      title="🤖AI와 대화하기"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000} 
      style={{ top: 50 }} 
    >
      <div
        style={{
          height: "400px", 
          overflowY: "auto",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <List
          dataSource={chatHistory}
          renderItem={(msg) => (
            <List.Item style={{ border: "none", display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  maxWidth: "70%",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: msg.sender === "user" ? "#1890ff" : "#fff",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  textAlign: "left",
                }}
              >
                {msg.text}
              </div>
            </List.Item>
          )}
        />
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <Input.TextArea
          rows={2}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Type a message..."
          style={{ flex: 1, borderRadius: "8px" }}
        />
        <Button type="primary" onClick={handleSendMessage} icon={<SendOutlined />} style={{ marginLeft: "10px" }} />
      </div>

      {suggestedTasks.length > 0 && (
        <>
          <h4 style={{ marginTop: "15px" }}>AI 추천 목록 :</h4>
          <List
            bordered
            dataSource={suggestedTasks}
            renderItem={(item) => (
              <List.Item>
                <Checkbox 
                  checked={selectedTasks.includes(item)}
                  onChange={() => handleTaskSelection(item)}
                >
                  {item}
                </Checkbox>
              </List.Item>
            )}
          />
          <Button type="primary" onClick={handleAddSelectedTasks} style={{ marginTop: "10px", width: "100%" }}>
            할일에 추가하기
          </Button>
        </>
      )}
    </Modal>
  );
};

export default ChatWithLLMModal;
