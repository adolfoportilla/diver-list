import React from "react";
import { useActor } from "@xstate/react";

import InitialState from "./InitialState";
import CertificationDiveState from "./CertificationDiveState";
import { MyContext } from "../ReservationController";

const StateController = () => {
  const machine = React.useContext(MyContext);

  const [state] = useActor(machine);
  switch (true) {
    case state.matches("reservation"):
      return <InitialState />;
    case state.matches("certification-dive"):
      return <CertificationDiveState />;
    default:
      return <div>Done!</div>;
  }
};

export default StateController;
