import React, { useState } from "react";
import { List, Button, Divider } from "antd";
import useTrips from "../hooks/useTrips";
import useItineraries from "../hooks/useItineraries";
import AddTripForm from "./AddTripForm";
import AddItineraryForm from "./AddItineraryForm";

const Sidebar = ({ setSelectedTrip }) => {
  const { trips, addTrip, deleteTrip } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState(null);
  const { fetchItineraries, addItinerary, deleteItinerary } = useItineraries();
  const [itineraries, setItineraries] = useState([]); // ✅ Ensure itineraries is an array
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  const openGoogleMaps = (locationName) => {
    if (!locationName) {
      alert("No location available for this itinerary.");
      return;
    }
    const formattedLocation = encodeURIComponent(locationName); // ✅ Ensure safe URL encoding
    window.open(`https://www.google.com/maps/search/?q=${formattedLocation}`, "_blank");
  };
  
  return (
    <div>
      <h2>✈️ Travel Plans</h2>
      <Button type="primary" onClick={() => setIsTripModalOpen(true)}>
        + Add Trip
      </Button>
      <List
        dataSource={trips}
        renderItem={(trip) => (
          <List.Item
            onClick={async () => {
              setSelectedTrip(trip.id);
              setSelectedTripId(trip.id);
              const tripItineraries = await fetchItineraries(trip.id);
              setItineraries(Array.isArray(tripItineraries) ? tripItineraries : []); // ✅ Ensure it's an array
            }}
            style={{
              cursor: "pointer",
              background: selectedTripId === trip.id ? "#e6f7ff" : "white",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "5px",
            }}
            actions={[
              <Button danger size="small" onClick={(e) => {
                e.stopPropagation();
                deleteTrip(trip.id);
              }}>
                Delete
              </Button>,
            ]}
          >
            <strong>{trip.tripName}</strong> ({trip.startDate} → {trip.endDate})
          </List.Item>
        )}
      />
      <AddTripForm 
        visible={isTripModalOpen} 
        onClose={() => setIsTripModalOpen(false)}
        addTrip={addTrip}
      />

      <Divider />
      <h3>📅 Itinerary</h3>
      <Button
        type="primary"
        onClick={() => {
          if (!selectedTripId) {
            alert("Please select a trip first!");
            return;
          }
          setIsItineraryModalOpen(true);
        }}
      >
        + Add Itinerary
      </Button>
      <List
        dataSource={itineraries} // ✅ Use `itineraries` instead of `fetchItineraries`
        renderItem={(itinerary) => (
          <List.Item
            actions={[
              <Button 
              type="link" 
              onClick={() => openGoogleMaps(itinerary.location)} // ✅ Search by location name
              disabled={!itinerary.location}
              >
              📍 구글맵 위치 보기
              </Button>,
              <Button danger size="small" onClick={() => deleteItinerary(itinerary.id, selectedTripId)}>
                Delete
              </Button>,
            ]}
          >
            <strong>Day {itinerary.dayNumber}: {itinerary.title}</strong> ({itinerary.timeSlot})
          </List.Item>
        )}
      />
      <AddItineraryForm
        visible={isItineraryModalOpen}
        onClose={() => setIsItineraryModalOpen(false)}
        addItinerary={addItinerary}
        tripId={selectedTripId}
      />
    </div>
  );
};

export default Sidebar;
