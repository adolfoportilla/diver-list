import React from "react";
import "antd/dist/antd.css";
import { Badge, Calendar as _Calendar } from "antd";
import moment from "moment";
import ReservationBadge from "../ReservationBadge";

import { fetchCalendar, isSameDay } from "../shared/calendarUtil";
import { useUser } from "../../../utils/useUser";

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
          <ReservationBadge item={item} />
        </li>
      ))}
    </ul>
  );
};
const PAGE_SIZE = 20;

// https://ant.design/components/calendar/
export default function Calendar() {
  const [reservations, setReservations] = React.useState();
  const user = useUser();
  React.useEffect(() => {
    if (user) {
      // (async () => {
      //   const { data, error } = await fetchCalendar({
      //     diveShopId: user.diveShop,
      //   });
      //   setReservations(data);
      // })();
    }
  }, [user]);

  return (
    // TODO
    // The biggest problem with the current approach is we fetch everything in one call, which will
    // cause issues if there are hundreds of reservations.
    // Ideally, we only fetch the reservations of the current month, and when a user changes the
    // month, we fetch more
    <_Calendar
      dateCellRender={(cellDate) => dateCellRender(cellDate, reservations)}
      monthCellRender={null}
      className="rounded-md border border-neutral-200"
      style={{ padding: 8 }}
    />
  );
}
