import React, { useState } from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import CardComponent from "./shared/CardComponent";
import { MyContext } from "../ReservationController";
import { statesText } from "../../utils/app-text";
import LanguageSelector from "../LanguageSelector";

const ReservationTypeState = () => {
  const context = React.useContext(MyContext);
  const [, send] = useActor(context.service);

  return (
    <StatePage>
      <StateTitle
        title={statesText.reservationTypeState.title[context.language]}
      />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/scuba-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={statesText.reservationTypeState.recDive[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.RECREATIONAL_DIVE,
              value: "recreational",
              previousState: STATE_ACTIONS.RESERVATION,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/certificate.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={statesText.reservationTypeState.certDive[context.language]}
          onClick={() =>
            send({
              type: STATE_ACTIONS.CERTIFICATION_DIVE,
              value: "certification",
              previousState: STATE_ACTIONS.RESERVATION,
            })
          }
        />
      </StateCards>
      <LanguageSelector />
    </StatePage>
  );
};

export default ReservationTypeState;
