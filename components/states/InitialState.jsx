import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";

const InitialState = () => {
  const [state, send] = useMachine(reservationMachine);
  return (
    <div>
      <button>Rec dive</button>
      <button> Cert dive</button>
    </div>
  );
};

export default InitialState;
