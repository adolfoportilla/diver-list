import React from "react";
import { AutoAwesomeMosaic, CalendarMonth } from "@mui/icons-material";
import Button from "@mui/material/Button";

const InButton = (props) => {
  return (
    <Button
      className="w-full flex justify-start text-4xl text-neutral-600"
      variant="text"
      sx={{ fontSize: "32px" }}
      {...props}
    >
      <span className="ml-1 text-xl font-light normal-case">{props.text}</span>
    </Button>
  );
};

export default function Sidebar({ setView, views }) {
  return (
    <div className="mt-2 ml-4 flex flex-col items-start ">
      <InButton
        text="Reservations"
        onClick={() => setView(views.RESERVATIONS)}
        startIcon={<AutoAwesomeMosaic sx={{ fontSize: 32 }} />}
      />
      <InButton
        text="Calendar"
        startIcon={<CalendarMonth fontSize="inherit" />}
        onClick={() => setView(views.CALENDAR)}
      />
    </div>
  );
}
