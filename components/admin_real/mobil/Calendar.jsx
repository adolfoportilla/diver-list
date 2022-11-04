import React from "react";
import { Calendar as _Calendar, Col, Row, Select, Badge } from "antd";
import moment from "moment";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";

import { isSameDay } from "../shared/calendarUtil";
import { useUser } from "../../../utils/useUser";
import { SelectedRow } from "./SelectedRow";
import { calendarHeader } from "../../shared/Calendar";
import { fetchCalendar } from "../../../utils/api/reservation";

const dataCellRender = (date, data) => {
  if (!data || !data.length) {
    return null;
  }
  const filteredDates = data.filter((reservation) => {
    const reservationDate = reservation.date;
    const momentReservationDate = moment(reservationDate);
    return isSameDay(date, momentReservationDate);
  });
  const excludeSameDate = new Set(
    filteredDates.map((reservation) => {
      const reservationDate = reservation.date;
      const momentDate = moment(reservationDate);
      return `${momentDate.date()}${momentDate.month()}${momentDate.year()}`;
    })
  );
  return (
    <div className="ml-2 -mt-1 ">
      <Badge status={excludeSameDate.size > 0 ? "processing" : ""} />
    </div>
  );
};

const getDateReservations = (date, reservations) => {
  if (!reservations) {
    return null;
  }
  return reservations.filter((reservation) => {
    return isSameDay(moment(reservation.date), moment(date));
  });
};

export default function Calendar() {
  const [reservations, setReservations] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()));
  const { diveShop } = useUser();
  const diveShopId = diveShop?.id || null;
  React.useEffect(() => {
    (async () => {
      if (diveShopId) {
        const { data, error } = await fetchCalendar({ diveShopId });
        setReservations(data);
      }
    })();
  }, [diveShopId]);

  const selectedDateReservations = getDateReservations(
    selectedDate,
    reservations
  );

  return (
    <div>
      <_Calendar
        headerRender={calendarHeader}
        fullscreen={false}
        dateCellRender={(cellDate) => dataCellRender(cellDate, reservations)}
        onChange={(date) => setSelectedDate(date)}
      />
      <div className="m-2">
        {selectedDateReservations && selectedDateReservations.length ? (
          <div className="flex flex-col space-y-2 ">
            {selectedDateReservations.map((reservation) => {
              return (
                <SelectedRow selectedRow={reservation} key={reservation.id} />
              );
            })}
          </div>
        ) : (
          <div className="ml-3">
            <span className="text-black">No reservations for today!</span>
          </div>
        )}
      </div>
      <Fab className="fixed bottom-12 right-8 bg-sky-700" aria-label="add">
        <Add />
      </Fab>
    </div>
  );
}
