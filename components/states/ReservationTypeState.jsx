import React from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import CardComponent from "./shared/CardComponent";
import { MyContext } from "../ReservationController";

const ReservationTypeState = () => {
  const machine = React.useContext(MyContext);

  const [, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="Select Activity" />
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
          text="Recreational Dive"
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
          text="Certification"
          onClick={() =>
            send({
              type: STATE_ACTIONS.CERTIFICATION_DIVE,
              value: "certification",
              previousState: STATE_ACTIONS.RESERVATION,
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default ReservationTypeState;
