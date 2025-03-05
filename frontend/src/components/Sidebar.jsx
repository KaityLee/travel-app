import React, { useState } from "react";
import { List, Button, Divider, message, Popconfirm } from "antd";
import useTrips from "../hooks/useTrips";
import useItineraries from "../hooks/useItineraries";
import AddTripForm from "./AddTripForm";
import AddItineraryForm from "./AddItineraryForm";

const Sidebar = ({ setSelectedTrip }) => {
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  // const [itineraries, setItineraries] = useState([]);

  const { trips, addTrip, deleteTrip, fetchTrips } = useTrips();
  const { itineraries, fetchItineraries, addItinerary, deleteItinerary } = useItineraries();

  const [messageApi, contextHolder] = message.useMessage(); 

  const openGoogleMaps = (locationName) => {
    if (!locationName) {
      alert("No location available for this itinerary.");
      return;
    }
    const formattedLocation = encodeURIComponent(locationName); 
    window.open(`https://www.google.com/maps/search/?q=${formattedLocation}`, "_blank");
  };

  const handleSelectTrip = async (tripId) => {
    setSelectedTripId(tripId);
    setSelectedTrip(tripId); 
    await fetchItineraries(tripId); 
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
      messageApi.success("여행 및 일정이 삭제되었습니다.");

      if (selectedTripId === tripId) {
        setSelectedTripId(null);
        fetchItineraries([]);
      }
    } catch (error) {
      messageApi.error("삭제 중 오류가 발생했습니다.");
    }
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
            onClick={() => handleSelectTrip(trip.id)} 
            style={{
              cursor: "pointer",
              background: selectedTripId === trip.id ? "#e6f7ff" : "white",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "5px",
            }}
            actions={[
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
        addTrip={(trip) => {
          addTrip(trip);
          fetchTrips();
        }}
      />

      <Divider />
      <h3>📅 여행일정</h3>    
      <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          if (!selectedTripId) {
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
              <Button 
                danger size="small"
                onClick={async () => {
                  await deleteItinerary(itinerary.id, selectedTripId);
                  await fetchItineraries(selectedTripId);
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
          await addItinerary(itinerary, selectedTripId);
          await fetchItineraries(selectedTripId);
        }}
        tripId={selectedTripId}
      />
    </div>
  );
};

export default Sidebar;
