import React from "react";
import "antd/dist/antd.css";
import { Badge, Calendar as _Calendar } from "antd";
import moment from "moment";

import supabase from "../../utils/supabase";

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
const PAGE_SIZE = 20;

async function fetchCalendar(dateFilter = null) {
  // TODO:
  // We need to fetch only the reservations from that store.
  const baseQueryset = supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  // TODO:
  // We need to paginate, because if not the request is going to get pretty expensive.
  // .limit(PAGE_SIZE);

  // TODO: limit reservations based on date.
  // if (dateFilter) {
  // baseQueryset.gte("date", dateFilter);
  // }
  const { data, error } = await baseQueryset;

  return { data, error };
}

const formattedTodayDay = (date) => {
  let [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  month += 1;

  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-01`;
};

// https://ant.design/components/calendar/
export default function Calendar() {
  const [reservations, setReservations] = React.useState();
  React.useEffect(() => {
    (async () => {
      const { data, error } = await fetchCalendar();
      // formattedTodayDay(new Date())
      setReservations(data);
    })();
  }, []);

  return (
    // TODO
    // The biggest problem with the current approach is we fetch everything in one call, which will
    // cause issues if there are hundreds of reservations.
    // Ideally, we only fetch the reservations of the current month, and when a user changes the
    // month, we fetch more
    <_Calendar
      dateCellRender={(cellDate) => dateCellRender(cellDate, reservations)}
      monthCellRender={null}
      // onPanelChange={(date) => {
      // fetchCalendar(formattedTodayDay(date.toDate())).then((v) => {
      //   const { data, error } = v;
      //   setReservations(data);
      // });
      // }}
      className="rounded-md border border-neutral-200"
      style={{ padding: 8 }}
    />
  );
}
