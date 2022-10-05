import supabase from "../../../utils/supabase";

export const isSameDay = (dateA, dateB) => {
  return (
    dateA.date() === dateB.date() &&
    dateA.month() === dateB.month() &&
    dateA.year() === dateB.year()
  );
};

export const formatData = (date) => {
  return {
    type: "processing",
    content: date.id,
    time: date.time,
  };
};

export async function fetchCalendar(dateFilter = null) {
  // TODO:
  // We need to fetch only the reservations from that store.
  const baseQueryset = supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  // TODO:
  // We need to paginate, because if not the request is going to get pretty expensive.
  // .limit(PAGE_SIZE);

  // TODO: limit reservations based on date.
  // if (dateFilter) {
  // baseQueryset.gte("date", dateFilter);
  // }
  const { data, error } = await baseQueryset;

  return { data, error };
}
