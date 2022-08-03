import React from "react";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";

//Todo (Willy) add options for user to select
const IsDiverCertifiedState = () => {
  return (
    <StatePage>
      <StateTitle title="Are you a certified diver?"></StateTitle>
    </StatePage>
  );
};

export default IsDiverCertifiedState;
