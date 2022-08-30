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

const CertifiedDiverState = () => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);

  return (
    <StatePage>
      <StateTitle
        title={statesText.certifiedDiverState.title[context.language]}
      />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/thumbs-up.svg"
              alt="Yes"
              width={150}
              height={150}
            />
          }
          text={statesText.certifiedDiverState.yes[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.NUMBER_OF_DIVES,
              value: true,
              previousState: STATE_ACTIONS.IS_DIVER_CERTIFIED,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/negative-vote.svg"
              alt="No"
              width={150}
              height={150}
            />
          }
          text="No"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_NOT_CERTIFIED,
              value: false,
              previousState: STATE_ACTIONS.IS_DIVER_CERTIFIED,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default CertifiedDiverState;
