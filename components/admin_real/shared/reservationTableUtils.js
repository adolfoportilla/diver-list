import supabase from "../../../utils/supabase";

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
    .order("date", { ascending: false })
    .range(props.rangeInitial, props.rangeEnd);
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
