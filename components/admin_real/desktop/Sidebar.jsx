import React from "react";
import {
  AutoAwesomeMosaic,
  BarChart,
  CalendarMonth,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { People } from "@mui/icons-material";

const SidebarButton = (props) => {
  return (
    <Button
      className="w-full flex justify-start text-4xl text-neutral-600 text-[32px]"
      variant="text"
      {...props}
    >
      <span className="ml-1 text-xl font-light normal-case">{props.text}</span>
    </Button>
  );
};

export default function Sidebar({ setView, views }) {
  return (
    <div className="mt-2 ml-4 flex flex-col items-start">
      <SidebarButton
        text="Reservations"
        onClick={() => setView(views.RESERVATIONS)}
        startIcon={<AutoAwesomeMosaic />}
      />
      <SidebarButton
        text="Calendar"
        startIcon={<CalendarMonth />}
        onClick={() => setView(views.CALENDAR)}
      />
      <SidebarButton
        text="Customers"
        startIcon={<People />}
        onClick={() => setView(views.CUSTOMERS)}
      />
      <SidebarButton
        text="Analytics"
        startIcon={<BarChart />}
        onClick={() => setView(views.ANALYTICS)}
      />
    </div>
  );
}
