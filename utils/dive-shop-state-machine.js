import { createMachine, assign } from "xstate";

const setDiveShopInfo = assign({
  diveShopInfo: (context, event) => event.value,
});
const setDiveShopConfig = assign({
  diveShopConfig: (context, event) => event.value,
});

export const STATE_ACTIONS = {
  NEXT: "next",
};

// Stateless machine definition
export const stateMachine = createMachine(
  {
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
            actions: "setDiveShopInfo",
          },
        },
      },
      diveShopInfo: {
        on: {
          [STATE_ACTIONS.NEXT]: {
            target: "complete",
            actions: "setDiveShopInfo",
          },
        },
      },
      complete: {},
    },
  },
  {
    actions: {
      setDiveShopInfo,
      setDiveShopConfig,
    },
  }
);
