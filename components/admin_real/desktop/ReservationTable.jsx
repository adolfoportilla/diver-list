import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_DESKTOP,
  calculateRange,
} from "../shared/reservationTableUtils";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";

export default function ReservationTable({}) {
  const context = React.useContext(ReservationsContext);
  return (
    <div className="bg-white">
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
      <DataGrid
        rows={context.tableData}
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
          context.setReservationParams({
            rangeInitial: initial,
            rangeEnd: end,
          });
          context.getTableReservations(initial, end);
        }}
      />
    </div>
  );
}
