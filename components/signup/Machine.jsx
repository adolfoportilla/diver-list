import React from "react";
import { useMachine } from "@xstate/react";

import StateController from "./StateController";
import { stateMachine } from "../../utils/dive-shop-state-machine";

export const MyContext = React.createContext({});

const Machine = () => {
  const [, , service] = useMachine(stateMachine);
  return (
    <MyContext.Provider value={service}>
      <StateController />
    </MyContext.Provider>
  );
};

export default Machine;
