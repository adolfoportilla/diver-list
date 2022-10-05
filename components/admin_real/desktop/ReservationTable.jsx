import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_DESKTOP,
  calculateRange,
  fetchReservations,
} from "../shared/reservationTableUtils";

export default function ReservationTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const {
        data: reservations,
        error,
        count: rowCount,
      } = await fetchReservations({ rangeInitial: 0, rangeEnd: PAGE_SIZE - 1 });
      setData(reservations);
      setIsLoading(false);
      setCount(rowCount);
    })();
  }, []);

  return (
    <div className="bg-white">
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
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
          fetchReservations({ rangeInitial: initial, rangeEnd: end }).then(
            ({ data, error, count }) => {
              setData(data);
              setIsLoading(false);
              setCount(count);
            }
          );
        }}
      />
    </div>
  );
}
