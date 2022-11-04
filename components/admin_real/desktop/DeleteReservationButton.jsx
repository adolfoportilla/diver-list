import React, { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Button, Alert } from "@mui/material";
import Modal from "antd/lib/modal/Modal";

import { deleteReservation } from "../../../utils/api/reservation";
import { openErrorNotification } from "../shared/reservationTableUtils";
import { openSuccessNotification } from "../shared/reservationTableUtils";
import { TableContext } from "../../shared/ReservationTableContextProvider";

const DeleteReservationButton = ({ reservationId, wrapperClassName }) => {
  const context = React.useContext(TableContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleSuccess = () => {
    context.getReservations();
    openSuccessNotification("success");
  };
  return (
    <div className={wrapperClassName}>
      <Modal
        title={
          <Alert severity="error">
            Are you sure you want to delete this reservation?
          </Alert>
        }
        closable={false}
        style={{}}
        visible={modalOpen}
        okButtonProps={{ danger: true }}
        onOk={() => {
          deleteReservation(reservationId).then((results) =>
            results.error
              ? openErrorNotification("error")
              : results.data
              ? handleSuccess()
              : null
          );
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <div>Once you delete it, we will not be able to recover it.</div>
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
