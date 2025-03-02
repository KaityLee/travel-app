import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useItineraries = (tripId = null) => {
  const [itinerary, setItineraries] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, [tripId]);

  const fetchItineraries = async () => {
    try {
      const endpoint = tripId ? `${API_BASE_URL}/itinerary?trip_id=${tripId}` : `${API_BASE_URL}/itinerary`;
      const response = await axios.get(endpoint);
      setItineraries(response.data);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  };

  const addItinerary = async (newItinerary) => {
    try {
      await axios.post(`${API_BASE_URL}/itinerary`, { ...newItinerary, trip_id: tripId });
      fetchItineraries();
    } catch (error) {
      console.error("Error adding itinerary:", error);
    }
  };

  const deleteItinerary = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/itinerary/${id}`);
      fetchItineraries();
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  return { itinerary, addItinerary, deleteItinerary };
};

export default useItineraries;
