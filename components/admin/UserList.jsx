import React from "react";

import { List, Datagrid, DateField, TextField } from "react-admin";

export default function UserList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="age" />
      </Datagrid>
    </List>
  );
}
