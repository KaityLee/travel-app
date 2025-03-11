import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Button, Select, message } from "antd";
import useTasks from "../hooks/useTasks";
import dayjs from "dayjs";

const EditTaskForm = ({ visible, onClose, task, setTask }) => {
  const { updateTask, fetchTasks } = useTasks();
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.due_date ? dayjs(task.due_date) : null,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      if (!task?.id) {
        console.error("Error: Task ID is missing!");
        return;
      }

      const updatedTask = {
        id: task.id,
        title: values.title,
        description: values.description || "",
        dueDate: values.due_date ? values.due_date.format("YYYY-MM-DDTHH:mm:ss") : null,
        status: values.status,
        priority: values.priority,
      };

      await updateTask(updatedTask);
      
      setTask(updatedTask);

      await fetchTasks();
      message.success("✅ 할 일이 성공적으로 수정되었습니다!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Task update failed:", error);
      message.error("🚨 할 일 수정 실패!");
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
        <Button type="primary" onClick={handleUpdate} style={{ width: "100%" }}>
          ✅ 수정 완료
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
