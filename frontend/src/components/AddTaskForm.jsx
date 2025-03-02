import React from "react";
import { Modal, Form, Input, DatePicker, Button, Select } from "antd";
import useTasks from "../hooks/useTasks";

const AddTaskForm = ({ visible, onClose, tripId }) => {
  const { addTask } = useTasks();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await addTask({
        title: values.title,
        description: values.description,
        due_date: values.due_date.format("YYYY-MM-DD HH:mm:ss"),
        status: values.status,
        priority: values.priority,
        travel_related: true,
        trip_id: tripId,
      });
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Add Task" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Task Title" rules={[{ required: true }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Task details" />
        </Form.Item>
        <Form.Item name="due_date" label="Due Date" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="in-progress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="low">Low</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="high">High</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;
