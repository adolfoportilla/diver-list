import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { MyContext } from "../../ReservationController";
import { useActor } from "@xstate/react";

const BackButton = (props) => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  const statesWithoutBackButton = ["reservation", "complete"];

  return statesWithoutBackButton.includes(state.value) ? (
    <div></div>
  ) : (
    <div
      className="cursor-pointer"
      onClick={() =>
        send({
          type: state.context.previousState[
            state.context.previousState.length - 1
          ],
        })
      }
    >
      <ArrowBack fontSize="large" />
    </div>
  );
};

export default BackButton;
