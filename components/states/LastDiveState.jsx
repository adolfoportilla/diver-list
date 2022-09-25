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
            <Image src="/icons/chevron1.svg" alt="" width={150} height={150} />
          }
          text={statesText.lastDiveState.recent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: "recent",
              previousState: STATE_ACTIONS.LAST_DIVE,
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
            />
          }
          text={statesText.lastDiveState.notSoRecent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: "not-so-recent",
              previousState: STATE_ACTIONS.LAST_DIVE,
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
          text={statesText.lastDiveState.notRecent[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.EQUIPMENT,
              value: "not-recent",
              previousState: STATE_ACTIONS.LAST_DIVE,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default LastDiveState;
