import React from "react";
import { useMachine } from "@xstate/react";
import { reservationMachine } from "../../utils/state-machine";
import Image from "next/image";

const InitialState = () => {
  const [state, send] = useMachine(reservationMachine);
  return (
    <div>
      <div>
        <Image src="/icons/scuba-diver.svg" alt="" width={100} height={100} />
      </div>
      <div>
        <Image src="/icons/certificate.svg" alt="" width={100} height={100} />
      </div>
    </div>
  );
};

export default InitialState;
