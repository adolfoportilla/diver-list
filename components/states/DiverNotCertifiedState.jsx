import React from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import CardComponent from "./shared/CardComponent";
import { MyContext } from "../ReservationController";

const DiverNotCertifiedState = () => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="You must be certified to book a recreational dive!" />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/certificate.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Get certified with us"
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

export default DiverNotCertifiedState;
