import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { ReservationsContext } from "../../shared/ReservationsContextProvider";
import { CUSTOMERS_TABLE_COLUMNS_DESKTOP } from "../shared/customersTableUtils";

export default function CustomersTable({}) {
  const context = React.useContext(ReservationsContext);
  return (
    <div className="bg-white">
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
      <DataGrid
        rows={[]}
        columns={CUSTOMERS_TABLE_COLUMNS_DESKTOP}
        pageSize={40}
        rowsPerPageOptions={[20]}
        isRowSelectable={() => false}
        filterOperators={[]}
        disableColumnMenu
        autoHeight
        rowCount={20}
        pagination
        paginationMode="server"
      />
    </div>
  );
}
