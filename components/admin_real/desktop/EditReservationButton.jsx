import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

import { updateReservation } from "../../../utils/api/reservation";
import ReservationFieldsModal from "./ReservationFieldsModal";

const EditReservationButton = ({ reservation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <ReservationFieldsModal
        reservation={reservation}
        onSubmit={updateReservation}
        modalTitle="Update"
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Button className="min-w-0" onClick={() => setModalOpen(true)}>
        <Edit className="w-4" />
      </Button>
    </div>
  );
};

export default EditReservationButton;
