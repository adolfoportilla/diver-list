import React from "react";
import Sidebar from "./Sidebar";

import Body from "./Body";
import Header from "./Header";

import styles from "./calendar.module.css";

export const VIEWS = {
  RESERVATIONS: "r",
  CALENDAR: "c",
};

export default function Dashboard() {
  const [view, setView] = React.useState(VIEWS.RESERVATIONS);
  return (
    <div className="w-screen h-full bg-gray-50">
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.sidebar}>
          <Sidebar view={view} views={VIEWS} setView={setView} />
        </div>
        <div className={styles.main}>
          <Body view={view} />
        </div>
      </div>
    </div>
  );
}
