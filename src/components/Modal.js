import React, { useState } from "react";
import { Modal, Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";

const ModalWrapper = ({ title, children, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.buttonText} <BarsOutlined />
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
