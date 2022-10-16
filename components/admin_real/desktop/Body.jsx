import React from "react";

import { VIEWS } from "./DesktopDashboard";
import Calendar from "./Calendar";
import ReservationTableContextProvider from "../../states/ReservationTableContextProvider";

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
          <ReservationTableContextProvider />
        </BodyFrame>
      );
  }
}
