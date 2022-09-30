import React from "react";
import "antd/dist/antd.css";
import { Badge, Calendar as _Calendar } from "antd";
import moment from "moment";

import { fetchCalendar } from "../../utils/supabase";

const isSameDay = (dateA, dateB) => {
  return (
    dateA.date() === dateB.date() &&
    dateA.month() === dateB.month() &&
    dateA.year() === dateB.year()
  );
};

const formatData = (date) => {
  return {
    type: "processing",
    content: date.id,
    time: date.time,
  };
};

const dateCellRender = (cellDate, data) => {
  if (!data || !data.length) {
    return null;
  }
  const filteredDates = data.filter((reservation) => {
    const reservationDate = reservation.date;
    const momentReservationDate = moment(reservationDate);
    return isSameDay(cellDate, momentReservationDate);
  });
  const listData = filteredDates.map(formatData);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge
            status={item.type}
            text={
              <>
                <span className="">{item.content}</span>
                <span className="ml-1 font-bold text-sm">{item.time}</span>
              </>
            }
          />
        </li>
      ))}
    </ul>
  );
};
// https://ant.design/components/calendar/
export default function Calendar() {
  const [reservations, setReservations] = React.useState();
  React.useEffect(() => {
    (async () => {
      const { data, error } = await fetchCalendar();
      setReservations(data);
    })();
  }, []);

  return (
    <_Calendar
      dateCellRender={(cellDate) => dateCellRender(cellDate, reservations)}
      monthCellRender={null}
    />
  );
}
