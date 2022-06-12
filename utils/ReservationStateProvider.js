import React, { createContext } from "react";
import { useInterpret } from "@xstate/react";
import { reservationMachine } from "./state-machine";

export const ReservationStateContext = createContext({});

export const ReservationStateProvider = (props) => {
  const reservationServce = useInterpret(reservationMachine);

  return (
    <ReservationStateContext.Provider value={{ reservationServce }}>
      {props.children}
    </ReservationStateContext.Provider>
  );
};
