import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectComponent = (props) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        onChange={(event) => props.setValue(event.target.value)}
        label={props.label}
      >
        {props.options.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
