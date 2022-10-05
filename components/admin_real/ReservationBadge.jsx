import React from "react";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { Badge } from "antd";

const ReservationBadge = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Badge
        status={item.type}
        text={
          <>
            <span className="">{item.content}</span>
            <span className="ml-1 font-bold text-sm">{item.time}</span>
          </>
        }
        onClick={() => setModalOpen(true)}
      />
      <Modal
        title="20px to Top"
        style={{}}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      ></Modal>
    </>
  );
};

export default ReservationBadge;
