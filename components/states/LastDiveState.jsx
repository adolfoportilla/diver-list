import React from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const LastDiveState = () => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);
  return (
    <StatePage>
      <StateTitle title="When was your last dive?" />
      <StateCards>
        <CardComponent
          icon={
            <Image src="/icons/chevron1.svg" alt="" width={150} height={150} />
          }
          text="0 - 1 Months Ago"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_INFORMATION,
              value: "recent",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/chevron2.svg"
              alt="advanced diver"
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="1 - 6 Months Ago"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_INFORMATION,
              value: "not-so-recent",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/chevron3.svg"
              alt="rescue diver"
              width={150}
              height={150}
            />
          }
          text="6 + Months Ago"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_INFORMATION,
              value: "not-recent",
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default LastDiveState;
