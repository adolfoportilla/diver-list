import React from "react";
import ReservationTable from "./ReservationTable";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";

export default function Body({ view }) {
  switch (view) {
    case VIEWS.CALENDAR:
      return <Calendar />;
    case VIEWS.RESERVATIONS:
    default:
      return <ReservationTable />;
  }
}
