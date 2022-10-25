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
        title={
          <span>{` ${item.diver_information.name} ${item.diver_information.lastName}`}</span>
        }
        style={{}}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-col">
          <div>
            <span className="font-bold">ID:</span>
            <span>{` ${item.id}`}</span>
          </div>
          <div>
            <span className="font-bold">Reservation Type:</span>
            <span>{` ${item.reservation_type}`}</span>
          </div>
          <div>
            <span className="font-bold">Diver Experience:</span>
            <span>{` ${item.number_of_dives} `}</span>
          </div>
          <div>
            <span className="font-bold">Date:</span>
            <span>{` ${item.date}`}</span>
          </div>
          <div>
            <span className="font-bold">Time:</span>

            <span>{` ${item.time}`}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReservationBadge;
