import React from "react";
import { useActor } from "@xstate/react";

import ReservationTypeState from "./ReservationTypeState";
import CertificationDiveState from "./CertificationDiveState";
import { MyContext } from "../ReservationController";

const StateController = () => {
  const machine = React.useContext(MyContext);

  const [state] = useActor(machine);
  switch (true) {
    case state.matches("reservation"):
      return <ReservationTypeState />;
    case state.matches("certification-dive"):
      return <CertificationDiveState />;
    default:
      return <div>Done!</div>;
  }
};

export default StateController;
