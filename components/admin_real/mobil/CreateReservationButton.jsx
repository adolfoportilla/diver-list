import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import ReservationForm from "./ReservationForm";
import { useState } from "react";

export default function CreateReservationButton() {
  const [formVisible, setFormVisible] = useState(false);

  //Todo - autopopulate the date for the current calendar cell

  return (
    <>
      {formVisible ? (
        <ReservationForm setFormVisible={setFormVisible} />
      ) : (
        <Fab
          className="fixed bottom-20 right-5 bg-sky-700"
          aria-label="add"
          onClick={() => setFormVisible(true)}
        >
          <div>
            <Add />
          </div>
        </Fab>
      )}
    </>
  );
}
