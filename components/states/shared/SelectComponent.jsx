import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectComponent = (props) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        onChange={(event) => props.setValue(event.target.value)}
        label={props.label}
        sx={{ width: 125 }}
        defaultValue={props.defaultValue}
        value={props.value}
      >
        {props.options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
