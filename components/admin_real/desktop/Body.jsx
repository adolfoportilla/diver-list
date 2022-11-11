import React from "react";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";
import ReservationTable from "./ReservationTable";
import CreateReservationButton from "./CreateReservationButton";

const BodyFrame = (props) => {
  return <div className="mt-10 mr-5">{props.children}</div>;
};

export default function Body({ view }) {
  switch (view) {
    case VIEWS.CALENDAR:
      return (
        <BodyFrame>
          <CreateReservationButton />
          <Calendar />
        </BodyFrame>
      );
    case VIEWS.RESERVATIONS:
    default:
      return (
        <BodyFrame>
          <CreateReservationButton />
          <ReservationTable />
        </BodyFrame>
      );
  }
}
