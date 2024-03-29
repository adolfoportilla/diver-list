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
import { DEEPEST_DIVE } from "../../utils/supabase";

const DeepestDiveState = () => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);
  return (
    <StatePage>
      <StateTitle
        title={statesText.deepestDiveState.title[context.language]}
      ></StateTitle>
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/fishing.svg"
              alt="under 30ft"
              width={150}
              height={150}
            />
          }
          text={statesText.deepestDiveState.shallow[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.LAST_DIVE,
              value: DEEPEST_DIVE.SHALLOW,
              previousState: STATE_ACTIONS.DEEPEST_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/shipwreck.svg"
              alt="30ft to 69ft"
              width={150}
              height={150}
            />
          }
          text={statesText.deepestDiveState.deep[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.LAST_DIVE,
              value: DEEPEST_DIVE.MEDIUM,
              previousState: STATE_ACTIONS.DEEPEST_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/anglerfish.svg"
              alt="70ft or more"
              width={150}
              height={150}
            />
          }
          text={statesText.deepestDiveState.deepest[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.LAST_DIVE,
              value: DEEPEST_DIVE.DEEP,
              previousState: STATE_ACTIONS.DEEPEST_DIVE,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default DeepestDiveState;
