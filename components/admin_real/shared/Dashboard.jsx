import React from "react";

import MobileDashboard from "../mobil/MobileDashboard";
import DesktopDashboard from "../desktop/Dashboard";
import { useSize } from "../../../utils/useSize";

const isMobile = (width) => {
  return width <= 640;
};

export default function Dashboard() {
  const { width } = useSize();

  return width && isMobile(width) ? <MobileDashboard /> : <DesktopDashboard />;
}
