import React from "react";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";

import Body, { VIEWS } from "./Body";
import Header from "../shared/Header";

import styles from "./dashboard.module.css";

export default function MobileDashboard() {
  const [view, setView] = React.useState(VIEWS.RESERVATIONS);

  return (
    <div className="w-screen h-full bg-gray-50">
      <div className={styles.container}>
        <div className={styles.header}>
          <Header
            rightChildren={
              <div className="flex flex-row align-items-center space-x-2 mr-3">
                <IconButton
                  aria-label="reservations"
                  size="large"
                  color={view === VIEWS.RESERVATIONS ? "primary" : "default"}
                  onClick={() => setView(VIEWS.RESERVATIONS)}
                >
                  <AutoAwesomeMosaicIcon />
                </IconButton>
                <IconButton
                  aria-label="calendar"
                  size="large"
                  color={view === VIEWS.CALENDAR ? "primary" : "default"}
                  onClick={() => setView(VIEWS.CALENDAR)}
                >
                  <CalendarMonthIcon />
                </IconButton>
              </div>
            }
          />
        </div>
        <div className={styles.main}>
          <Body view={view} />
        </div>
      </div>
    </div>
  );
}
