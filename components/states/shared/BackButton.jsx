import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { MyContext } from "../../ReservationController";
import { useActor } from "@xstate/react";

const BackButton = (props) => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);

  const statesWithoutBackButton = ["reservation", "complete"];

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        !statesWithoutBackButton.includes(state.value)
          ? send({
              type: state.context.previousState[
                state.context.previousState.length - 1
              ],
            })
          : null
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
