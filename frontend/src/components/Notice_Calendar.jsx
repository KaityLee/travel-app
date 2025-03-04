import React, { useEffect, useState } from "react";
import { Calendar, Select, Row, Col, Badge } from "antd";
import CurrencySelector from "./CurrencySelector"; 
import useTrips from "../hooks/useTrips"; 
import useTasks from "../hooks/useTasks";
import useItineraries from "../hooks/useItineraries";

const NoticeCalendar = () => {
  const { trips } = useTrips();
  const { tasks } = useTasks();
  const { fetchItineraries } = useItineraries();
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        const allItineraries = await Promise.all(trips.map((trip) => fetchItineraries(trip.id)));
        setItineraries(allItineraries.flat());
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    if (trips.length > 0) {
      loadItineraries();
    }
  }, [trips]);

  const safeTrips = Array.isArray(trips) ? trips : [];
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeItineraries = Array.isArray(itineraries) ? itineraries : [];

  // ✅ Function to calculate full itinerary date
  const getFullItineraryDate = (itinerary) => {
    const trip = safeTrips.find((trip) => trip.id === itinerary.tripId);
    if (!trip) return null;

    const tripStartDate = new Date(trip.startDate); // Convert to Date object
    const itineraryDate = new Date(tripStartDate);
    itineraryDate.setDate(tripStartDate.getDate() + (itinerary.dayNumber - 1)); // ✅ Add dayNumber

    return itineraryDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
  };

  const cellRender = (current, info) => {
    if (info.type !== "date") return info.originNode;

    const dateString = current.format("YYYY-MM-DD");

    const travelEvents = safeTrips.filter(
      (trip) => dateString >= trip.startDate && dateString <= trip.endDate
    );

    const taskEvents = safeTasks.filter(
      (task) => task.due_date?.slice(0, 10) === dateString
    );

    const itineraryEvents = safeItineraries.filter(
      (itinerary) => getFullItineraryDate(itinerary) === dateString
    );
    const hasTravel = travelEvents.length > 0;
    const hasTasks = taskEvents.length > 0;
    const hasItinerary = itineraryEvents.length > 0;
  
    let backgroundColor = "white"; // Default
    if (hasTravel) backgroundColor = "#e0f7fa"; // Light blue for trips
    if (hasTasks) backgroundColor = "#ffebee"; // Light red for tasks
    if (hasItinerary) backgroundColor = "#ede7f6"; // Light purple for itineraries
  
    return (
      <div
        style={{
          backgroundColor, // ✅ Apply row background color
          borderRadius: "5px",
        }}
      >
        <div className="custom-cell-content">
          {travelEvents.map((trip, index) => (
            <p key={`trip-${index}`} style={{ fontWeight: "bold" }}>
              ✈️ {trip.tripName}
            </p>
          ))}
          {taskEvents.map((task, index) => (
            <p key={`task-${index}`} style={{ fontWeight: "bold" }}>
              📌 {task.title} ({task.status})
            </p>
          ))}
          {itineraryEvents.map((itinerary, index) => (
            <p key={`itinerary-${index}`}>
              📍 Day {itinerary.dayNumber}: {itinerary.title} ({itinerary.timeSlot})
            </p>
          ))}
        </div>
      </div>
    );
  };

  const customHeader = ({ value, onChange }) => {
    const year = value.year();
    const month = value.month();

    return (
      <Row justify="space-between" align="middle" style={{ padding: "10px 20px" }}>
        <Col>
          <h3>{value.format("YYYY년 MM월")}</h3>
        </Col>

        <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Select
            value={year}
            onChange={(newYear) => onChange(value.clone().year(newYear))}
            style={{ width: 100 }}
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
              <Select.Option key={y} value={y}>
                {y}년
              </Select.Option>
            ))}
          </Select>

          <Select
            value={month}
            onChange={(newMonth) => onChange(value.clone().month(newMonth))}
            style={{ width: 100 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Select.Option key={i} value={i}>
                {i + 1}월
              </Select.Option>
            ))}
          </Select>

          <CurrencySelector />
        </Col>
      </Row>
    );
  };

  return <Calendar headerRender={customHeader} cellRender={cellRender} />;
};

export default NoticeCalendar;
