import React from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";

const CertificationDiveState = () => {
  const machine = React.useContext(MyContext);
  const [, send] = useActor(machine);

  return (
    <StatePage>
      <StateTitle title="Select Certification" />
      <div className="flex space-x-16">
        <CardComponent
          icon={
            <Image
              src="/icons/begginer-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Open Water"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "open",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/advanced-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Advanced Open Water"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "advanced",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/rescue-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Rescue Diver"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "rescue",
            })
          }
        />
      </div>
    </StatePage>
  );
};

export default CertificationDiveState;
