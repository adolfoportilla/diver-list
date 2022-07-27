import { reservationMachine } from "../utils/state-machine";
import { useMachine } from "@xstate/react";
import ReservationController from "../components/ReservationController";

const Reservation = () => {
  return <ReservationController />;
};

export default Reservation;
