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
        REC_DIVE: "recreationalDive",
      },
      on: {
        CERT: "certificationDive",
      },
    },
    recreationalDive: {
      on: {
        CALENDAR: "calendar",
      },
    },
    calendar: {
      on: {
        CERTIFIED_DIVER: "certifiedDiver",
      },
    },
    certifiedDiver: {
      on: {
        CERT_DIVE: "certificationDive",
      },
      on: {
        NUM_DIVES: "numberOfDives ",
      },
    },
    discoveryDive: {},
    certificationDive: {},
    numberOfDives: {
      on: {
        DEEPEST_DIVE: "deepestDive",
      },
    },
    deepestDive: {
      on: {
        LAST_DIVE: "lastDive",
      },
    },
    lastDive: {
      on: {
        CONTACT_INFO: "contactInfo",
      },
    },
    contactInfo: {
      on: {
        DONE: "done",
      },
    },
    done: {
      on: {
        SHARE_RESERVATION: "shareReservation",
      },
    },
    shareReservation: {},
    openWater: {
      on: {
        CALENDAR: "calendar",
      },
    },
    aow: {
      on: {
        CALENDAR: "calendar",
      },
    },
    done: {},
  },
});
