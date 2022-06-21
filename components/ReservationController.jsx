import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../utils/state-machine";
import InitialState from "./states/InitialState";
import CertificationDiveState from "./states/CertificationDiveState";

const ReservationController = () => {
  const [state, send] = useMachine(reservationMachine);
  switch (true) {
    case state.matches("reservation"):
      return <CertificationDiveState />;
    // return <InitialState />;
    case state.matches("certification-dive"):
      return <CertificationDiveState />;
  }
};

export default ReservationController;
