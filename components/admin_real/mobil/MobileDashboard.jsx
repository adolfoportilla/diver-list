import React from "react";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";

import Body, { VIEWS } from "./Body";
import Header from "../Header";

export default function MobileDashboard() {
  const [view, setView] = React.useState(VIEWS.RESERVATIONS);

  return (
    <div className="w-screen h-full bg-gray-50">
      <Header
        rightChildren={
          <div className="flex flex-row align-items-center space-x-2 mr-3">
            <IconButton
              aria-label="reservations"
              size="large"
              color={view === VIEWS.RESERVATIONS ? "primary" : "default"}
              onClick={() => setView("r")}
            >
              <AutoAwesomeMosaicIcon />
            </IconButton>
            <IconButton
              aria-label="calendar"
              size="large"
              color={view === VIEWS.CALENDAR ? "primary" : "default"}
              onClick={() => setView("c")}
            >
              <CalendarMonthIcon />
            </IconButton>
          </div>
        }
      />
      <Body view={view} />
    </div>
  );
}
