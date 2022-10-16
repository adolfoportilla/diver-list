import React from "react";
import { Calendar as _Calendar, Col, Row, Select, Badge } from "antd";
import moment from "moment";

import { fetchCalendar, isSameDay } from "../shared/calendarUtil";
import { useUser } from "../../../utils/useUser";

const customHeader = ({ value, type, onChange, onTypeChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = start; i < end; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = value.year();
  const month = value.month();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }
  return (
    <div style={{ padding: 8 }}>
      <Row gutter={8}>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={month}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={year}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
          >
            {options}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

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
  return Array.from(excludeSameDate).map((d) => {
    return (
      <div key={d} className="ml-2 -mt-1">
        <Badge status="processing" />
      </div>
    );
  });
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
        headerRender={customHeader}
        fullscreen={false}
        dateCellRender={(cellDate) => dataCellRender(cellDate, reservations)}
        onChange={(date) => setSelectedDate(date)}
      />
      <div className="mt-4">
        {selectedDateReservations && selectedDateReservations.length ? (
          <div className="flex flex-col space-y-2">
            {selectedDateReservations.map((reservation) => {
              return (
                <div
                  key={reservation.id}
                  className="bg-white mx-1 px-2 shadow-lg ring-1 ring-gray-900/5 rounded-sm"
                >
                  <div className="flex-col">
                    <div>
                      <span className="font-semibold">
                        Time: {reservation.time}
                      </span>
                    </div>
                    <div>
                      <span>Name: {reservation.diver_information.name}</span>
                      <span>{reservation.diver_information.lastName}</span>
                    </div>
                    <div>
                      <span>Experience: {reservation.number_of_dives}</span>
                    </div>
                    <div>
                      <span>{reservation.diver_certified}</span>
                    </div>
                    <div>
                      <span>Type: {reservation.reservation_type}</span>
                    </div>
                    <div></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ml-3">
            <span className="text-black">No reservations for today!</span>
          </div>
        )}
      </div>
    </div>
  );
}
