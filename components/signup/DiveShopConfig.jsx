import React from "react";
import { ToggleButton, Button, ToggleButtonGroup } from "@mui/material";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/dive-shop-state-machine";
import { MyContext } from "./Machine";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const HOURS = [
  "6:00am",
  "7:00am",
  "8:00am",
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
  "6:00pm",
  "7:00pm",
  "8:00pm",
];

const SelectableChips = (props) => {
  const [selected, setSelected] = React.useState(
    props.options.map(() => false)
  );
  const [selectedAll, setSelectedAll] = React.useState(false);
  return (
    <div>
      <div className="flex flex-row mb-2">
        <div>
          <span>{props.text}</span>
        </div>
        <div>
          <ToggleButton
            value={selectedAll}
            selected={selectedAll}
            onClick={() => {
              setSelected(selected.map((_) => !selectedAll));
              setSelectedAll(!selectedAll);
            }}
            size="small"
          >
            Select All
          </ToggleButton>
        </div>
      </div>
      <div className="space-x-2">
        {props.options.map((day, index) => (
          <ToggleButton
            value="check"
            selected={selected[index]}
            onChange={() => {
              let copySelected = selected.map((s) => s);
              copySelected[index] = !selected[index];
              setSelected(copySelected);
            }}
            key={day}
          >
            <span className="font-normal font-mono">{day}</span>
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

export default function DiveShopConfig() {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);
  return (
    <div className="w-2/5">
      <div className="flex flex-col align-center space-y-6">
        <div>
          <SelectableChips
            options={DAYS}
            text="Which days do you offer dives?"
          />
        </div>
        <div>
          <SelectableChips
            options={HOURS}
            text="Which times do you offer dives?"
          />
        </div>
        <div>
          <SelectableChips
            options={["Recreational", "Certification"]}
            text="What types of dives do you offer?"
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button
          variant="outlined"
          onClick={() => {
            send({
              type: STATE_ACTIONS.NEXT,
            });
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
