import { createMachine, assign } from "xstate";

export const STATE_ACTIONS = {
  NEXT: "next",
};

// Stateless machine definition
export const stateMachine = createMachine({
  id: "dive-shop-signup",
  initial: "diveShopConfig",
  context: {
    diveShopInfo: null,
    diveShopConfig: null,
  },
  states: {
    diveShopConfig: {
      on: {
        [STATE_ACTIONS.NEXT]: {
          target: "diveShopInfo",
          actions: assign({
            diveShopConfig: (contex, event) => event.data,
          }),
        },
      },
    },
    diveShopInfo: {
      on: {
        [STATE_ACTIONS.NEXT]: {
          target: "complete",
          actions: assign({
            diveShopInfo: (contex, event) => event.data,
          }),
        },
      },
    },
    complete: {},
  },
});
