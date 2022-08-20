import React, { useState } from "react";
import { useActor } from "@xstate/react";
import Image from "next/image";
import { Button } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import StateCards from "./shared/StateCards";

const EquipmentState = () => {
  const machine = React.useContext(MyContext);
  const [, send] = useActor(machine);
  return (
    <StatePage>
      <StateTitle title="Select the equipment you will need" />
      <StateCards>
        <CardComponent
          icon={<Image src="/icons/fins.svg" alt="" width={150} height={150} />}
          text="Fins"
          onClick={() =>
            send({
              type: STATE_ACTIONS.FIN_SIZE,
              value: {},
              previousState: STATE_ACTIONS.EQUIPMENT,
            })
          }
        />
        <CardComponent
          icon={
            <Image
              src="/icons/diving-suit.svg"
              alt=""
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="BCD"
          onClick={() => null}
        />
        <CardComponent
          icon={
            <Image src="/icons/wetsuit.svg" alt="" width={150} height={150} />
          }
          text="Wetsuit"
          onClick={() => null}
        />
      </StateCards>
      <StateCards>
        <CardComponent
          icon={
            <Image src="/icons/regulator.svg" alt="" width={150} height={150} />
          }
          text="Regulator"
          onClick={() => null}
        />
        <CardComponent
          icon={
            <Image
              src="/icons/diving-mask.svg"
              alt=""
              width={150}
              height={150}
              layout="fixed"
            />
          }
          text="Mask"
          onClick={() => null}
        />
        <CardComponent
          icon={
            <Image
              src="/icons/oxygen-tank.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Tank"
          onClick={() => null}
        />
      </StateCards>
      <div className="mt-10">
        <Button
          variant="outlined"
          size="large"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_INFORMATION,
              value: {},
              previousState: STATE_ACTIONS.EQUIPMENT,
            })
          }
        >
          Next
        </Button>
      </div>
    </StatePage>
  );
};

export default EquipmentState;
