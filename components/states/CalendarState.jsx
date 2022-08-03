import React from "react";
import { useActor } from "@xstate/react";
import Calendar from "react-calendar";

// https://gist.github.com/wojtekmaj/a36712e5f8ea6e035ef8d845ab246cd5
// import styles from "./CalendarState.module.css";
// https://projects.wojtekmaj.pl/react-calendar/

// Style defined at:
// styles/calendar.css

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";

function disabledDates({ activeStartDate, date, view }) {
  const todaysDate = new Date();
  return date < todaysDate;
}

const CalendarState = () => {
  const machine = React.useContext(MyContext);

  const [date, setDate] = React.useState(new Date());

  const [state, send] = useActor(machine);

  const reservationtype = state.context.reservationType;

  return (
    <StatePage>
      <StateTitle title="Select date" />
      <div className="flex flex-col">
        <Calendar
          onChange={(value) => {
            //Todo (Willy) add state transition for calendar when certification dive is selected
            send({
              type:
                reservationtype === "recreational"
                  ? STATE_ACTIONS.IS_DIVER_CERTIFIED
                  : "",
              value,
            });
          }}
          value={date}
          tileDisabled={disabledDates}
          view="month"
        />
      </div>
    </StatePage>
  );
};

export default CalendarState;
