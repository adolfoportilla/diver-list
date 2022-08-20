import React, { useState } from "react";

import { Button } from "@mui/material";
import StatePage from "../shared/StatePage";
import StateTitle from "../shared/StateTitle";
import StateCards from "../shared/StateCards";

const sizes = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
  "14",
];

const FinSizeState = () => {
  return (
    <StatePage>
      <StateTitle title="What fin size will you need?" />
      <StateCards>
        <div></div>
      </StateCards>
      <div className="mt-10">
        <Button variant="outlined" size="large">
          Next
        </Button>
      </div>
    </StatePage>
  );
};

export default FinSizeState;
