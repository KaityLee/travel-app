import React from "react";
import { Modal, Form, Input, DatePicker, Button, notification } from "antd";
import useTrips from "../hooks/useTrips";

const AddTripForm = ({ visible, onClose, addTrip }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
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
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Add Travel Plan" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="trip_name" label="Trip Name" rules={[{ required: true }]}>
          <Input placeholder="Enter trip name" />
        </Form.Item>
        <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
          <Input placeholder="Enter destination" />
        </Form.Item>
        <Form.Item name="dates" label="Travel Dates" rules={[{ required: true }]}>
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea placeholder="Any additional notes?" />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Add Trip
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTripForm;
