import React from "react";
import { Modal } from "antd";

export const ConfirmModal = props => {
  console.log("props", props);
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  );
};
