import React from "react";

import MobileDashboard from "../mobil/MobileDashboard";
import DesktopDashboard from "../desktop/DesktopDashboard";

export default function Dashboard() {
  return (
    <>
      <div className="sm:hidden">
        <MobileDashboard />
      </div>
      <div className="hidden sm:inline">
        <DesktopDashboard />
      </div>
    </>
  );
}
