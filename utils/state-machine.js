import { createMachine, assign } from "xstate";

const setReservationType = assign({
  reservationType: (context, event) => {
    return event;
  },
});

export const STATE_ACTIONS = {
  NEXT: "next",
  PREV: "prev",
};

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "reservation",
    context: {
      userName: "",
    },
    states: {
      reservation: {
        on: {
          [STATE_ACTIONS.NEXT]: {
            target: "complete",
            actions: "setReservationType",
          },
        },
        done: {},
      },
      complete: {},
    },
  },
  {
    actions: {
      setReservationType,
    },
  }
);
