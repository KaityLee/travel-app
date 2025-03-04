import React, { useState } from "react";
import { Modal, Form, Input, TimePicker, Button, InputNumber, List, notification } from "antd";
import axios from "axios";

const NominatimAPI = "https://nominatim.openstreetmap.org/search?format=json&q=";

const AddItineraryForm = ({ visible, onClose, tripId, addItinerary }) => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleLocationSearch = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(`${NominatimAPI}${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!tripId) {
        notification.error({
          message: "No Trip Selected",
          description: "You must select a trip before adding an itinerary.",
        });
        return;
      }

      const values = await form.validateFields();
      await addItinerary({
        tripId: tripId, // ✅ Attach tripId to itinerary
        dayNumber: values.day_number,
        title: values.title,
        description: values.description,
        timeSlot: values.time_slot ? values.time_slot.format("HH:mm:ss") : null,
        location: selectedLocation.display_name, // ✅ Store location name
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lon,
      });


      form.resetFields();
      setSearchResults([]);
      setSelectedLocation(null);
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Add Itinerary" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="day_number" label="Day Number" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="title" label="Itinerary Title" rules={[{ required: true }]}>
          <Input placeholder="Enter itinerary title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Details of the plan" />
        </Form.Item>
        <Form.Item name="time_slot" label="Time Slot">
          <TimePicker format="HH:mm" />
        </Form.Item>
        
        {/* ✅ Location Search */}
        <Form.Item label="Search Location">
          <Input.Search 
            placeholder="Enter a place (e.g., Paris, Eiffel Tower)" 
            onSearch={handleLocationSearch}
            enterButton
          />
        </Form.Item>

        {/* ✅ Location Selection */}
        {searchResults.length > 0 && (
          <List
            size="small"
            bordered
            dataSource={searchResults}
            renderItem={(location) => (
              <List.Item 
                onClick={() => setSelectedLocation(location)}
                style={{ cursor: "pointer", background: selectedLocation?.place_id === location.place_id ? "#e6f7ff" : "white" }}
              >
                {location.display_name}
              </List.Item>
            )}
          />
        )}

        {/* ✅ Show Selected Location */}
        {selectedLocation && (
          <p><strong>Selected:</strong> {selectedLocation.display_name}</p>
        )}

        <Button type="primary" onClick={handleSubmit}>
          Add Itinerary
        </Button>
      </Form>
    </Modal>
  );
};

export default AddItineraryForm;