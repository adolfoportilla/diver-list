export const formatReservationTime = (time) => {
  if (!time) {
    return null;
  }
  return time.split(":").slice(0, 2).join(":");
};
