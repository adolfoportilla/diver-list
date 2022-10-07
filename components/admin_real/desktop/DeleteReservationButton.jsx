import React, { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import Modal from "antd/lib/modal/Modal";
import { deleteReservation } from "../shared/reservationTableUtils";
const DeleteReservationButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Modal
        title={"Are you sure you want to delete this reservation?"}
        style={{}}
        visible={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <div>Once you delete it, we won't be able to recover it.</div>
      </Modal>

      <Button
        className="min-w-0"
        color="error"
        onClick={() => setModalOpen(true)}
      >
        <Delete className="w-4" />
      </Button>
    </div>
  );
};

export default DeleteReservationButton;
