import { createMachine, assign } from "xstate";

const setReservationType = assign({
  reservationType: (context, event) => {
    return event.value;
  },
});

const removeReservationType = assign({
  reservationType: () => null,
});
const setCertificationType = assign({
  certificationType: (context, event) => event.value,
});

const removeCertificationType = assign({
  certificationType: () => null,
});

const setDeepestDive = assign({
  deepestDive: (context, event) => event.value,
});

const removeDeepestDive = assign({
  deepestDive: () => null,
});

const setLastDive = assign({
  lastDive: (context, event) => event.value,
});

const setEquipment = assign({
  equipment: (context, event) => event.value,
});

const removeEquipment = assign({
  equipment: () => null,
});

const removeLastDive = assign({
  lastDive: () => null,
});

const setDate = assign({
  date: (context, event) => event.date,
});

const removeDate = assign({
  date: () => null,
  time: () => null,
});

const setDiverInformation = assign({
  diverInformation: (context, event) => event.value,
});

const removeDiverInformation = assign({
  diverInformation: () => null,
});

const setNumberOfDives = assign({
  numberOfDives: (context, event) => event.value,
});

const removeNumberOfDives = assign({
  numberOfDives: () => null,
});

const setIsDiverCertified = assign({
  isDiverCertified: (context, event) => event.value,
});

const removeIstDiverCertified = assign({
  isDiverCertified: () => null,
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
  EQUIPMENT: "EQUIPMENT",
  DIVER_INFORMATION: "DIVER_INFORMATION",
  COMPLETE: "complete",
  NUMBER_OF_DIVES: "NUMBER_OF_DIVES",
  DEEPEST_DIVE: "DEEPEST_DIVE",
  IS_DIVER_CERTIFIED: "IS_DIVER_CERTIFIED",
  DIVER_NOT_CERTIFIED: "DIVER_NOT_CERTIFIED",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  CREATE_SUPABASE_RESERVATION: "CREATE_SUPABASE_RESERVATION",
};

// Stateless machine definition
export const reservationMachine = createMachine(
  {
    id: "reservation",
    initial: "fetchDiveConfig",
    context: {
      diveShopConfig: null,
      reservationType: null,
      isDiverCertified: null,
      certificationType: null,
      numberOfDives: null,
      deepestDive: null,
      lastDive: null,
      date: null,
      time: null,
      equipment: null,
      diverInformation: null,
      previousState: [],
    },
    states: {
      fetchDiveConfig: {
        on: {
          [STATE_ACTIONS.FETCH_SUCCESS]: {
            target: "reservation",
            actions: assign({
              diveShopConfig: (context, event) => event.value,
            }),
          },
        },
      },
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
          [STATE_ACTIONS.CALENDAR]: {
            target: "calendar",
            actions: ["setCertificationType", "pushToPreviousState"],
          },

          //Back
          //we reset isDiverCertified here in case that the diver
          //selected that they are not certified, and opted to get
          //certified

          [STATE_ACTIONS.RESERVATION]: {
            target: "reservation",
            actions: [
              "popFromPreviousState",
              "removeReservationType",
              "removeIstDiverCertified",
            ],
          },
        },
      },
      calendar: {
        on: {
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: ["pushToPreviousState", "setDate"],
          },
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: ["pushToPreviousState", "setDate"],
          },

          //Back
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: ["popFromPreviousState", "removeCertificationType"],
          },

          //Back
          [STATE_ACTIONS.RESERVATION]: {
            target: "reservation",
            actions: ["popFromPreviousState", "removeReservationType"],
          },
        },
      },
      isDiverCertified: {
        on: {
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: ["setIsDiverCertified", "pushToPreviousState"],
          },
          [STATE_ACTIONS.DIVER_NOT_CERTIFIED]: {
            target: "diverNotCertified",
            actions: ["setIsDiverCertified", "pushToPreviousState"],
          },

          //Back
          [STATE_ACTIONS.CALENDAR]: {
            target: "calendar",
            actions: ["popFromPreviousState", "removeDate"],
          },
        },
      },
      diverNotCertified: {
        on: {
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: ["popFromPreviousState", "removeIstDiverCertified"],
          },
          [STATE_ACTIONS.CERTIFICATION_DIVE]: {
            target: "certificationDive",
            actions: ["pushToPreviousState", "setReservationType"],
          },
        },
      },
      numberOfDives: {
        on: {
          [STATE_ACTIONS.DEEPEST_DIVE]: {
            target: "deepestDive",
            actions: ["setNumberOfDives", "pushToPreviousState"],
          },

          //Back
          [STATE_ACTIONS.CALENDAR]: {
            target: "calendar",
            actions: ["popFromPreviousState", "removeDate"],
          },

          //Back
          [STATE_ACTIONS.IS_DIVER_CERTIFIED]: {
            target: "isDiverCertified",
            actions: ["popFromPreviousState", "removeIstDiverCertified"],
          },
        },
      },
      deepestDive: {
        on: {
          [STATE_ACTIONS.LAST_DIVE]: {
            target: "lastDive",
            actions: ["pushToPreviousState", "setDeepestDive"],
          },

          //Back
          [STATE_ACTIONS.NUMBER_OF_DIVES]: {
            target: "numberOfDives",
            actions: ["popFromPreviousState", "removeNumberOfDives"],
          },
        },
      },
      lastDive: {
        on: {
          [STATE_ACTIONS.EQUIPMENT]: {
            target: "equipment",
            actions: ["pushToPreviousState", "setLastDive"],
          },
          //Back
          [STATE_ACTIONS.DEEPEST_DIVE]: {
            target: "deepestDive",
            actions: ["popFromPreviousState", "removeDeepestDive"],
          },
        },
      },
      equipment: {
        on: {
          [STATE_ACTIONS.DIVER_INFORMATION]: {
            target: "diverInformation",
            actions: ["pushToPreviousState", "setEquipment"],
          },

          //Back
          [STATE_ACTIONS.LAST_DIVE]: {
            target: "lastDive",
            actions: ["popFromPreviousState", "removeLastDive"],
          },
        },
      },

      diverInformation: {
        on: {
          [STATE_ACTIONS.CREATE_SUPABASE_RESERVATION]: {
            target: "createSupabaseReservation",
            actions: "setDiverInformation",
          },
          //Back
          [STATE_ACTIONS.EQUIPMENT]: {
            target: "equipment",
            actions: ["popFromPreviousState", "removeEquipment"],
          },
        },
      },
      createSupabaseReservation: {
        on: {
          [STATE_ACTIONS.COMPLETE]: {
            target: "complete",
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
      removeDate,
      removeCertificationType,
      removeDiverInformation,
      removeIstDiverCertified,
      removeNumberOfDives,
      removeReservationType,
      setDeepestDive,
      removeDeepestDive,
      setLastDive,
      removeLastDive,
      setEquipment,
      removeEquipment,
    },
  }
);
