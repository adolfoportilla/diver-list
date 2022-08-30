import React from "react";
import { useMachine } from "@xstate/react";

import StateController from "./states/StateController";
import { reservationMachine } from "../utils/state-machine";

export const MyContext = React.createContext({});

const ReservationController = () => {
  const [, , service] = useMachine(reservationMachine);
  const [language, setLanguage] = React.useState("english");

  return (
    <MyContext.Provider value={{ service, language, setLanguage }}>
      <StateController />
    </MyContext.Provider>
  );
};

export default ReservationController;
