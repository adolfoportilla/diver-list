import supabase from "../../../utils/supabase";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import DeleteReservationButton from "../desktop/DeleteReservationButton";
import EditReservationButton from "../desktop/EditReservationButton";

// This function allows the columns to get values from Supabase like this `userInformation.name`
// it essentially works the same way as the `get` function from lodash. (https://lodash.com/docs/4.17.15#get)
const valueGetterFn = (params) => {
  if (params.field.includes(".")) {
    const [outer, inner] = params.field.split(".");
    return params.row[outer][inner];
  }
  return params.value;
};

export const PAGE_SIZE = 10;

export const fetchReservations = async (props) => {
  return await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .eq("dive_shop_id", props.diveShopId)
    .order("date", { ascending: false })
    .range(props.rangeInitial, props.rangeEnd);
};

export const deleteReservation = async (reservationId) => {
  return await supabase
    .from("reservations")
    .delete()
    .match({ id: reservationId });
};

export const updateReservation = async (props) => {
  return await supabase
    .from("reservations")
    .update({
      date: props.date,
      time: props.time,
      diver_certified: props.certified,
      reservation_type: props.reservationType,
      //todo - change this field to "experience" in supabase schema
      number_of_dives: props.experience,
      diver_information: {
        name: props.diverInformation.name,
        lastName: props.diverInformation.lastName,
        age: props.diverInformation.age,
        email: props.diverInformation.email,
      },
    })
    .eq("id", props.id);
};

export const DEFAULT_ROW_PROPS = {
  sortable: false,
  hideable: false,
  filterable: false,
  valueGetter: valueGetterFn,
};

// https://mui.com/x/api/data-grid/grid-col-def/
export const RESERVATION_TABLE_COLUMNS_DESKTOP = [
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
  {
    field: "edit_reservation",
    headerName: "Edit",
    renderCell: (rowData) => (
      <div className="flex justify-between w-16">
        <EditReservationButton reservation={rowData.row} />
        <DeleteReservationButton reservationId={rowData.id} />
      </div>
    ),
  },
].map((value) => ({ ...DEFAULT_ROW_PROPS, ...value }));

export const RESERVATION_TABLE_COLUMNS_MOBILE = [
  { field: "date", headerName: "Date" },
  {
    field: "reservation_type",
    headerName: "Reservation Type",
    sortable: false,
    width: 135,
  },
  {
    field: "diver_information.email",
    headerName: "Email",
    minWidth: 200,
  },
].map((value) => ({ ...DEFAULT_ROW_PROPS, ...value }));

export const calculateRange = (currentPage, pageSize) => {
  return [currentPage * pageSize, (currentPage + 1) * pageSize - 1];
};
