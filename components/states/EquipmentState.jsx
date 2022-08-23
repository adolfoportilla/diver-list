import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import EquipmentCard from "./shared/EquipmentCard";

const EquipmentState = () => {
  const machine = React.useContext(MyContext);
  const [, send] = useActor(machine);

  const [finSize, setFinSize] = React.useState("");
  const [bcdSize, setBcdSize] = React.useState("");
  const [wetsuitSize, setWetsuitSize] = React.useState("");
  const [regulatorChoice, setRegulatorChoice] = React.useState("");
  const [maskChoice, setMaskChoice] = React.useState("");
  const [tankSize, setTankSize] = React.useState("");

  const finsOptions = ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
  const bcdOptions = ["small", "medium", "large"];
  const wetsuitOptions = ["small", "medium", "large"];
  const regulatorChoices = ["Yes", "No"];
  const maskChoices = ["Yes", "No"];
  const tankChoices = ["80 (normal)", "100 (large)"];

  return (
    <StatePage>
      <StateTitle title="Select the equipment you will need" />
      <StateCards>
        <EquipmentCard
          icon="/icons/fins.svg"
          options={finsOptions}
          choice={finSize}
          setChoice={setFinSize}
          text="Fins"
        />
        <EquipmentCard
          icon="/icons/diving-suit.svg"
          options={bcdOptions}
          choice={bcdSize}
          setChoice={setBcdSize}
          text="BCD"
        />
        <EquipmentCard
          icon="/icons/wetsuit.svg"
          options={wetsuitOptions}
          choice={wetsuitSize}
          setChoice={setWetsuitSize}
          text="Wetsuit"
        />
      </StateCards>
      <StateCards>
        <EquipmentCard
          icon="/icons/regulator.svg"
          options={regulatorChoices}
          choice={regulatorChoice}
          setChoice={setRegulatorChoice}
          text="Regulator"
        />
        <EquipmentCard
          icon="/icons/diving-mask.svg"
          options={maskChoices}
          choice={maskChoice}
          setChoice={setMaskChoice}
          text="Mask"
        />
        <EquipmentCard
          icon="/icons/oxygen-tank.svg"
          options={tankChoices}
          choice={tankSize}
          setChoice={setTankSize}
          text="Tank"
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
