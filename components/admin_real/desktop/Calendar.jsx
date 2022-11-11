import React from "react";
import { Calendar as _Calendar, Tag } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

import { isSameDay } from "../shared/calendarUtil";
import { calendarHeader } from "../../shared/Calendar";
import ReservationBadge from "../ReservationBadge";
import ReservationViewModal from "./ReservationViewModal";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";
import { formatReservationTime } from "../../../utils/reservations";

const sortReservationsWithoutTimeFirst = (dateA, dateB) => {
  // We prioritize items without date first (the same way Google puts "all day" events at the top).
  if (!dateA.time) {
    return -1000;
  }
  if (!dateB.time) {
    return -1000;
  }
  const intA = parseInt(dateA.time.split(":").join());
  const intB = parseInt(dateB.time.split(":").join());
  return intA - intB;
};

const AllDay = ({ reservation }) => {
  return (
    <Tag color="#108ee9">
      <ReservationViewModal reservation={reservation}>
        <span className="">{reservation.diver_information.name}</span>
        <span className="ml-1">{reservation.diver_information.lastName}</span>
      </ReservationViewModal>
    </Tag>
  );
};

const SpecificTime = ({ reservation }) => {
  return (
    <Tag color="geekblue">
      <ReservationViewModal reservation={reservation}>
        <ReservationBadge item={reservation} />
        <span className="font-bold">
          {formatReservationTime(reservation.time)}
        </span>
        <span className="ml-1">{reservation.diver_information.name}</span>
        <span className="ml-1">{reservation.diver_information.lastName}</span>
      </ReservationViewModal>
    </Tag>
  );
};

const dateCellRender = (cellDate, data) => {
  if (!data || !data.length) {
    return null;
  }
  const cellDateReservations = data.filter((reservation) => {
    const reservationDate = reservation.date;
    const momentReservationDate = moment(reservationDate);
    return isSameDay(cellDate, momentReservationDate);
  });

  cellDateReservations.sort(sortReservationsWithoutTimeFirst);

  return (
    <ul className="events">
      {cellDateReservations.map((item) => (
        <li key={item.id} className="mb-1">
          {item.time ? (
            <SpecificTime reservation={item} />
          ) : (
            <AllDay reservation={item} />
          )}
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
