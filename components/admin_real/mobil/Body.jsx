import React from "react";

import ReservationTable from "./ReservationTable";
import Calendar from "./Calendar";

export const VIEWS = {
  RESERVATIONS: "r",
  CALENDAR: "c",
};

const BodyFrame = (props) => {
  return <div className="mt-10 mx-1">{props.children}</div>;
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
