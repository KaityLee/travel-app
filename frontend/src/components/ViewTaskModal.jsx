import React, { useState } from "react";
import { Modal, Descriptions, Button } from "antd";
import EditTaskForm from "./EditTaskForm";
import dayjs from "dayjs";

const ViewTaskModal = ({ visible, onClose, task, setTask }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!task) return null;

  const getKoreanStatus = (status) => {
    switch (status) {
      case "pending":
        return "대기 중";
      case "in-progress":
        return "진행 중";
      case "completed":
        return "완료";
      default:
        return "진행 중";
    }
  };

  const getKoreanPriority = (priority) => {
    switch (priority) {
      case "low":
        return "낮음";
      case "medium":
        return "보통";
      case "high":
        return "높음";
      default:
        return "보통";
    }
  };

  return (
    <>
      <Modal
        title="📌 할 일 상세 보기"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="edit" type="primary" onClick={() => setIsEditModalOpen(true)}>
            ✏️ 수정
          </Button>,
          <Button key="close" onClick={onClose}>
            닫기
          </Button>,
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="제목">{task.title}</Descriptions.Item>
          <Descriptions.Item label="설명">{task.description || "-"}</Descriptions.Item>
          <Descriptions.Item label="마감 기한">
            {task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD HH:mm:ss") : "없음"}
          </Descriptions.Item>
          <Descriptions.Item label="진행 상태">{getKoreanStatus(task.status)}</Descriptions.Item>
          <Descriptions.Item label="우선 순위">{getKoreanPriority(task.priority)}</Descriptions.Item>
        </Descriptions>
      </Modal>

      {/* ✅ Edit Modal */}
      <EditTaskForm
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        setTask={setTask}
      />
    </>
  );
};

export default ViewTaskModal;
