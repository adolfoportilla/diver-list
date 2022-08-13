import React from "react";
import { useActor } from "@xstate/react";

import { MyContext } from "./Machine";
import DiveShopInfo from "./DiveShopInfo";
import DiveShopConfig from "./DiveShopConfig";

const DiveShopSignUpStateController = () => {
  const machine = React.useContext(MyContext);

  const [state] = useActor(machine);
  switch (true) {
    case state.matches("diveShopInfo"):
      return <DiveShopInfo />;
    case state.matches("diveShopConfig"):
      return <DiveShopConfig />;
    case state.matches("complete"):
      return <div>Complete</div>;
    default:
      return <div>Oops! Something went wrong</div>;
  }
};

export default DiveShopSignUpStateController;
