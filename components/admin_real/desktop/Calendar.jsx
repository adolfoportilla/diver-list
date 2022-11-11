import React from "react";
import { Calendar as _Calendar } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

import { isSameDay } from "../shared/calendarUtil";
import { calendarHeader } from "../../shared/Calendar";
import ReservationBadge from "../ReservationBadge";
import ReservationViewModal from "./ReservationViewModal";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";

const dateCellRender = (cellDate, data) => {
  if (!data || !data.length) {
    return null;
  }
  const filteredReservations = data.filter((reservation) => {
    const reservationDate = reservation.date;
    const momentReservationDate = moment(reservationDate);
    return isSameDay(cellDate, momentReservationDate);
  });
  return (
    <ul className="events">
      {filteredReservations.map((item) => (
        <li key={item.id}>
          <ReservationViewModal reservation={item}>
            <ReservationBadge item={item} />
            {item.time ? <span>{item.time}</span> : null}
            <span>{item.diver_information.name}</span>
            <span className="ml-1">{item.diver_information.lastName}</span>
          </ReservationViewModal>
        </li>
      ))}
    </ul>
  );
};

// https://ant.design/components/calendar/
export default function Calendar() {
  const context = React.useContext(ReservationsContext);

  return (
    // TODO
    // The biggest problem with the current approach is we fetch everything in one call, which will
    // cause issues if there are hundreds of reservations.
    // Ideally, we only fetch the reservations of the current month, and when a user changes the
    // month, we fetch more
    <_Calendar
      dateCellRender={(cellDate) =>
        dateCellRender(cellDate, context.calendarData)
      }
      headerRender={calendarHeader}
      className="rounded-md border border-neutral-200"
      style={{ padding: 8 }}
    />
  );
}
