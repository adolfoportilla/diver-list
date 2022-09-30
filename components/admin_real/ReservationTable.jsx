import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import supabase from "../../utils/supabase";

const VALUE_GETTER_FN = (params) => {
  if (params.field.includes(".")) {
    const [outer, inner] = params.field.split(".");
    return params.row[outer][inner];
  }
  return params.value;
};

const DEFAULT_SORT = { field: "date", ascending: false };

const PAGE_SIZE = 10;

const DEFAULT_ROW_PROPS = {
  sortable: false,
  hideable: false,
  filterable: false,
  valueGetter: VALUE_GETTER_FN,
};

// https://mui.com/x/api/data-grid/grid-col-def/
const columns = [
  { field: "date", headerName: "Date" },
  { field: "time", headerName: "Time", sortable: false, width: 80 },
  {
    field: "reservation_type",
    headerName: "Reservation Type",
    sortable: false,
    width: 135,
  },
  {
    field: "diver_certified",
    headerName: "Certified?",
    width: 90,
  },
  {
    field: "diver_information.name",
    headerName: "Name",
  },
  {
    field: "diver_information.lastName",
    headerName: "Last Name",
  },
  {
    field: "diver_information.age",
    headerName: "Age",
    type: "number",
    width: 50,
  },
  { field: "number_of_dives", headerName: "Experience", width: 120 },
  {
    field: "diver_information.email",
    headerName: "Email",
    minWidth: 200,
  },
].map((value) => ({ ...DEFAULT_ROW_PROPS, ...value }));

const parseData = (data = []) => {
  if (!data) {
    return [];
  }
  return data;
};

export default function ReservationTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data: reservations, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: false })
        .limit(PAGE_SIZE);
      setData(reservations);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* https://mui.com/x/api/data-grid/data-grid/ */}
      <DataGrid
        rows={parseData(data)}
        columns={columns}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        isRowSelectable={() => false}
        loading={isLoading}
        checkboxSelection={false}
        filterOperators={[]}
        disableColumnMenu
        autoHeight
      />
    </div>
  );
}
