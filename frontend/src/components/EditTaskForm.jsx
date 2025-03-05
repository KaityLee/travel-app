import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Button, Select, message } from "antd";
import useTasks from "../hooks/useTasks";
import dayjs from "dayjs";

const EditTaskForm = ({ visible, onClose, task }) => {
  const { addTask, fetchTasks } = useTasks();
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        due_date: task.due_date ? dayjs(task.due_date) : null,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await addTask({
        id: task.id, // ✅ Ensure the backend updates the existing task
        title: values.title,
        description: values.description || "",
        due_date: values.due_date ? values.due_date.format("YYYY-MM-DD HH:mm:ss") : null,
        status: values.status,
        priority: values.priority,
      });
      message.success("할 일이 수정되었습니다!");
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Task update failed:", error);
    }
  };

  return (
    <Modal title="✏️ 할 일 수정" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="제목" rules={[{ required: true }]}>
          <Input placeholder="할 일 제목을 입력하세요" />
        </Form.Item>
        <Form.Item name="description" label="설명">
          <Input.TextArea placeholder="세부 사항" />
        </Form.Item>
        <Form.Item name="due_date" label="마감 기한">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="status" label="진행 상태" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="pending">🟡 대기 중</Select.Option>
            <Select.Option value="in-progress">🟠 진행 중</Select.Option>
            <Select.Option value="completed">🟢 완료</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="우선 순위" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="low">🟢 낮음</Select.Option>
            <Select.Option value="medium">🟠 보통</Select.Option>
            <Select.Option value="high">🔴 높음</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleUpdate} style={{ width: "100%" }}>
          ✅ 수정 완료
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
