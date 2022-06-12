import { reservationMachine } from "../utils/state-machine";
import { useMachine } from "@xstate/react";

const reservation = () => {
  const [current, send] = useMachine(reservationMachine);

  return null;
};

export default reservation;
