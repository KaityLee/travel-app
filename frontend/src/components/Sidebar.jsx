import React, { useEffect, useState } from "react";
import { List } from "antd";
import axios from "axios";

const Sidebar = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events"); // Fetch task data
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ width: "300px", padding: "20px", borderRight: "1px solid #ddd", height: "100vh", overflowY: "auto" }}>
      <h2>Agenda</h2>
      <List
        dataSource={Object.entries(events)}
        renderItem={([date, tasks]) => (
          <List.Item>
            <div>
              <strong>{date}</strong>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>{task.content}</li>
                ))}
              </ul>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Sidebar;
