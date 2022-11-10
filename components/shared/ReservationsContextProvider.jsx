import React from "react";

import { useUser } from "../../utils/useUser";
import { PAGE_SIZE } from "../admin_real/shared/reservationTableUtils";
import { fetchReservations } from "../../utils/api/reservation";

export const ReservationsContext = React.createContext({});

const ReservationsContextProvider = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
        setData(results.data);
        setIsLoading(false);
        setCount(results.count);
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
    }
  }, [diveShop]);

  return (
    <ReservationsContext.Provider
      value={{
        getTableReservations: function (...values) {
          setIsLoading(true);
          getTableReservations(...values);
        },
        tableData,
        isLoading,
        count,
        diveShop,
        reservationParams,
        setReservationParams,
      }}
      {...props}
    />
  );
};

export default ReservationsContextProvider;
