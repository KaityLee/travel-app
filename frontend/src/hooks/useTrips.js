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
      const tripData = Array.isArray(response.data.data.result) ? response.data.data.result : [];
      setTrips(tripData);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]); 
    }
  };


  const addTrip = async (newTrip) => {
    try {
      await axios.post(`${API_BASE_URL}/trip`, newTrip);
      await fetchTrips(); 
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      await axios.put(`${API_BASE_URL}/trip`, updatedTrip);
      await fetchTrips();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/trip/${id}`);
      await fetchTrips(); // 
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return { trips, fetchTrips, addTrip, updateTrip, deleteTrip };
};

export default useTrips;
