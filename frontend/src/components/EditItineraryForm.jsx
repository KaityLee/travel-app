import React, { useState, useEffect } from "react";
import { Modal, Form, Input, TimePicker, Button, InputNumber, List, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const NominatimAPI = "https://nominatim.openstreetmap.org/search?format=json&q=";

const EditItineraryForm = ({ visible, onClose, itinerary, updateItinerary }) => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (itinerary) {
      form.setFieldsValue({
        day_number: itinerary.dayNumber,
        title: itinerary.title,
        description: itinerary.description,
        time_slot: itinerary.timeSlot ? dayjs(itinerary.timeSlot, "HH:mm:ss") : null,
      });
      setSelectedLocation({
        display_name: itinerary.location,
        lat: itinerary.latitude,
        lon: itinerary.longitude,
      });
    }
  }, [itinerary]);

  const handleLocationSearch = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(`${NominatimAPI}${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("위치 검색 오류:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      await updateItinerary({
        id: itinerary.id, 
        tripId: itinerary.tripId, 
        dayNumber: values.day_number,
        title: values.title,
        description: values.description,
        timeSlot: values.time_slot ? values.time_slot.format("HH:mm:ss") : null,
        location: selectedLocation?.display_name || itinerary.location,
        latitude: selectedLocation?.lat || itinerary.latitude,
        longitude: selectedLocation?.lon || itinerary.longitude,
      });

      notification.success({ message: "일정이 성공적으로 수정되었습니다!" });
      onClose();
    } catch (error) {
      console.error("일정 수정 실패:", error);
    }
  };

  return (
    <Modal title="✏️ 일정 수정" open={visible} onCancel={onClose} footer={null}>
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

        {/* ✅ 장소 검색 */}
        <Form.Item label="📍 위치 검색">
          <Input.Search
            placeholder="장소를 입력하세요 (예: 파리, 에펠탑)"
            onSearch={handleLocationSearch}
            enterButton
          />
        </Form.Item>

        {/* ✅ 위치 검색 결과 */}
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
                  background: selectedLocation?.place_id === location.place_id ? "#e6f7ff" : "white",
                }}
              >
                {location.display_name}
              </List.Item>
            )}
          />
        )}

        {/* ✅ 선택된 위치 표시 */}
        {selectedLocation && <p><strong>선택된 위치:</strong> {selectedLocation.display_name}</p>}

        <Button type="primary" onClick={handleUpdate} style={{ width: "100%" }}>
          ✅ 일정 수정 완료
        </Button>
      </Form>
    </Modal>
  );
};

export default EditItineraryForm;
