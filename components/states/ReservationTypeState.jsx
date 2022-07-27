import React from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import { MyContext } from "../ReservationController";

const ReservationTypeState = () => {
  const machine = React.useContext(MyContext);

  const [, send] = useActor(machine);

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
          onClick={() =>
            send({ type: "NEXT", reservationType: "recreational" })
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
            send({ type: "NEXT", reservationType: "certification" })
          }
        />
      </div>
    </StatePage>
  );
};

export default ReservationTypeState;