import React from "react";
import { Modal, Form, Input, DatePicker, Button, notification } from "antd";
import useTrips from "../hooks/useTrips";

const AddTripForm = ({ visible, onClose, addTrip }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("values:", values);

      await addTrip({
        tripName: values.trip_name,
        destination: values.destination,
        startDate: values.dates[0].format("YYYY-MM-DD"),
        endDate: values.dates[1].format("YYYY-MM-DD"),
        notes: values.notes || "",
      });

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("입력 검증 실패:", error);
    }
  };

  return (
    <Modal title="✈️ 여행 추가" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="trip_name" label="여행 이름" rules={[{ required: true, message: "이름을 입력하세요!" }]}>
          <Input placeholder="여행 이름 입력" />
        </Form.Item>
        <Form.Item name="destination" label="목적지" rules={[{ required: true, message: "여행지를 입력하세요!" }]}>
          <Input placeholder="여행 지역 입력" />
        </Form.Item>
        <Form.Item name="dates" label="Travel Dates" rules={[{ required: true }]}>
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="notes" label="메모">
            <Input.TextArea placeholder="추가로 기록할 것이 있나요?" />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} style={{ width: "100%" }}>
          Add Trip
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTripForm;
