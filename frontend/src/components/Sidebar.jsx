import React, { useState, useEffect } from "react";
import { List, Button, Divider, message, Popconfirm } from "antd";
import useTrips from "../hooks/useTrips";
import useItineraries from "../hooks/useItineraries";
import AddTripForm from "./AddTripForm";
import EditTripForm from "./EditTripForm";
import AddItineraryForm from "./AddItineraryForm";
import EditItineraryForm from "./EditItineraryForm";

const Sidebar = ({ setSelectedTrip }) => {
  const [selectedTrip, setSelectedTripState] = useState(null);
  const { trips, fetchTrips, addTrip, updateTrip, deleteTrip } = useTrips();
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const { itineraries, fetchItineraries, addItinerary, updateItinerary, deleteItinerary } = useItineraries();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (selectedTrip) {
      fetchItineraries(selectedTrip.id); // ✅ Load itineraries when trip is selected
    }
  }, [selectedTrip]);

  const openGoogleMaps = (locationName) => {
    if (!locationName) {
      alert("No location available for this itinerary.");
      return;
    }
    const formattedLocation = encodeURIComponent(locationName); 
    window.open(`https://www.google.com/maps/search/?q=${formattedLocation}`, "_blank");
  };

  const handleSelectTrip = async (trip) => {
    setSelectedTripState(trip);
    setSelectedTrip(trip); 
    await fetchItineraries(trip.id);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
      messageApi.success("여행 및 일정이 삭제되었습니다.");
      await fetchTrips(); 

      if (selectedTrip?.id === tripId) {
        setSelectedTripState(null);
      }
    } catch (error) {
      messageApi.error("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setIsEditTripModalOpen(true);
  };

  const handleEditClick = (itinerary) => {
    setEditingItinerary(itinerary);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <h2>✈️ 여행 계획</h2>
      <Button type="primary" onClick={() => setIsTripModalOpen(true)}>
        + 새로운 여행
      </Button>
      <List
        dataSource={trips}
        renderItem={(trip) => (
          <List.Item
            onClick={() => handleSelectTrip(trip)} 
            style={{
              cursor: "pointer",
              background: selectedTrip?.id === trip.id ? "#e6f7ff" : "white",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "5px",
            }}
            actions={[
              <Button size="small" onClick={() => handleEditTrip(trip)}>
                Edit
              </Button>,
              <Popconfirm
                title="여행 삭제"
                description="이 여행과 관련된 일정이 모두 삭제됩니다. 계속하시겠습니까?"
                onConfirm={() => handleDeleteTrip(trip.id)} 
                onCancel={() => messageApi.info("삭제가 취소되었습니다.")} 
                okText="예"
                cancelText="아니요"
              >
                <Button danger size="small">Delete</Button>
              </Popconfirm>,
            ]}
          >
            <strong>{trip.tripName}</strong> ({trip.startDate} → {trip.endDate})
          </List.Item>
        )}
      />

      <AddTripForm 
        visible={isTripModalOpen} 
        onClose={() => setIsTripModalOpen(false)}
        addTrip={async (trip) => {
          await addTrip(trip);
          await fetchTrips();
        }}
      />

      <EditTripForm
        visible={isEditTripModalOpen}
        onClose={() => setIsEditTripModalOpen(false)} 
        trip={editingTrip} 
        setTrip={async (updatedTrip) => {
          await updateTrip(updatedTrip);
          await fetchTrips(); 
        }}
      />
      
      <Divider />
      <h3>📅 여행일정</h3>    
      <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          if (!selectedTrip) {
            messageApi.warning("여행을 선택해주세요.");
            return;
          }
          setIsItineraryModalOpen(true);
        }}
      >
        + 일정 추가
      </Button>
      </>

      <List
        dataSource={itineraries} 
        renderItem={(itinerary) => (
          <List.Item
            actions={[
              <Button 
              type="link" 
              onClick={() => openGoogleMaps(itinerary.location)}
              disabled={!itinerary.location}
              >
              📍 구글맵 위치 보기
              </Button>,
              <Button size="small" onClick={() => handleEditClick(itinerary)}>
                Edit
              </Button>,
              <Button 
                danger size="small"
                onClick={async () => {
                  await deleteItinerary(itinerary.id, selectedTrip.id);
                  await fetchItineraries(selectedTrip.id);
                }}>
                Delete
              </Button>,
            ]}
          >
            <strong>Day {itinerary.dayNumber}: {itinerary.title}</strong> {itinerary.timeSlot}
          </List.Item>
        )}
      />
      <AddItineraryForm
        visible={isItineraryModalOpen}
        onClose={() => setIsItineraryModalOpen(false)}
        addItinerary={async (itinerary) => {
          await addItinerary(itinerary);
          await fetchItineraries(selectedTrip.id);
        }}
        tripId={selectedTrip?.id}
      />
      <EditItineraryForm
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        itinerary={editingItinerary}
        updateItinerary={async (updatedItinerary) => {
          await updateItinerary(updatedItinerary);
          await fetchItineraries(selectedTrip.id);
        }}
      />
    </div>
  );
};

export default Sidebar;
