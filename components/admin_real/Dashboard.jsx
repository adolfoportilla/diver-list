import React from "react";
import Sidebar from "./Sidebar";

import Body from "./Body";

export const VIEWS = {
  RESERVATIONS: "R",
  CALENDAR: "c",
};

export default function App() {
  const [view, setView] = React.useState(VIEWS.RESERVATIONS);
  return (
    <div className="w-screen h-full">
      <div className="grid grid-rows-12 grid-cols-5">
        <div className="row-start-1 row-end-2 col-start-1 col-end-6 bg-red-200">
          Header
        </div>
        <div className="row-start-2 row-end-12 col-start-1 col-end-2 bg-slate-50">
          <Sidebar view={view} views={VIEWS} setView={setView} />
        </div>
        <div className="row-start-2 row-end-12 col-start-2 col-end-6 bg-blue-100">
          <Body view={view} />
        </div>
        <div className="row-start-12 row-end-13 col-start-1 col-end-6 bg-green-100">
          Footer
        </div>
      </div>
    </div>
  );
}
