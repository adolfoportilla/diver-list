import React from "react";

import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
} from "react-admin";

export default function ReservationCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} fullWidth />
        <TextInput
          source="lastName"
          validate={[required()]}
          label="Short description"
        />
        <DateInput
          label="Reservation date"
          source="reservation_date"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
}
