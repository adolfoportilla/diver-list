import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_DESKTOP,
  calculateRange,
  fetchReservations,
} from "../shared/reservationTableUtils";
import CreateReservationButton from "./CreateReservationButton";
import { TableContext } from "../../states/ReservationTableContextProvider";

export default function ReservationTable({}) {
  const context = React.useContext(TableContext);
  return (
    <div className="bg-white">
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
      <CreateReservationButton />
      <DataGrid
        rows={context.data}
        columns={RESERVATION_TABLE_COLUMNS_DESKTOP}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        isRowSelectable={() => false}
        loading={context.isLoading}
        checkboxSelection={false}
        filterOperators={[]}
        disableColumnMenu
        autoHeight
        rowCount={context.count}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          const [initial, end] = calculateRange(newPage, PAGE_SIZE);
          context.getReservations(initial, end);
        }}
      />
    </div>
  );
}
