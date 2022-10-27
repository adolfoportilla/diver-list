export const isSameDay = (dateA, dateB) => {
  return (
    dateA.date() === dateB.date() &&
    dateA.month() === dateB.month() &&
    dateA.year() === dateB.year()
  );
};
