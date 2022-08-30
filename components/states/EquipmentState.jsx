import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import EquipmentCard from "./shared/EquipmentCard";
import { statesText } from "../../utils/app-text";

const EquipmentState = () => {
  const context = React.useContext(MyContext);
  const [, send] = useActor(context.service);

  const [finSize, setFinSize] = React.useState("");
  const [bcdSize, setBcdSize] = React.useState("");
  const [wetsuitSize, setWetsuitSize] = React.useState("");
  const [regulatorChoice, setRegulatorChoice] = React.useState("");
  const [maskChoice, setMaskChoice] = React.useState("");
  const [tankSize, setTankSize] = React.useState("");

  const finsOptions = ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];

  return (
    <StatePage>
      <StateTitle title={statesText.equipmentState.title[context.language]} />
      <StateCards>
        <EquipmentCard
          icon="/icons/fins.svg"
          options={finsOptions}
          choice={finSize}
          setChoice={setFinSize}
          text={statesText.equipmentState.fins[context.language]}
        />
        <EquipmentCard
          icon="/icons/diving-suit.svg"
          options={statesText.equipmentState.bcdOptions[context.language]}
          choice={bcdSize}
          setChoice={setBcdSize}
          text="BCD"
        />
        <EquipmentCard
          icon="/icons/wetsuit.svg"
          options={statesText.equipmentState.wetsuitOptions[context.language]}
          choice={wetsuitSize}
          setChoice={setWetsuitSize}
          text={statesText.equipmentState.wetsuit[context.language]}
        />
      </StateCards>
      <StateCards>
        <EquipmentCard
          icon="/icons/regulator.svg"
          options={statesText.equipmentState.regulatorOptions[context.language]}
          choice={regulatorChoice}
          setChoice={setRegulatorChoice}
          text={statesText.equipmentState.regulator[context.language]}
        />
        <EquipmentCard
          icon="/icons/diving-mask.svg"
          options={statesText.equipmentState.maskOptions[context.language]}
          choice={maskChoice}
          setChoice={setMaskChoice}
          text={statesText.equipmentState.mask[context.language]}
        />
        <EquipmentCard
          icon="/icons/oxygen-tank.svg"
          options={statesText.equipmentState.tankOptions[context.language]}
          choice={tankSize}
          setChoice={setTankSize}
          text={statesText.equipmentState.tank[context.language]}
        />
      </StateCards>
      <div className="mt-10">
        <Button
          variant="outlined"
          size="large"
          onClick={() =>
            send({
              type: STATE_ACTIONS.DIVER_INFORMATION,
              value: {
                finSize,
                bcdSize,
                wetsuitSize,
                regulatorChoice,
                maskChoice,
                tankSize,
              },
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
