import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useTasks = (tripId = null) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [tripId]);

  const fetchTasks = async () => {
    try {
      const endpoint = tripId ? `${API_BASE_URL}/task?trip_id=${tripId}` : `${API_BASE_URL}/task`;
      const response = await axios.get(endpoint);
      setTasks(Array.isArray(response.data)? response.data : []);
    } catch (error) {
      console.error("Error fetching task:", error);
      setTasks([]);
    }
  };

  const addTask = async (newTask) => {
    try {
      await axios.post(`${API_BASE_URL}/task`, newTask);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return { tasks, addTask, deleteTask };
};

export default useTasks;
