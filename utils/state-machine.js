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
const setDiverInformation = assign({
  diverInformation: (context, event) => event.diverInformation,
});

const setNumberOfDives = assign({
  numberOfDives: (context, event) => event.value,
});

const setIsDiverCertified = assign({
  isDiverCertified: (context, event) => event.value,
});

export const STATE_ACTIONS = {
  NEXT: "next",
  PREV: "prev",
  CERTIFICATION_DIVE: "CERTIFICATION_DIVE",
  RECREATIONAL_DIVE: "RECREATIONAL_DIVE",
  LAST_DIVE: "LAST_DIVE",
  DIVER_INFORMATION: "DIVER_INFORMATION",
  COMPLETE: "complete",
  NUMBER_OF_DIVES: "NUMBER_OF_DIVES",
  DEEPEST_DIVE: "DEEPEST_DIVE",
  IS_DIVER_CERTIFIED: "IS_DIVER_CERTIFIED",
};

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "reservation",
    context: {
      reservationType: null,
      isDiverCertified: null,
      certificationType: null,
      numberOfDives: null,
      date: null,
      time: null,
      diverInformation: null,
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
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: "setDate",
          },
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
          },
        },
      },
      isDiverCertified: {
        on: {
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: "setIsDiverCertified",
          },
          [STATE_ACTIONS.reservation]: {
            target: "reservation",
          },
        },
      },
      lastDive: {},
      numberOfDives: {
        on: {
          [STATE_ACTIONS.DEEPEST_DIVE]: {
            target: "deepestDive",
            actions: "setNumberOfDives",
          },
        },
      },
      deepestDive: {
        on: {
          [STATE_ACTIONS.LAST_DIVE]: {
            target: "lastDive",
          },
        },
      },
      lastDive: {},
      diverInformation: {
        on: {
          [STATE_ACTIONS.COMPLETE]: {
            target: "complete",
            actions: "setDiverInformation",
          },
        },
      },
      complete: {},
    },
  },
  {
    actions: {
      setReservationType,
      setNumberOfDives,
      setIsDiverCertified,
      setCertificationType,
      setDate,
      setDiverInformation,
    },
  }
);
