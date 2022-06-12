import { createMachine, interpret } from "xstate";
import { useMachine } from "@xstate/react";

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
      REC_DIVE: "recreationalDive",
      CERT_DIVE: "certificationDive",
    },
    recreationalDive: {
      CALENDAR: "calendar",
    },
    calendar: {
      CERTIFIED_DIVER: "certifiedDiver",
    },
    certifiedDiver: {
      CERT_DIVE: "certificationDive",
      NUM_DIVES: "numberOfDives ",
    },
    discoveryDive: {},
    certificationDive: {},
    numberOfDives: {
      DEEPEST_DIVE: "deepestDive",
    },
    deepestDive: {
      LAST_DIVE: "lastDive",
    },
    lastDive: {
      CONTACT_INFO: "contactInfo",
    },
    contactInfo: {
      DONE: "done",
    },
    done: {
      SHARE_RESERVATION: "shareReservation",
    },
    shareReservation: {},
    openWater: {
      CALENDAR: "calendar",
    },
    aow: {
      CALENDAR: "calendar",
    },
    done: {},
  },
});
