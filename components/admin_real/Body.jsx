import React from "react";
import ReservationTable from "./ReservationTable";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";

export default function Body({ view }) {
  let body = null;
  switch (view) {
    case VIEWS.CALENDAR:
      body = <Calendar />;
    case VIEWS.RESERVATIONS:
    default:
      body = <ReservationTable />;
  }

  return <div className="mt-10">{body}</div>;
}
