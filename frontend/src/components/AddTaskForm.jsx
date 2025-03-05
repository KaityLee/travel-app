import React from "react";
import { Modal, Form, Input, DatePicker, Button, Select } from "antd";
import useTasks from "../hooks/useTasks";

const AddTaskForm = ({ visible, onClose }) => {
  const { addTask } = useTasks();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await addTask({
        title: values.title,
        description: values.description || "",
        dueDate: values.due_date ? values.due_date.format("YYYY-MM-DD HH:mm:ss") : null,
        status: values.status? values.status : "pending",
        priority: values.priority? values.priority : "medium",
      });
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="📌 할 일 추가" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="제목" rules={[{ required: true }]}>
          <Input placeholder="할 일 제목을 입력하세요" />
        </Form.Item>
        <Form.Item name="description" label="설명">
          <Input.TextArea placeholder="세부 사항 (선택사항)" />
        </Form.Item>
        <Form.Item name="due_date" label="마감 기한">
          <DatePicker showTime placeholder="선택하지 않아도 됩니다" />
        </Form.Item>
        <Form.Item name="status" label="진행 상태" >
          <Select>
            <Select.Option value="pending">🟡 대기 중</Select.Option>
            <Select.Option value="in-progress">🟢 진행 중</Select.Option>
            <Select.Option value="completed">🔵 완료</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="우선 순위" >
          <Select>
            <Select.Option value="low">🟢 낮음</Select.Option>
            <Select.Option value="medium">🟡 보통</Select.Option>
            <Select.Option value="high">🔴 높음</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} style={{ width: "100%" }}>
          ✅ 추가하기
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;
