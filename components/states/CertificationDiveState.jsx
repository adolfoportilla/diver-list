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

const CertificationDiveState = () => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);

  return (
    <StatePage>
      <StateTitle
        title={statesText.certificationDiveState.title[context.language]}
      />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/begginer-diver.svg"
              alt="begginer diver"
              width={150}
              height={150}
            />
          }
          iconClassName="ml-8"
          text={statesText.certificationDiveState.openWater[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.CALENDAR,
              value: "open",
              previousState: STATE_ACTIONS.CERTIFICATION_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/advanced-diver.svg"
              alt="advanced diver"
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="Advanced Open Water"
          onClick={() =>
            send({
              type: STATE_ACTIONS.CALENDAR,
              value: "advanced",
              previousState: STATE_ACTIONS.CERTIFICATION_DIVE,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/rescue-diver.svg"
              alt="rescue diver"
              width={150}
              height={150}
            />
          }
          text="Rescue Diver"
          onClick={() =>
            send({
              type: STATE_ACTIONS.CALENDAR,
              value: "rescue",
              previousState: STATE_ACTIONS.CERTIFICATION_DIVE,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default CertificationDiveState;
