import React from "react";
import ReservationTable from "../ReservationTable";

export const VIEWS = {
  RESERVATIONS: "r",
  CALENDAR: "c",
};

const BodyFrame = (props) => {
  return <div className="mt-10 mr-5">{props.children}</div>;
};

export default function Body({ view }) {
  switch (view) {
    case VIEWS.CALENDAR:
      return (
        <BodyFrame>
          <div>Calendar</div>
        </BodyFrame>
      );
    case VIEWS.RESERVATIONS:
    default:
      return (
        <BodyFrame>
          <div>Reservation</div>
        </BodyFrame>
      );
  }
}
