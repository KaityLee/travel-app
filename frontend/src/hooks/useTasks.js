import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task`);
      setTasks(Array.isArray(response.data.data.result) ? response.data.data.result : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const addTask = async (newTasks) => {
    try {
      if (Array.isArray(newTasks)) {
        await Promise.all(
          newTasks.map((task) =>
            axios.post(`${API_BASE_URL}/task`, {
              title: task,
              description: "",
              dueDate: null, 
              status: "pending",
              priority: "medium",
            })
          )
        );
      } else {
        await axios.post(`${API_BASE_URL}/task`, newTasks);
      }
      fetchTasks(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedFields) => {
    if (!id) {
      console.error("Error: Cannot update task without an ID!");
      return;
    }
  
    try {
      console.log("Updating Task with ID:", id); // ✅ Debugging
      console.log("Updated Fields:", updatedFields); // ✅ Debugging
  
      await axios.patch(`${API_BASE_URL}/task/${id}`, updatedFields);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const updateStatusTask = async (id, updatedStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/task/${id}`, {
        status: updatedStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, fetchTasks, addTask, updateTask, updateStatusTask, deleteTask };
};

export default useTasks;
