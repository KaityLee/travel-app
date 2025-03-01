import React from "react";
import { DatePicker } from "antd";
import NoticeCalendar from "./components/Notice_Calendar";
import Sidebar from "./components/Sidebar"; // Import Sidebar

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <NoticeCalendar /> {/* Your existing Calendar component */}
      </div>
      <Sidebar />
    </div>
  );
};

export default App;
