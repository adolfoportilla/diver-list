import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";
import Image from "next/image";

const CardComponent = (props) => {
  return (
    <div className="py-6 px-12 bg-white flex flex-col rounded-xl shadow-lg border-2 border-black">
      {props.icon}
      <span className="text-xl font-semibold">{props.text}</span>
    </div>
  );
};

const InitialState = () => {
  const [state, send] = useMachine(reservationMachine);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-16 mb-80">
        <div className="space-between space-y-8">
          <span className="text-5xl">Select Activity</span>
        </div>

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
          />
        </div>
      </div>
    </div>
  );
};

export default InitialState;
