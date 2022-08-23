import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import EquipmentCard from "./shared/EquipmentCard";

const FINS_OPTIONS = ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
const BCD_OPTIONS = ["Small", "Medium", "Large"];
const WETSUIT_OPTIONS = ["Small", "Medium", "Large"];
const REGULATOR_OPTIONS = ["Yes", "No"];
const MASK_OPTIONS = ["Yes", "No"];
const TANK_OPTIONS = ["80 (regular)", "100 (large)"];

const EquipmentState = () => {
  const machine = React.useContext(MyContext);
  const [, send] = useActor(machine);

  const [finSize, setFinSize] = React.useState("");
  const [bcdSize, setBcdSize] = React.useState("");
  const [wetsuitSize, setWetsuitSize] = React.useState("");
  const [regulatorChoice, setRegulatorChoice] = React.useState("");
  const [maskChoice, setMaskChoice] = React.useState("");
  const [tankSize, setTankSize] = React.useState("");

  return (
    <StatePage>
      <StateTitle title="Select the equipment you will need" />
      <div>
        <StateCards>
          <EquipmentCard
            icon="/icons/fins.svg"
            options={FINS_OPTIONS}
            choice={finSize}
            setChoice={setFinSize}
            text="Fins"
          />
          <EquipmentCard
            icon="/icons/diving-suit.svg"
            options={BCD_OPTIONS}
            choice={bcdSize}
            setChoice={setBcdSize}
            text="BCD"
          />
          <EquipmentCard
            icon="/icons/wetsuit.svg"
            options={WETSUIT_OPTIONS}
            choice={wetsuitSize}
            setChoice={setWetsuitSize}
            text="Wetsuit"
          />
        </StateCards>
        <StateCards>
          <EquipmentCard
            icon="/icons/regulator.svg"
            options={REGULATOR_OPTIONS}
            choice={regulatorChoice}
            setChoice={setRegulatorChoice}
            text="Regulator"
          />
          <EquipmentCard
            icon="/icons/diving-mask.svg"
            options={MASK_OPTIONS}
            choice={maskChoice}
            setChoice={setMaskChoice}
            text="Mask"
          />
          <EquipmentCard
            icon="/icons/oxygen-tank.svg"
            options={TANK_OPTIONS}
            choice={tankSize}
            setChoice={setTankSize}
            text="Tank"
          />
        </StateCards>
        <div className="flex flex-row-reverse">
          <div className="mt-10 w-32 md:w-48">
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
              fullWidth={true}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </StatePage>
  );
};

export default EquipmentState;
