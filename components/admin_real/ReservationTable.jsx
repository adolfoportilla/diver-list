import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import supabase from "../../utils/supabase";

import { PAGE_SIZE, TABLE_COLUMNS, calculateRange } from "./utils";

const fetchReservations = async (props) => {
  return await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(props.rangeInitial, props.rangeEnd);
};

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
        columns={TABLE_COLUMNS}
        pageSize={PAGE_SIZE}
        initialState={{
          pagination: {
            pageSize: PAGE_SIZE,
          },
        }}
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
