import React from "react";
import ReservationTable from "./ReservationTable";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";

const BodyFrame = (props) => {
  return <div className="mt-10 mr-5">{props.children}</div>;
};

export default function Body({ view }) {
  let body = null;
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
