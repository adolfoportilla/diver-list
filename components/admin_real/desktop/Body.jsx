import React from "react";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";
import ReservationTable from "./ReservationTable";
import CreateReservationButton from "./CreateReservationButton";
import ReservationTableContextProvider from "../../shared/ReservationTableContextProvider";

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
          <ReservationTableContextProvider>
            <CreateReservationButton />
            <ReservationTable />
          </ReservationTableContextProvider>
        </BodyFrame>
      );
  }
}
