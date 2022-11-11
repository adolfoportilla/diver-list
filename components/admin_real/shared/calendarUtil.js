import moment from "moment";

export const isSameDay = (dateA, dateB) => {
  return (
    dateA.date() === dateB.date() &&
    dateA.month() === dateB.month() &&
    dateA.year() === dateB.year()
  );
};

export const currentDateIsOlderThanToday = (currentDate) => {
  const yesterday = moment().subtract(1, "day");
  return currentDate.isSameOrBefore(yesterday);
};
