import React from "react";

import { List, Datagrid, DateField, TextField } from "react-admin";

const COLUMNS = [
  { field: "id", headerName: "ID", width: 65 },
  { field: "reservationDate", headerName: "Reservation Date", width: 150 },
  { field: "time", headerName: "Time", width: 100 },
  { field: "reservationType", headerName: "Booking Type", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "numberOfDives", headerName: "Diver Experience", width: 150 },
  { field: "deepestDive", headerName: "Deepest Dive", width: 150 },
  { field: "lastDive", headerName: "Last Dive", width: 150 },
];

export default function ReservationList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <DateField source="reservationDate" />
        <TextField source="time" />
        <TextField source="reservationType" />
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="numberOfDives" />
        <TextField source="deepestDive" />
        <TextField source="lastDive" />
      </Datagrid>
    </List>
  );
}
