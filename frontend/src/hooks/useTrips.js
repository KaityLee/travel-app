import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trip`);


      setTrips(Array.isArray(response.data.data.result) ? response.data.data.result : []);
    } catch (error) {
      console.error("Error fetching trip:", error);
      setTrips([]);
    }
  };

  const addTrip = async (newTrip) => {
    try {
      await axios.post(`${API_BASE_URL}/trip`, newTrip);
      fetchTrips(); 
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/trip/${id}`);
      fetchTrips(); 
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return { trips, addTrip, deleteTrip };
};

export default useTrips;
