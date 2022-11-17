import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";
import { startCase } from "lodash";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import EquipmentCard from "./shared/EquipmentCard";
import { statesText } from "../../utils/app-text";
import { EQUIPMENT } from "../../utils/supabase";
import { dictionary } from "../../utils/dictionary";

const EquipmentState = () => {
  const context = React.useContext(MyContext);
  const [, send] = useActor(context.service);

  const [finSize, setFinSize] = React.useState(null);
  const [bcdSize, setBcdSize] = React.useState(null);
  const [wetsuitSize, setWetsuitSize] = React.useState(null);
  const [regulatorChoice, setRegulatorChoice] = React.useState(null);
  const [maskChoice, setMaskChoice] = React.useState(null);
  const [tankSize, setTankSize] = React.useState(null);

  return (
    <StatePage>
      <StateTitle title={statesText.equipmentState.title[context.language]} />
      <div>
        <StateCards>
          <EquipmentCard
            icon="/icons/fins.svg"
            options={EQUIPMENT.FINS}
            choice={finSize}
            setChoice={setFinSize}
            text={startCase(dictionary.fins[context.language])}
            selectLabel={startCase(dictionary.size[context.language])}
          />
          <EquipmentCard
            icon="/icons/diving-mask.svg"
            options={EQUIPMENT.MASK}
            choice={maskChoice}
            setChoice={setMaskChoice}
            text={startCase(dictionary.mask[context.language])}
            selectLabel={startCase(dictionary.choice[context.language])}
          />

          <EquipmentCard
            icon="/icons/wetsuit.svg"
            options={EQUIPMENT.WETSUIT}
            choice={wetsuitSize}
            setChoice={setWetsuitSize}
            text={statesText.equipmentState.wetsuit[context.language]}
            selectLabel={startCase(dictionary.size[context.language])}
          />
        </StateCards>
        <StateCards>
          <EquipmentCard
            icon="/icons/diving-suit.svg"
            options={EQUIPMENT.BCD}
            choice={bcdSize}
            setChoice={setBcdSize}
            text="BCD"
            selectLabel={startCase(dictionary.size[context.language])}
          />
          <EquipmentCard
            icon="/icons/regulator.svg"
            options={EQUIPMENT.REGULATOR}
            choice={regulatorChoice}
            setChoice={setRegulatorChoice}
            text={statesText.equipmentState.regulator[context.language]}
            selectLabel={startCase(dictionary.choice[context.language])}
          />
          <EquipmentCard
            icon="/icons/oxygen-tank.svg"
            options={EQUIPMENT.TANK}
            choice={tankSize}
            setChoice={setTankSize}
            text={statesText.equipmentState.tank[context.language]}
            selectLabel={startCase(dictionary.size[context.language])}
          />
        </StateCards>
        <div className="mt-10 justify-self-end flex justify-end">
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
            {statesText.nextButton[context.language]}
          </Button>
        </div>
      </div>
    </StatePage>
  );
};

export default EquipmentState;
