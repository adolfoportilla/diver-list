import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";
import Image from "next/image";

const InitialState = () => {
  const [state, send] = useMachine(reservationMachine);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-16 mb-80">
        <div className="space-between space-y-8">
          <span className="text-5xl">Select Activity</span>
        </div>
        <div className="flex space-x-16">
          <div className="py-6 px-12 bg-white flex flex-col rounded-xl shadow-lg border-2 border-black">
            <Image
              src="/icons/scuba-diver.svg"
              alt=""
              width={150}
              height={150}
            />
            <span className="text-xl font-semibold">Recreational Dive</span>
          </div>
          <div className="py-6 px-12 bg-white rounded-xl flex flex-col shadow-lg border-2 border-black">
            <Image
              src="/icons/certificate.svg"
              alt=""
              width={150}
              height={150}
            />
            <span className="text-xl font-semibold">Certification Dive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialState;
