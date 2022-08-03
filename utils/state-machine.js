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
  date: (context, event) => event.date,
  time: (context, event) => event.time,
});

export const STATE_ACTIONS = {
  NEXT: "next",
  PREV: "prev",
  CERTIFICATION_DIVE: "CERTIFICATION_DIVE",
  RECREATIONAL_DIVE: "RECREATIONAL_DIVE",
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
      time: null,
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
          [STATE_ACTIONS.COMPLETE]: {
            target: "complete",
            actions: "setDate",
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
      setDate,
    },
  }
);
