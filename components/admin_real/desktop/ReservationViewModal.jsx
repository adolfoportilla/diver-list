import React, { useState } from "react";
import { updateReservation } from "../shared/reservationTableUtils";
import ReservationFieldsModal from "./ReservationFieldsModal";

export default function ReservationViewModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ReservationFieldsModal
        reservation={props.reservation}
        onSubmit={updateReservation}
        modalTitle="Update"
        setModalOpen={setIsOpen}
        modalOpen={isOpen}
      />
      <span onClick={() => setIsOpen(true)}>{props.children}</span>
    </>
  );
}
