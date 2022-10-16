import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_DESKTOP,
  calculateRange,
  fetchReservations,
} from "../shared/reservationTableUtils";
import CreateReservationButton from "./CreateReservationButton";

import { useUser } from "../../../utils/useUser";

export default function ReservationTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [count, setCount] = React.useState(0);
  const { diveShop } = useUser();

  React.useEffect(() => {
    if (diveShop) {
      setIsLoading(true);
      fetchReservations({
        rangeInitial: 0,
        rangeEnd: PAGE_SIZE - 1,
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
    }
  }, [diveShop]);

  return (
    <div className="bg-white">
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
      <CreateReservationButton />
      <DataGrid
        rows={data}
        columns={RESERVATION_TABLE_COLUMNS_DESKTOP}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        isRowSelectable={() => false}
        loading={isLoading}
        checkboxSelection={false}
        filterOperators={[]}
        disableColumnMenu
        autoHeight
        rowCount={count}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          const [initial, end] = calculateRange(newPage, PAGE_SIZE);
          setIsLoading(true);
          fetchReservations({
            rangeInitial: initial,
            rangeEnd: end,
            diveShopId: diveShop.id,
          }).then(({ data, error, count }) => {
            setData(data);
            setIsLoading(false);
            setCount(count);
          });
        }}
      />
    </div>
  );
}
