import React from "react";

import Button from "@mui/material/Button";

export default function Sidebar({ setView, views }) {
  return (
    <div className="flex flex-col items-start ">
      <Button variant="text" onClick={() => setView(views.RESERVATIONS)}>
        Reservations
      </Button>
      <Button variant="text" onClick={() => setView(views.CALENDAR)}>
        Calendar
      </Button>
    </div>
  );
}
