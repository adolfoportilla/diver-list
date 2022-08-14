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
  diverInformation: (context, event) => event.value,
});

const setNumberOfDives = assign({
  numberOfDives: (context, event) => event.value,
});

const setIsDiverCertified = assign({
  isDiverCertified: (context, event) => event.value,
});

const pushToPreviousState = assign({
  previousState: (context, event) => {
    let previousStateArr = [...context.previousState];
    previousStateArr.push(event.previousState);
    return previousStateArr;
  },
});

const popFromPreviousState = assign({
  previousState: (context, event) => {
    let previousStateArr = [...context.previousState];
    previousStateArr.pop(event.previousState);
    return previousStateArr;
  },
});

export const STATE_ACTIONS = {
  RESERVATION: "RESERVATION",
  CALENDAR: "CALENDAR",
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
      previousState: [],
    },
    states: {
      reservation: {
        on: {
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: ["setReservationType", "pushToPreviousState"],
          },
          [STATE_ACTIONS.RECREATIONAL_DIVE]: {
            target: "calendar",
            actions: ["setReservationType", "pushToPreviousState"],
          },
        },
      },
      certificationDive: {
        on: {
          [STATE_ACTIONS.NEXT]: {
            target: "calendar",
            actions: ["setCertificationType", "pushToPreviousState"],
          },
          [STATE_ACTIONS.RESERVATION]: {
            target: "reservation",
            actions: "popFromPreviousState",
          },
        },
      },
      calendar: {
        on: {
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: ["setDate", "pushToPreviousState"],
          },
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: "pushToPreviousState",
          },
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: "popFromPreviousState",
          },
          [STATE_ACTIONS.RECREATIONAL_DIVE]: {
            target: "reservation",
            actions: "popFromPreviousState",
          },
          [STATE_ACTIONS.RESERVATION]: {
            target: "reservation",
            actions: "popFromPreviousState",
          },
        },
      },
      isDiverCertified: {
        on: {
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: ["setIsDiverCertified", "pushToPreviousState"],
          },
          [STATE_ACTIONS.CALENDAR]: {
            target: "calendar",
            actions: "popFromPreviousState",
          },
        },
      },
      lastDive: {},
      numberOfDives: {
        on: {
          [STATE_ACTIONS.DEEPEST_DIVE]: {
            target: "deepestDive",
            actions: ["setNumberOfDives", "pushToPreviousState"],
          },
          [STATE_ACTIONS.CALENDAR]: {
            target: "calendar",
            actions: "popFromPreviousState",
          },
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: "popFromPreviousState",
          },
        },
      },
      deepestDive: {
        on: {
          [STATE_ACTIONS.LAST_DIVE]: {
            target: "lastDive",
            actions: "pushToPreviousState",
          },
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: "popFromPreviousState",
          },
        },
      },
      lastDive: {
        on: {
          [STATE_ACTIONS.DIVER_INFORMATION]: {
            target: "diverInformation",
            actions: "pushToPreviousState",
          },
          [STATE_ACTIONS.DEEPEST_DIVE]: {
            target: "deepestDive",
            actions: "popFromPreviousState",
          },
        },
      },
      diverInformation: {
        on: {
          [STATE_ACTIONS.COMPLETE]: {
            target: "complete",
            actions: "setDiverInformation",
          },
          [STATE_ACTIONS.LAST_DIVE]: {
            target: "lastDive",
            actions: "popFromPreviousState",
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
      pushToPreviousState,
      popFromPreviousState,
    },
  }
);
