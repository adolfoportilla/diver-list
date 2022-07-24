import { createMachine, assign } from "xstate";

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "reservation",
    context: {
      userName: "",
      reservationType: "",
    },
    states: {
      reservation: {
        on: {
          NEXT: { target: "done", actions: "setReservationType" },
        },
      },
      done: {},
    },
  },
  {
    actions: {
      setReservationType,
    },
  }
);

const setReservationType = assign({
  reservationType: (context, event) => {
    console.log("event", event);

    return event;
  },
});
