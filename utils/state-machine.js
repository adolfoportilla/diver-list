import { createMachine, assign } from "xstate";

const setReservationType = assign({
  reservationType: (context, event) => {
    return event.value;
  },
});
const setCertificationType = assign({
  certificationType: (context, event) => event.value,
});
const setDate = assign({
  date: (context, event) => event.value,
});

export const STATE_ACTIONS = {
  NEXT: "next",
  PREV: "prev",
  CERTIFICATION_DIVE: "CERTIFICATION_DIVE",
  RECREATIONAL_DIVE: "RECREATIONAL_DIVE",
  IS_DIVER_CERTIFIED: "IS_DIVER_CERTIFIED",
  COMPLETE: "complete",
};

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "reservation",
    context: {
      reservationType: null,
      certificationType: null,
      date: null,
    },
    states: {
      reservation: {
        on: {
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: "setReservationType",
          },
          [STATE_ACTIONS.RECREATIONAL_DIVE]: {
            target: "calendar",
            actions: "setReservationType",
          },
        },
      },
      certificationDive: {
        on: {
          [STATE_ACTIONS.NEXT]: {
            target: "calendar",
            actions: "setCertificationType",
          },
        },
      },
      calendar: {
        on: {
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: "setDate",
          },
        },
      },
      isDiverCertified: {},
      complete: {},
    },
  },
  {
    actions: {
      setReservationType,
      setCertificationType,
      setDate,
    },
  }
);
