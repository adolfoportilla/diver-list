import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_MOBILE,
  calculateRange,
} from "../shared/reservationTableUtils";
import { useUser } from "../../../utils/useUser";
import { fetchReservations } from "../../../utils/api/reservation";
import { SelectedRow } from "./SelectedRow";
import CreateReservationButton from "./CreateReservationButton";

const isEmpty = (obj) => {
  if (!obj) return true;

  return Object.keys(obj).length ? false : true;
};

export default function ReservationTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState({});

  const [count, setCount] = React.useState(0);
  const { diveShop } = useUser();

  React.useEffect(() => {
    if (diveShop) {
      (async () => {
        setIsLoading(true);
        const {
          data: reservations,
          error,
          count: rowCount,
        } = await fetchReservations({
          rangeInitial: 0,
          rangeEnd: PAGE_SIZE - 1,
          diveShopId: diveShop.id,
        });
        setData(reservations);
        setIsLoading(false);
        setCount(rowCount);
      })();
    }
  }, [diveShop]);

  return (
    <div>
      <div className="bg-white">
        <DataGrid
          rows={data}
          columns={RESERVATION_TABLE_COLUMNS_MOBILE}
          pageSize={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          loading={isLoading}
          checkboxSelection={false}
          filterOperators={[]}
          disableColumnMenu
          autoHeight
          rowCount={count}
          isCellEditable={() => false}
          pagination
          paginationMode="server"
          onRowClick={(event) => {
            setSelectedRow(event.row);
          }}
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
      <CreateReservationButton />
      {!isEmpty(selectedRow) ? (
        <div className="mt-5">
          <SelectedRow selectedRow={selectedRow} />
        </div>
      ) : null}
    </div>
  );
}
