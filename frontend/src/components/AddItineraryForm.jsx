import React from "react";
import { Modal, Form, Input, TimePicker, Button, InputNumber } from "antd";

const AddItineraryForm = ({ visible, onClose, tripId, addItinerary }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await addItinerary({
        day_number: values.day_number,
        title: values.title,
        description: values.description,
        time_slot: values.time_slot ? values.time_slot.format("HH:mm:ss") : null,
        location: values.location,
      });
      form.resetFields();
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
        <Form.Item name="location" label="Location">
          <Input placeholder="Enter location" />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Add Itinerary
        </Button>
      </Form>
    </Modal>
  );
};

export default AddItineraryForm;
