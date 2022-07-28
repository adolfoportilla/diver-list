import React from "react";
import { useActor } from "@xstate/react";

import ReservationTypeState from "./ReservationTypeState";
import CertificationDiveState from "./CertificationDiveState";
import CompleteState from "./CompleteState";
import { MyContext } from "../ReservationController";

const StateController = () => {
  const machine = React.useContext(MyContext);

  const [state] = useActor(machine);
  switch (true) {
    case state.matches("reservation"):
      return <ReservationTypeState />;
    case state.matches("certificationDive"):
      return <CertificationDiveState />;
    case state.matches("complete"):
      return <CompleteState />;
    default:
      return <div>Oops! Something went wrong</div>;
  }
};

export default StateController;
