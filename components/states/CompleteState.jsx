import React, { useEffect } from "react";
import { useActor } from "@xstate/react";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";

const CompleteState = () => {
  const machine = React.useContext(MyContext);

  const [state, send] = useActor(machine);
  // useEffect(() => {
  //   fetch("/api/mail", {
  //     method: "POST",
  //     body: JSON.stringify(state.context),
  //   });
  // }, []);
  return (
    <StatePage>
      <StateTitle title="Thanks for booking" />
      <div className="flex flex-col max-w-full">
        <div>{JSON.stringify(state.context, null, 5)}</div>
      </div>
    </StatePage>
  );
};

export default CompleteState;
