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
            axios.post(`${API_BASE_URL}/task`, task)
          )
        );
      } else {
        await axios.post(`${API_BASE_URL}/task`, newTasks);
      }
      await fetchTasks(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  const updateTask = async (updatedTask) => {
    if (!updatedTask.id) {
      console.error("Error: Cannot update task without an ID!");
      return;
    }

    try {
      console.log("updatedTask dueDate:", updatedTask.dueDate);

      await axios.put(`${API_BASE_URL}/task`, updatedTask);
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

  return { tasks, fetchTasks, addTask, updateTask, deleteTask };
};

export default useTasks;
