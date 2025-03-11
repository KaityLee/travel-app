import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import useTrips from "../hooks/useTrips";
import dayjs from "dayjs";

const EditTripForm = ({ visible, onClose, trip, setTrip }) => {
  const { updateTrip, fetchTrips } = useTrips();
  const [form] = Form.useForm();

  useEffect(() => {
    if (trip) {
      form.setFieldsValue({
        tripName: trip.tripName,
        destination: trip.destination,
        startDate: trip.startDate ? dayjs(trip.startDate) : null,
        endDate: trip.endDate ? dayjs(trip.endDate) : null,
        notes: trip.notes || "",
      });
    }
  }, [trip, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      if (!trip?.id) {
        console.error("Error: Trip ID is missing!");
        return;
      }

      const updatedTrip = {
        id: trip.id,
        tripName: values.tripName,
        destination: values.destination,
        startDate: values.startDate ? values.startDate.format("YYYY-MM-DD") : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
        notes: values.notes || "",
      };

      await updateTrip(updatedTrip);
      setTrip(updatedTrip);
      fetchTrips();
      message.success("✅ 여행이 수정되었습니다!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Trip update failed:", error);
      message.error("🚨 여행 수정 실패!");
    }
  };

  return (
    <Modal title="✏️ 여행 수정" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="tripName" label="여행 이름" rules={[{ required: true, message: "이름을 입력하세요!" }]}>
          <Input placeholder="여행 이름 입력" />
        </Form.Item>
        <Form.Item name="destination" label="목적지" rules={[{ required: true, message: "여행지를 입력하세요!" }]}>
            <Input placeholder="여행 지역 입력" />
        </Form.Item>
        <Form.Item name="startDate" label="출발 날짜">
          <DatePicker />
        </Form.Item>
        <Form.Item name="endDate" label="도착 날짜">
          <DatePicker />
        </Form.Item>
        <Form.Item name="notes" label="메모">
            <Input.TextArea placeholder="추가로 기록할 것이 있나요?" />
        </Form.Item>
        <Button type="primary" onClick={handleUpdate} style={{ width: "100%" }}>
          ✅ 수정 완료
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTripForm;
