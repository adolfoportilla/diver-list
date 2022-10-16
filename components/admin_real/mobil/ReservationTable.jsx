import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_MOBILE,
  calculateRange,
  fetchReservations,
} from "../shared/reservationTableUtils";
import { useUser } from "../../../utils/useUser";

export default function ReservationTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [count, setCount] = React.useState(0);
  const { diveShop } = useUser();
  const diveShopId = diveShop?.id || null;

  React.useEffect(() => {
    (async () => {
      if (diveShopId) {
        setIsLoading(true);
        const {
          data,
          error,
          count: rowCount,
        } = await fetchReservations({
          rangeInitial: 0,
          rangeEnd: PAGE_SIZE - 1,
          diveShopId,
        });
        setData(data);
        setIsLoading(false);
        setCount(rowCount);
      }
    })();
  }, []);

  return (
    <div className="bg-white">
      <DataGrid
        rows={data}
        columns={RESERVATION_TABLE_COLUMNS_MOBILE}
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
            diveShopId,
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
