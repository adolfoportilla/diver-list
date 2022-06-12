import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../utils/state-machine";
import InitialState from "./states/InitialState";

const ReservationController = () => {
  const [state, send] = useMachine(reservationMachine);
  switch (true) {
    case state.matches("reservation"):
      return <InitialState />;
  }
};

export default ReservationController;
