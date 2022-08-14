import React from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const CertifiedDiverState = () => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="Are you a certified diver?" />
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
          text="Yes!"
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
              layout="fixed"
            />
          }
          text="No"
          //TODO (Willy) - add return to initial state here
          onClick={() => send({})}
        />
      </StateCards>
    </StatePage>
  );
};

export default CertifiedDiverState;
