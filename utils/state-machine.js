import { createMachine, assign } from "xstate";

const setReservationType = assign({
  reservationType: (context, event) => {
    return event.value;
  },
});
const setCertificationType = assign({
  certificationType: (context, event) => event.value,
});

export const STATE_ACTIONS = {
  NEXT: "next",
  PREV: "prev",
  CERTIFICATION_DIVE: "CERTIFICATION_DIVE",
  RECREATIONAL_DIVE: "RECREATIONAL_DIVE",
};

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "reservation",
    context: {
      reservationType: null,
      certificationType: null,
    },
    states: {
      reservation: {
        on: {
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: "setReservationType",
          },
          [STATE_ACTIONS.RECREATIONAL_DIVE]: {
            target: "complete",
            actions: "setReservationType",
          },
        },
      },
      certificationDive: {
        on: {
          [STATE_ACTIONS.NEXT]: {
            target: "complete",
            actions: "setCertificationType",
          },
        },
      },
      complete: {},
    },
  },
  {
    actions: {
      setReservationType,
      setCertificationType,
    },
  }
);
