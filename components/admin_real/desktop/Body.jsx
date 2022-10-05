import React from "react";

import { VIEWS } from "./DesktopDashboard";
import ReservationTable from "./ReservationTable";
import Calendar from "./Calendar";

const BodyFrame = (props) => {
  return <div className="mt-10 mr-5">{props.children}</div>;
};

export default function Body({ view }) {
  switch (view) {
    case VIEWS.CALENDAR:
      return (
        <BodyFrame>
          <Calendar />
        </BodyFrame>
      );
    case VIEWS.RESERVATIONS:
    default:
      return (
        <BodyFrame>
          <ReservationTable />
        </BodyFrame>
      );
  }
}
