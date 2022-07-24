import { createMachine, interpret } from "xstate";

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
export const reservationMachine = createMachine({
  id: "reservation",
  initial: "reservation",
  context: {
    userName: "",
  },
  states: {
    reservation: {
      on: {
        DONE: { target: "done" },
      },
    },
    done: {},
  },
});
