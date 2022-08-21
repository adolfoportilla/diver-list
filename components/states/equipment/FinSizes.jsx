import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const sizes = ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];

const FinSizes = (props) => {
  //Todo (Willy - adjust label width)
  return (
    <FormControl className="">
      <InputLabel className="">Size</InputLabel>
      <Select
        onChange={(event) => props.setFinSize(event.target.value)}
        label="Size"
      >
        {sizes.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FinSizes;
