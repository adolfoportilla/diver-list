import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_MOBILE,
  calculateRange,
} from "../shared/reservationTableUtils";
import { SelectedRow } from "./SelectedRow";
import CreateReservationButton from "./CreateReservationButton";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";

const isEmpty = (obj) => {
  if (!obj) return true;

  return Object.keys(obj).length ? false : true;
};

export default function ReservationTable() {
  const context = React.useContext(ReservationsContext);
  return (
    <div>
      <div className="bg-white">
        <DataGrid
          rows={context.tableData}
          columns={RESERVATION_TABLE_COLUMNS_MOBILE}
          pageSize={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          loading={context.isLoading}
          checkboxSelection={false}
          filterOperators={[]}
          disableColumnMenu
          autoHeight
          rowCount={context.count}
          isCellEditable={() => false}
          pagination
          paginationMode="server"
          onRowClick={(event) => {
            context.setSelectedRow(event.row);
          }}
          onPageChange={(newPage) => {
            const [initial, end] = calculateRange(newPage, PAGE_SIZE);
            context.setReservationParams({
              rangeInitial: initial,
              rangeEnd: end,
            });
            context.getTableReservations(initial, end);
          }}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
        />
      </div>
      <CreateReservationButton />
      {!isEmpty(context.selectedRow) ? (
        <div className="mt-5">
          <SelectedRow selectedRow={context.selectedRow} />
        </div>
      ) : null}
    </div>
  );
}
