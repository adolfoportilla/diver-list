import React from "react";
import { useMachine } from "@xstate/react";

import StateController from "./states/StateController";
import { reservationMachine } from "../utils/state-machine";

export const MyContext = React.createContext({});

const ReservationController = () => {
  const [, , service] = useMachine(reservationMachine);
  return (
    <MyContext.Provider value={service}>
      <StateController />
    </MyContext.Provider>
  );
};

export default ReservationController;
