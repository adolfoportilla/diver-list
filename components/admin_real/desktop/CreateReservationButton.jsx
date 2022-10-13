import React, { useState } from "react";
import { Add, AddBox, Create } from "@mui/icons-material";
import { Button } from "@mui/material";

import { createReservation } from "../shared/reservationTableUtils";
import ReservationFieldsModal from "./ReservationFieldsModal";

const CreateReservationButton = ({ reservation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <ReservationFieldsModal
        onSubmit={createReservation}
        modalTitle="Create Reservation"
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Button className="min-w-0 p-2" onClick={() => setModalOpen(true)}>
        <span>Create New Reservation</span>
        <AddBox className="w-8" />
      </Button>
    </div>
  );
};

export default CreateReservationButton;
