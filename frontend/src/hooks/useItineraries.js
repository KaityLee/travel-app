import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useItineraries = (tripId) => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    if (tripId) {
      fetchItineraries(tripId);
    } else {
      setItineraries([]); 
    }
  }, [tripId]);

  const fetchItineraries = async (tripId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/itinerary/${tripId}`);
      return response.data.data.result;
      // setItineraries(Array.isArray(response.data.data.result) ? response.data.data.result : []);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      // setItineraries([]);
      return [];
    }
  };

  const addItinerary = async (newItinerary) => {
    try {
      await axios.post(`${API_BASE_URL}/itinerary`, newItinerary);
      return fetchItineraries(newItinerary.tripId);
    } catch (error) {
      console.error("Error adding itinerary:", error);
    }
  };

  const deleteItinerary = async (id, tripId) => {
    if (!tripId) return;
    try {
      await axios.delete(`${API_BASE_URL}/itinerary/${id}`);
      return fetchItineraries(tripId);
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  return { itineraries, fetchItineraries, addItinerary, deleteItinerary };
};

export default useItineraries;
