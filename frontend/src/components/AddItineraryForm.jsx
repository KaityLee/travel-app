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
          message: "여행이 선택되지 않았습니다.",
          description: "일정을 추가하려면 먼저 여행을 선택하세요.",
        });
        return;
      }

      const values = await form.validateFields();
      await addItinerary({
        tripId: tripId, 
        dayNumber: values.day_number,
        title: values.title,
        description: values.description,
        timeSlot: values.time_slot ? values.time_slot.format("HH:mm:ss") : null,
        location: selectedLocation?.display_name || "", 
        latitude: selectedLocation?.lat || null,
        longitude: selectedLocation?.lon || null,
      });

      form.resetFields();
      setSearchResults([]);
      setSelectedLocation(null);
      onClose();
    } catch (error) {
      console.error("입력 검증 실패:", error);
    }
  };

  return (
    <Modal title="🗺️ 일정 추가" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="day_number" label="📅 여행 일차" rules={[{ required: true, message: "일차를 입력하세요." }]}>
          <InputNumber min={1} placeholder="예: 1" />
        </Form.Item>
        
        <Form.Item name="title" label="📌 일정 제목" rules={[{ required: true, message: "일정 제목을 입력하세요." }]}>
          <Input placeholder="일정 제목을 입력하세요" />
        </Form.Item>

        <Form.Item name="description" label="📝 일정 설명">
          <Input.TextArea placeholder="세부 일정을 입력하세요" />
        </Form.Item>

        <Form.Item name="time_slot" label="⏰ 시간 선택">
          <TimePicker format="HH:mm" placeholder="시간을 선택하세요" />
        </Form.Item>
        
        <Form.Item label="📍 위치 검색">
          <Input.Search 
            placeholder="장소를 입력하세요 (예: 파리, 에펠탑)" 
            onSearch={handleLocationSearch}
            enterButton
          />
        </Form.Item>

        {searchResults.length > 0 && (
          <List
            size="small"
            bordered
            dataSource={searchResults}
            renderItem={(location) => (
              <List.Item 
                onClick={() => setSelectedLocation(location)}
                style={{ 
                  cursor: "pointer", 
                  background: selectedLocation?.place_id === location.place_id ? "#e6f7ff" : "white" 
                }}
              >
                {location.display_name}
              </List.Item>
            )}
          />
        )}

        {selectedLocation && (
          <p><strong>선택된 위치:</strong> {selectedLocation.display_name}</p>
        )}

        <Button type="primary" onClick={handleSubmit} style={{ width: "100%" }}>
          ✅ 일정 추가
        </Button>
      </Form>
    </Modal>
  );
};

export default AddItineraryForm;