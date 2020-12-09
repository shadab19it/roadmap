import React, { FC } from "react";

import { Modal, notification } from "antd";

export const openNotification = (type: string, msg: string) => {
  switch (type) {
    case "warning":
      return notification.warning({
        message: `${msg}`,
        duration: 5,
        placement: "bottomRight",
      });

    case "success":
      return notification.success({
        message: `${msg}`,
        duration: 5,
        placement: "bottomRight",
      });
    case "error":
      return notification.error({
        message: `${msg}`,
        duration: 5,
        placement: "bottomRight",
      });

    default:
      break;
  }
};

export const OpenModelMsg = (msg: string) => {
  Modal.error({
    title: "Someting wents Worng",
    content: (
      <div>
        <p>{msg}</p>
      </div>
    ),
    onOk() {},
  });
};
