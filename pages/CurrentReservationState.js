import React from "react";

const CurrentReservationState = () => {
  const reservationService = useContext(ReservationStateContext);
  const state = useActor(reservationService.reservationService);
  switch (true) {
    case state.matches("reservation"):
      return <div>hello world</div>;
  }
};

export default CurrentReservationState;
