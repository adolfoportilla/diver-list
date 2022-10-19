import React from "react";

import MobileDashboard from "../mobil/MobileDashboard";
import DesktopDashboard from "../desktop/DesktopDashboard";
import { useSize } from "../../../utils/useSize";

const isMobile = (width) => {
  return width <= 640;
};

export default function Dashboard() {
  // const { width, height } = useSize();
  const width = 650;
  return (
    <div>
      <span>Dashboard</span>
    </div>
  );
  // return isMobile(width) ? <MobileDashboard /> : <DesktopDashboard />;
}
