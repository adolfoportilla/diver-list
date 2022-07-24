import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";
import Image from "next/image";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";

const InitialState = () => {
  const [state, send] = useMachine(reservationMachine);
  return (
    <StatePage>
      <StateTitle title="Select Activity" />
      <div className="flex space-x-16">
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
          onClick={() => console.log("testing")}
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
          onClick={() => console.log("testing")}
        />
      </div>
    </StatePage>
  );
};

export default InitialState;
