import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useItineraries = () => {
  const [itineraries, setItineraries] = useState([]);

  const fetchItineraries = async (tripIds) => {
    try {
      if (!tripIds || (Array.isArray(tripIds) && tripIds.length === 0)) {
        console.log("No trips selected, clearing itineraries.");
        setItineraries([]); // Reset itineraries when no trip is selected
        return;
      }

      // Ensure tripIds is always an array
      const tripIdArray = Array.isArray(tripIds) ? tripIds : [tripIds];

      console.log("Fetching itineraries for trip IDs:", tripIdArray);
      const requests = tripIdArray.map((tripId) => 
        axios.get(`${API_BASE_URL}/itinerary/trip/${tripId}`)
      );

      const responses = await Promise.all(requests);
      
      // Combine all responses into a single itinerary list
      const allItineraries = responses.flatMap((response) => 
        Array.isArray(response.data.data.result) ? response.data.data.result : []
      );

      console.log("Fetched itineraries:", allItineraries);
      setItineraries(allItineraries);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setItineraries([]); // Reset on failure
    }
  };

  const addItinerary = async (newItinerary) => {
    try {
      await axios.post(`${API_BASE_URL}/itinerary`, newItinerary);
      await fetchItineraries(newItinerary.tripId); // Refresh itineraries
    } catch (error) {
      console.error("Error adding itinerary:", error);
    }
  };

  
  const updateItinerary = async (updatedItinerary) => {
    try {
      await axios.put(`${API_BASE_URL}/itinerary`, updatedItinerary);
      await fetchItineraries();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const deleteItinerary = async (id, tripId) => {
    if (!tripId) return;
    try {
      await axios.delete(`${API_BASE_URL}/itinerary/${id}`);
      await fetchItineraries(tripId); // Refresh after delete
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  return { itineraries, fetchItineraries, addItinerary, updateItinerary, deleteItinerary };
};

export default useItineraries;
