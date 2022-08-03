import React from "react";
import { useActor } from "@xstate/react";

import ReservationTypeState from "./ReservationTypeState";
import CertificationDiveState from "./CertificationDiveState";
import CompleteState from "./CompleteState";
import CalendarState from "./CalendarState";
import { MyContext } from "../ReservationController";
import IsDiverCertifiedState from "./IsDiverCertified";

const StateController = () => {
  const machine = React.useContext(MyContext);

  const [state] = useActor(machine);
  switch (true) {
    case state.matches("reservation"):
      return <ReservationTypeState />;
    case state.matches("certificationDive"):
      return <CertificationDiveState />;
    case state.matches("calendar"):
      return <CalendarState />;
    case state.matches("isDiverCertified"):
      return <IsDiverCertifiedState />;
    case state.matches("complete"):
      return <CompleteState />;

    default:
      return <div>Oops! Something went wrong</div>;
  }
};

export default StateController;
