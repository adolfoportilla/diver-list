import React from "react";
import Image from "next/image";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const NumberOfDivesState = () => {
  return (
    <StatePage>
      <StateTitle title="How many dives do you have?" />
      <StateCards>
        <CardComponent
          icon={
            <Image
              src="/icons/shrimp.svg"
              alt="1 - 9"
              width={150}
              height={150}
            />
          }
          text="1-9"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "beginner",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/fish.svg"
              alt="10 - 29"
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="10-29"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "intermediate",
            })
          }
        />
        <CardComponent
          icon={
            <Image src="/icons/shark.svg" alt="30 +" width={150} height={150} />
          }
          text="30 + "
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "expert",
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default NumberOfDivesState;
