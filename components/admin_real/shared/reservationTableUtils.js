import supabase, {
  DEEPEST_TO_TEXT_MAPPING,
  NUM_OF_DIVES_TO_TEXT_MAPPING,
} from "../../../utils/supabase";
import DeleteReservationButton from "../desktop/DeleteReservationButton";
import EditReservationButton from "../desktop/EditReservationButton";
import { notification } from "antd";

// This function allows the columns to get values from Supabase like this `userInformation.name`
// it essentially works the same way as the `get` function from lodash. (https://lodash.com/docs/4.17.15#get)
const valueGetterFn = (params) => {
  if (params.field.includes(".")) {
    const [outer, inner] = params.field.split(".");
    return params.row[outer][inner];
  }
  return params.value;
};

export const openErrorNotification = (type) => {
  notification[type]({
    message: "Error",
    description:
      "There was an issue processing your request, please contact us if this persists. ",
  });
};
export const openSuccessNotification = (type, message, description) => {
  notification[type]({
    message: message || "Success",
    description: description || "Request processed successfully!",
    duration: 5,
  });
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
    .match({ id: reservationId })
    .select();
};

export const updateReservation = async (props) => {
  return await supabase
    .from("reservations")
    .update(props.values)
    .eq("id", props.reservationId)
    .eq("dive_shop_id", props.diveShopId)
    .select();
};
//Todo: need to add the dive shop id here?
export const createReservation = async (props) => {
  console.log("props", props);
  return await supabase
    .from("reservations")
    .insert({
      ...props.values,
      dive_shop_id: props.diveShopId,
    })
    .select();
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
    // https://mui.com/x/api/data-grid/grid-cell-params/
    renderCell: ({ value }) => <span>{value ? "yes" : "no"}</span>,
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
  {
    field: "number_of_dives",
    headerName: "Experience",
    width: 160,
    renderCell: ({ value }) => {
      return <span>{NUM_OF_DIVES_TO_TEXT_MAPPING[value]}</span>;
    },
  },
  {
    field: "deepest_dive",
    headerName: "Deepest Dive",
    width: 140,
    renderCell: ({ value }) => {
      return <span>{DEEPEST_TO_TEXT_MAPPING[value]}</span>;
    },
  },
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
