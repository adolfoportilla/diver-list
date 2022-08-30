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
import { statesText } from "../../utils/app-text";

function disabledDates({ activeStartDate, date, view }) {
  const todaysDate = new Date();
  return date < todaysDate;
}

// TODO(adolfo): read from config file, instead of constants variable.
const AVAILABLE_TIMES = [" 8:00", " 9:00", "10:00", "11:00"];

// TODO(adolfo): make component more generic so others can use it.
// TODO2(adolfo): If we end up needing a lot of components like this one, consider using AntD or MaterialUI
const Tag = ({ text, onClick }) => (
  <div className="border rounded-md bg-gray-100 border-gray-400 hover:bg-sky-50 hover:border-sky-600">
    <button className="px-3 py-1" onClick={(event) => onClick(text)}>
      {text}
    </button>
  </div>
);

const CalendarState = () => {
  const context = React.useContext(MyContext);

  const [dateClicked, setDateClicked] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const [state, send] = useActor(context.service);

  const sendEvent = (time) => {
    if (state.context.reservationType == "recreational") {
      send({
        type: STATE_ACTIONS.IS_DIVER_CERTIFIED,
        date,
        time,
        previousState: STATE_ACTIONS.CALENDAR,
      });
    } else if (state.context.reservationType == "certification") {
      send({
        type: STATE_ACTIONS.NUMBER_OF_DIVES,
        date,
        time,
        previousState: STATE_ACTIONS.CALENDAR,
      });
    } else {
      alert("whoops");
    }
  };

  return (
    <StatePage>
      <StateTitle title={statesText.calendarState.title[context.language]} />
      <div className="flex flex-col items-center">
        <Calendar
          onChange={(value) => {
            setDate(value);
            setDateClicked(true);
          }}
          value={date}
          tileDisabled={disabledDates}
          view="month"
        />
        {/* TODO(adolfo): for paid customers, fetch availability from backend/config. */}
        {dateClicked ? (
          <div className="mt-8 flex flex-col items-center max-w-xs">
            <h2 className="text-xl">
              {statesText.calendarState.chooseTime[context.language]}
            </h2>
            {/* TODO(adolfo): use CSS grid if more than 3 hours available per day */}
            <div className="flex flex-col md:flex-row md:items-center mt-4 space-y-3 md:space-y-0 space-x-0 md:space-x-8">
              {AVAILABLE_TIMES.map((time) => {
                return (
                  <Tag
                    key={time}
                    text={time}
                    onClick={(time) => {
                      sendEvent(time);
                    }}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </StatePage>
  );
};

export default CalendarState;
