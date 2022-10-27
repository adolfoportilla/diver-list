import React from "react";

import { useUser } from "../../utils/useUser";
import { PAGE_SIZE } from "../admin_real/shared/reservationTableUtils";
import { fetchReservations } from "../../utils/api/reservation";

export const TableContext = React.createContext({});

const ReservationTableContextProvider = (props) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [count, setCount] = React.useState(0);
  const { diveShop } = useUser();

  const getReservations = (rangeInitial = 0, rangeEnd = PAGE_SIZE - 1) => {
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
      getReservations();
    }
  }, [diveShop]);

  return (
    <TableContext.Provider
      value={{
        getReservations: function (...values) {
          setIsLoading(true);
          getReservations(...values);
        },
        data,
        isLoading,
        count,
        diveShop,
      }}
      {...props}
    />
  );
};

export default ReservationTableContextProvider;
