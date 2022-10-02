import React from "react";
import { Admin as _Admin, Resource } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import ReservationList from "./ReservationList";
import ReservationCreate from "./ReservationCreate";
import UserList from "./UserList";
import Calendar from "./Calendar";
import { reservationList, userList } from "./mockData";

const mockDataProvider = {
  getList: (resource, params) => {
    if (resource === "reservations") {
      return Promise.resolve({
        data: reservationList,
        total: reservationList.length,
      });
    }
    if (resource === "users") {
      return Promise.resolve({ data: userList, total: userList.length });
    }
    return Promise.reject();
  },
  getOne: (resource, params) => Promise.resolve({ data: {} }),
  getMany: (resource, params) => Promise.resolve({ data: {} }),
  getManyReference: (resource, params) => Promise.resolve({ data: {} }),
  create: (resource, params) => Promise.resolve({ data: {} }),
  update: (resource, params) => Promise.resolve({ data: {} }),
  updateMany: (resource, params) => Promise.resolve({ data: {} }),
  delete: (resource, params) => Promise.resolve({ data: {} }),
  deleteMany: (resource, params) => Promise.resolve({ data: {} }),
};

export default function Admin() {
  return (
    <_Admin dataProvider={mockDataProvider}>
      <Resource
        name="reservations"
        list={ReservationList}
        edit={null}
        create={ReservationCreate}
        icon={null}
      />
      <Resource
        name="users"
        list={UserList}
        edit={null}
        create={null}
        icon={PersonIcon}
      />
      <Resource
        name="calendar"
        list={Calendar}
        edit={null}
        create={null}
        icon={CalendarMonthIcon}
      />
    </_Admin>
  );
}
