import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import StateCards from "./shared/StateCards";
import FinsCard from "./equipment/FinsCard";
import BCDCard from "./equipment/BCDCard";
import WetsuitCard from "./equipment/WetsuitCard";
import RegulatorCard from "./equipment/RegulatorCard";
import MaskCard from "./equipment/MaskCard";
import TankCard from "./equipment/TankCard";

const EquipmentState = () => {
  const machine = React.useContext(MyContext);
  const [, send] = useActor(machine);

  const [finSelectVisible, setFinSelectVisible] = React.useState(false);
  const [finSize, setFinSize] = React.useState("");

  const [bcdSelectVisible, setBcdSelectVisible] = React.useState(false);
  const [bcdSize, setBcdSize] = React.useState("");

  const [wetsuitSelectVisible, setWetsuitSelectVisible] = React.useState(false);
  const [wetsuitSize, setWetsuitSize] = React.useState("");

  const [regulatorSelectVisible, setRegulatorSelectVisible] =
    React.useState(false);
  const [regulatorChoice, setRegulatorChoice] = React.useState("");

  const [maskSelectVisible, setMaskSelectVisible] = React.useState(false);
  const [maskChoice, setMaskChoice] = React.useState("");

  const [tankSelectVisible, setTankSelectVisible] = React.useState(false);
  const [tankSize, setTankSize] = React.useState("");

  return (
    <StatePage>
      <StateTitle title="Select the equipment you will need" />
      <StateCards>
        <FinsCard
          finSelectVisible={finSelectVisible}
          finSize={finSize}
          setFinSize={setFinSize}
          setFinSelectVisible={setFinSelectVisible}
        />
        <BCDCard
          bcdSelectVisible={bcdSelectVisible}
          bcdSize={bcdSize}
          setBcdSize={setBcdSize}
          setBcdSelectVisible={setBcdSelectVisible}
        />
        <WetsuitCard
          wetsuitSelectVisible={wetsuitSelectVisible}
          wetSuitSize={wetsuitSize}
          setWetsuitSize={setWetsuitSize}
          setWetsuitSelectVisible={setWetsuitSelectVisible}
        />
      </StateCards>
      <StateCards>
        <RegulatorCard
          regulatorSelectVisible={regulatorSelectVisible}
          regulatorChoice={regulatorChoice}
          setRegulatorChoice={setRegulatorChoice}
          setRegulatorSelectVisible={setRegulatorSelectVisible}
        />
        <MaskCard
          maskSelectVisible={maskSelectVisible}
          maskChoice={maskChoice}
          setMaskChoice={setMaskChoice}
          setMaskSelectVisible={setMaskSelectVisible}
        />
        <TankCard
          tankSelectVisible={tankSelectVisible}
          setTankSelectVisible={setTankSelectVisible}
          tankSize={tankSize}
          setTankSize={setTankSize}
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
