import React from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";

const CompleteState = () => {
  const machine = React.useContext(MyContext);

  const [state, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="Thanks for booking" />
      <div className="flex flex-col">
        <span>This is what you entered</span>
        <span>{JSON.stringify(state.context)}</span>
      </div>
    </StatePage>
  );
};

export default CompleteState;
