import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  PAGE_SIZE,
  RESERVATION_TABLE_COLUMNS_MOBILE,
  calculateRange,
  fetchReservations,
} from "../shared/reservationTableUtils";
import { useUser } from "../../../utils/useUser";

const isEmpty = (obj) => {
  if (!obj) return true;

  return Object.keys(obj).length ? false : true;
};

const Item = (props) => {
  return (
    <div className="grid grid-cols-2">
      <span className="font-bold">{props.name}</span>
      <span className="-ml-8">
        {props.formatter ? props.formatter(props.value) : props.value}
      </span>
    </div>
  );
};

const SelectedRow = ({ selectedRow }) => {
  const items = [
    ["Date", "date"],
    ["Email", "diver_information.email"],
    ["Name", "diver_information.name"],
    ["Last Name", "diver_information.lastName"],
    ["Age", "diver_information.age"],
    ["Deepest Dive", "deepest_dive"],
    ["Diver Certified", "diver_certified", (value) => (value ? "Yes" : "No")],
    ["Last Dive", "last_dive"],
    ["Number of Dives", "number_of_dives"],
    ["Reservation Type", "reservation_type"],
  ];
  return (
    <div className="shadow-lg px-2">
      <div>
        {items.map((item) => {
          let value = selectedRow[item[1]];
          if (item[1].includes(".")) {
            const [first, second] = item[1].split(".");
            value = selectedRow[first][second];
          }
          return (
            <Item
              key={item.id}
              name={item[0]}
              value={value}
              formatter={item[2]}
            />
          );
        })}
      </div>
    </div>
  );
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
      {!isEmpty(selectedRow) ? (
        <div className="mt-5 border-blue-400 border  rounded-md ">
          <div className="ml-1 mb-1">
            <span className="text-md">Reservation Details</span>
          </div>
          <SelectedRow selectedRow={selectedRow} />
        </div>
      ) : null}
    </div>
  );
}
