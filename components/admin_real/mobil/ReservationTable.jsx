import React from "react";
import Header from "../Header";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function MobileDashboard() {
  return (
    <div className="w-screen h-full bg-gray-50">
      <Header
        rightChildren={
          <div className="flex flex-row align-items-center space-x-2 mr-3">
            <AutoAwesomeMosaicIcon />
            <CalendarMonthIcon />
          </div>
        }
      />
    </div>
  );
}
