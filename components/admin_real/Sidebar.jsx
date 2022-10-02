import React from "react";

import Button from "@mui/material/Button";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const InButton = (props) => {
  return (
    <Button
      className="w-full flex justify-start font-normal text-base normal-case text-gray-600"
      variant="text"
      onClick={props.onClick}
      startIcon={props.startIcon}
    >
      {props.text}
    </Button>
  );
};

export default function Sidebar({ setView, views }) {
  return (
    <div className="mt-2 ml-2 flex flex-col items-start ">
      <InButton
        text="Reservations"
        onClick={() => setView(views.RESERVATIONS)}
        startIcon={<AutoAwesomeMosaicIcon />}
      />
      <InButton
        text="Calendar"
        startIcon={<CalendarMonthIcon />}
        onClick={() => setView(views.CALENDAR)}
      />
    </div>
  );
}
