import React from "react";

import { useUser } from "../../utils/useUser";
import { PAGE_SIZE } from "../admin_real/shared/reservationTableUtils";
import {
  deleteReservation,
  fetchCalendarReservations,
  fetchReservations,
} from "../../utils/api/reservation";

export const ReservationsContext = React.createContext({});

const ReservationsContextProvider = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [calendarData, setCalendarData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});

  const [count, setCount] = React.useState(0);
  const { diveShop } = useUser();

  const [reservationParams, setReservationParams] = React.useState({
    rangeInitial: 0,
    rangeEnd: PAGE_SIZE - 1,
  });

  const getTableReservations = (
    rangeInitial = reservationParams.rangeInitial,
    rangeEnd = reservationParams.rangeEnd
  ) => {
    fetchReservations({
      rangeInitial: rangeInitial,
      rangeEnd: rangeEnd,
      diveShopId: diveShop.id,
    })
      .then((results) => {
        setTableData(results.data);
        setIsLoading(false);
        setCount(results.count);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getCalendarReservations = () => {
    fetchCalendarReservations({ diveShopId: diveShop.id })
      .then((results) => {
        setCalendarData(results.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (diveShop) {
      setIsLoading(true);
      getTableReservations();
      getCalendarReservations();
    }
  }, [diveShop]);

  return (
    <ReservationsContext.Provider
      value={{
        getTableReservations: function (...values) {
          setIsLoading(true);
          getTableReservations(...values);
        },
        getCalendarReservations: function () {
          setIsLoading(true);
          getCalendarReservations();
        },
        tableData,
        calendarData,
        isLoading,
        setIsLoading,
        count,
        diveShop,
        reservationParams,
        setReservationParams,
        selectedRow,
        setSelectedRow,
      }}
      {...props}
    />
  );
};

export default ReservationsContextProvider;
