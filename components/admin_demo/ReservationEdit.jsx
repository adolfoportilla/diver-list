import { Edit, Create, SimpleForm, TextInput, DateInput } from "react-admin";

export const ReservationEdit = () => (
  <Edit title={<div>Hell</div>}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="teaser" options={{ multiline: true }} />
      <TextInput multiline source="body" />
      <DateInput label="Publication date" source="published_at" />
      <TextInput source="average_note" />
      <TextInput disabled label="Nb views" source="views" />
    </SimpleForm>
  </Edit>
);
