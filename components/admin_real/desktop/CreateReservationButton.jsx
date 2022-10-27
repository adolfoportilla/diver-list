import React, { useState } from "react";
import { Add, AddBox, Create } from "@mui/icons-material";
import { Button } from "@mui/material";

import ReservationFieldsModal from "./ReservationFieldsModal";
import { createReservation } from "../../../utils/api/reservation";

const CreateReservationButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex flex-row-reverse">
      <ReservationFieldsModal
        onSubmit={createReservation}
        modalTitle="Create"
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        reservation={{}}
      />
      <Button className="min-w-0 py-2 px-3" onClick={() => setModalOpen(true)}>
        <Add className="w-8" />
        <span>Create</span>
      </Button>
    </div>
  );
};

export default CreateReservationButton;
