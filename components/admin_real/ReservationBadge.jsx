import React from "react";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { Badge } from "antd";

const ReservationBadge = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Badge
        status="processing"
        text={
          <>
            <span className="ml-1 font-bold text-sm">{item.time}</span>
          </>
        }
        onClick={() => setModalOpen(true)}
      />
      <Modal
        title=""
        style={{}}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-col">
          <span>{`Name: ${item.diver_information.name} ${item.diver_information.lastName}`}</span>
          <span>{`Reservation Type: ${item.reservation_type}`}</span>
          <span>{`Diver Experience: ${item.number_of_dives}`}</span>
          <span>{`Date: ${item.date}`}</span>
          <span>{`Time: ${item.time}`}</span>
        </div>
      </Modal>
    </>
  );
};

export default ReservationBadge;
