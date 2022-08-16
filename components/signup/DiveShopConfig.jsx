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
];
const DIVE_TYPES = ["recreational", "certification"];

const SelectableChips = (props) => {
  const [selected, setSelected] = React.useState(
    props.options.map(() => false)
  );
  const [selectedAll, setSelectedAll] = React.useState(false);

  const setSelectedBasedOnTrue = (options, array) => {
    const result = [];
    options.forEach((option, index) => {
      if (option) {
        result.push(array[index]);
      }
    });
    return result;
  };

  return (
    <div>
      <div className="flex flex-row mb-2 items-center">
        <div>
          <span>{props.text}</span>
        </div>
        <ToggleButton
          value={selectedAll}
          selected={selectedAll}
          onClick={() => {
            const newValues = selected.map((_) => !selectedAll);
            setSelected(newValues);
            props.setOptions(setSelectedBasedOnTrue(newValues, props.options));
            setSelectedAll(!selectedAll);
          }}
          size="small"
          color="primary"
          className="ml-2 h-6 w-21 text-xs"
        >
          Select All
        </ToggleButton>
      </div>
      <div className={props.optionsClassName || "space-x-2"}>
        {props.options.map((day, index) => (
          <ToggleButton
            value="check"
            selected={selected[index]}
            onChange={() => {
              let copySelected = selected.map((s) => s);
              copySelected[index] = !selected[index];
              setSelected(copySelected);
              props.setOptions(
                setSelectedBasedOnTrue(copySelected, props.options)
              );
            }}
            key={day}
            color="primary"
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

  const [selectedDays, setSelectedDays] = React.useState([]);
  const [selectedHours, setSelectedHours] = React.useState([]);
  const [selectedDiveTypes, setSelectedDiveTypes] = React.useState([]);

  const isNextDisabled = () => {
    if (!selectedDays.length || selectedDays.every((e) => e === false)) {
      return true;
    }
    if (!selectedHours.length || selectedHours.every((e) => e === false)) {
      return true;
    }
    if (
      !selectedDiveTypes.length ||
      selectedDiveTypes.every((e) => e === false)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="flex flex-col align-center space-y-6">
        <div>
          <SelectableChips
            options={DAYS}
            text="Which days do you offer dives?"
            setOptions={(selected) => setSelectedDays(selected)}
          />
        </div>
        <div>
          <SelectableChips
            options={HOURS}
            text="Which times do you offer dives?"
            optionsClassName="grid grid-cols-7 gap-2"
            setOptions={(selected) => setSelectedHours(selected)}
          />
        </div>
        <div>
          <SelectableChips
            options={DIVE_TYPES}
            text="What types of dives do you offer?"
            setOptions={(selected) => setSelectedDiveTypes(selected)}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button
          variant="outlined"
          onClick={() => {
            send({
              type: STATE_ACTIONS.NEXT,
              data: {
                days: selectedDays,
                hours: selectedHours,
                diveTypes: selectedDiveTypes,
              },
            });
          }}
          disabled={isNextDisabled()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
