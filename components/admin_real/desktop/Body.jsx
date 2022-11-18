import React from "react";

import { VIEWS } from "./Dashboard";
import Calendar from "./Calendar";
import ReservationTable from "./ReservationTable";
import CreateReservationButton from "./CreateReservationButton";
import CustomersTable from "./Customerstable";
import Charts from "./Charts";

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
      return (
        <BodyFrame>
          <CreateReservationButton />
          <ReservationTable />
        </BodyFrame>
      );
    case VIEWS.CUSTOMERS:
      return (
        <BodyFrame>
          <CustomersTable />
        </BodyFrame>
      );
    case VIEWS.ANALYTICS:
      return (
        <BodyFrame>
          <Charts />
        </BodyFrame>
      );
    default:
      return (
        <BodyFrame>
          <CreateReservationButton />
          <ReservationTable />
        </BodyFrame>
      );
  }
}
