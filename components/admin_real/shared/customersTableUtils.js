export const PAGE_SIZE = 10;

const valueGetterFn = (params) => {
  if (params.field.includes(".")) {
    const [outer, inner] = params.field.split(".");
    return params.row[outer][inner];
  }

  return params.value;
};

export const DEFAULT_ROW_PROPS = {
  sortable: false,
  hideable: false,
  filterable: false,
  valueGetter: valueGetterFn,
};

// https://mui.com/x/api/data-grid/grid-col-def/
export const CUSTOMERS_TABLE_COLUMNS_DESKTOP = [
  { field: "customer", headerName: "Customer" },
  {
    field: "last_seen",
    headerName: "Last Seen",
    sortable: false,
    width: 100,
  },
  {
    field: "number_of_reservations",
    headerName: "Total Reservations",
    sortable: false,
    width: 150,
  },
  {
    field: "total_spent",
    headerName: "Total Spent",
    width: 100,
  },
  {
    field: "is_certified",
    headerName: "Certified?",
  },
  {
    field: "last_name",
    headerName: "Last Name",
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
  },
].map((value) => ({ ...DEFAULT_ROW_PROPS, ...value }));
