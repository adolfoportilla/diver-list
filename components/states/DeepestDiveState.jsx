import React from "react";
import Image from "next/image";

import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const DeepestDiveState = () => {
  return (
    <StatePage>
      <StateTitle title="What is your deepest dive?"></StateTitle>
      <StateCards>
        <CardComponent
          icon={
            <Image src="/icons/fishing.svg" alt="" width={150} height={150} />
          }
          text="1 - 29 ft"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "shallow",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/shipwreck.svg"
              alt=""
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="30 - 69 ft"
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "deep",
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/anglerfish.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="70 - 100+ ft "
          onClick={() =>
            send({
              type: STATE_ACTIONS.NEXT,
              value: "deepest",
            })
          }
        />
      </StateCards>
    </StatePage>
  );
};

export default DeepestDiveState;
