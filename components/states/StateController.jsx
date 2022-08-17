import React from "react";
import { useActor } from "@xstate/react";

import { MyContext } from "../ReservationController";
import ReservationTypeState from "./ReservationTypeState";
import CertificationDiveState from "./CertificationDiveState";
import CompleteState from "./CompleteState";
import CalendarState from "./CalendarState";
import LastDiveState from "./LastDiveState";
import NumberOfDivesState from "./NumberOfDivesState";
import DeepestDiveState from "./DeepestDiveState";
import CertifiedDiverState from "./CertifiedDiverState";
import DiverInformationState from "./DiverInformationState";

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
    case state.matches("lastDive"):
      return <LastDiveState />;
    case state.matches("numberOfDives"):
      return <NumberOfDivesState />;
    case state.matches("deepestDive"):
      return <DeepestDiveState />;
    case state.matches("isDiverCertified"):
      return <CertifiedDiverState />;
    case state.matches("lastDive"):
      return <LastDiveState />;
    case state.matches("diverInformation"):
      return <DiverInformationState />;
    case state.matches("complete"):
      return <CompleteState />;
    default:
      return <div>Oops! Something went wrong</div>;
  }
};

export default StateController;
