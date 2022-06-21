import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";
import Image from "next/image";
import StatePage from "./shared/StatePage";

const CardComponent = (props) => {
  return (
    <div
      className="py-6 px-12 bg-white flex flex-col hover:bg-sky-600 hover:scale-105 cursor-pointer rounded-xl shadow-lg border-2 border-black"
      onClick={props.onClick}
    >
      {props.icon}
      <span className="text-xl font-semibold">{props.text}</span>
    </div>
  );
};

const StateTitle = (props) => {
  return (
    <div className="space-between space-y-8">
      <span className="text-5xl">{props.title}</span>
    </div>
  );
};

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
          text="Certification Dive"
          onClick={() => console.log("testing")}
        />
      </div>
    </StatePage>
  );
};

export default InitialState;
