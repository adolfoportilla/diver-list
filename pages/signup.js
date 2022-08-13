import React from "react";

import StatePage from "../components/states/shared/StatePage";
import StateTitle from "../components/states/shared/StateTitle";
import Machine from "../components/signup/Machine";

const Signup = () => {
  return (
    <div className="w-screen max-w-full h-full">
      <StatePage>
        <StateTitle title="Sign up for Free!" />
        <Machine />
      </StatePage>
    </div>
  );
};

export default Signup;
