import React, { useState } from "react";
import { List, Button, Divider } from "antd";
import useTrips from "../hooks/useTrips";
import useTasks from "../hooks/useTasks";
import useItineraries from "../hooks/useItineraries"; // ✅ Import Itinerary Hook
import AddTaskForm from "./AddTaskForm";
import AddTripForm from "./AddTripForm";
import AddItineraryForm from "./AddItineraryForm";

const Sidebar = () => {
  const { trips, deleteTrip } = useTrips();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { tasks, deleteTask } = useTasks(selectedTrip);
  const { itineraries, deleteItinerary } = useItineraries(selectedTrip); // ✅ Use Itinerary Hook
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

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
            actions={[
              <Button size="small" onClick={() => setSelectedTrip(trip.id)}>
                View Details
              </Button>,
              <Button danger size="small" onClick={() => deleteTrip(trip.id)}>
                Delete
              </Button>,
            ]}
          >
            <strong>{trip.trip_name}</strong> ({trip.start_date} → {trip.end_date})
          </List.Item>
        )}
      />
      <AddTripForm visible={isTripModalOpen} onClose={() => setIsTripModalOpen(false)} />

      {selectedTrip && (
        <>
          <Divider />
          <h3>📌 Tasks for Trip</h3>
          <Button type="primary" onClick={() => setIsTaskModalOpen(true)}>
            + Add Task
          </Button>
          <List
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item
                actions={[
                  <Button danger size="small" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <strong>{task.title}</strong> ({task.status})
              </List.Item>
            )}
          />
          <AddTaskForm visible={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} tripId={selectedTrip} />

          <Divider />
          <h3>📅 Itinerary</h3>
          <Button type="primary" onClick={() => setIsItineraryModalOpen(true)}>
            + Add Itinerary
          </Button>
          <List
            dataSource={itineraries}
            renderItem={(itinerary) => (
              <List.Item
                actions={[
                  <Button danger size="small" onClick={() => deleteItinerary(itinerary.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <strong>Day {itinerary.day_number}: {itinerary.title}</strong> ({itinerary.time_slot})
              </List.Item>
            )}
          />
          <AddItineraryForm
            visible={isItineraryModalOpen}
            onClose={() => setIsItineraryModalOpen(false)}
            tripId={selectedTrip}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
