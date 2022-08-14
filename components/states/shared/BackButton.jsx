import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { MyContext } from "../../ReservationController";
import { useActor } from "@xstate/react";

const BackButton = (props) => {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  const statesWithoutBackButton = ["reservation", "complete"];

  return (
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
      <ArrowBack
        fontSize="large"
        className={
          statesWithoutBackButton.includes(state.value) ? "invisible" : ""
        }
      />
    </div>
  );
};

export default BackButton;
