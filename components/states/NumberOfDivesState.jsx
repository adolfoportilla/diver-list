import React from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const NumberOfDivesState = () => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="How many dives do you have?" />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/shrimp.svg"
              alt="1 - 9"
              width={150}
              height={150}
            />
          }
          text="1-9"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DEEPEST_DIVE,
              value: "beginner",
              previousState: STATE_ACTIONS.NUMBER_OF_DIVES,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/fish.svg"
              alt="10 - 29"
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="10-29"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DEEPEST_DIVE,
              value: "intermediate",
              previousState: STATE_ACTIONS.NUMBER_OF_DIVES,
            })
          }
        />
        <CardComponent
          icon={
            <Image src="/icons/shark.svg" alt="30 +" width={150} height={150} />
          }
          text="30 + "
          onClick={() =>
            send({
              type: STATE_ACTIONS.DEEPEST_DIVE,
              value: "expert",
              previousState: STATE_ACTIONS.NUMBER_OF_DIVES,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default NumberOfDivesState;
