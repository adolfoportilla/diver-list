import React from "react";
import Image from "next/image";
import { useActor } from "@xstate/react";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import { MyContext } from "../ReservationController";

const CompleteState = () => {
  return (
    <StatePage>
      <StateTitle title="Thanks for booking" />
    </StatePage>
  );
};

export default CompleteState;
