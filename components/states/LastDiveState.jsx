import React from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";
import { statesText } from "../../utils/app-text";

const LastDiveState = () => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);
  return (
    <StatePage>
      <StateTitle title={statesText.lastDiveState.title[context.language]} />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/sand-clock.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={statesText.lastDiveState.recent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: statesText.lastDiveState.recent["english"],
              previousState: STATE_ACTIONS.LAST_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/time-left.svg"
              alt="advanced diver"
              width={150}
              height={150}
            />
          }
          text={statesText.lastDiveState.notSoRecent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: statesText.lastDiveState.notSoRecent["english"],
              previousState: STATE_ACTIONS.LAST_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/calendar.svg"
              alt="rescue diver"
              width={150}
              height={150}
            />
          }
          text={statesText.lastDiveState.notRecent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: statesText.lastDiveState.notRecent["english"],
              previousState: STATE_ACTIONS.LAST_DIVE,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default LastDiveState;
