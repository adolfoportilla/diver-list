import React from "react";

import MobileDashboard from "../mobil/MobileDashboard";
import DesktopDashboard from "../desktop/DesktopDashboard";

export default function Dashboard() {
  return (
    <>
      {/* TODO: This actually loads the component but just hides it from view, so all fetches do happen, we need to prevent this from loading on the screen */}
      <div className="sm:hidden">
        <MobileDashboard />
      </div>
      <div className="hidden sm:inline">
        <DesktopDashboard />
      </div>
    </>
  );
}
