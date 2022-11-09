import { supabase } from "../supabase";

export async function fetchCalendar(props) {
  // TODO:
  // We need to fetch only the reservations from that store.
  const result = supabase
    .from("reservations")
    .select("*")
    .eq("dive_shop_id", props.diveShopId)
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  // TODO:
  // We need to paginate, because if not the request is going to get pretty expensive.
  // .limit(PAGE_SIZE);
  // TODO: limit reservations based on date.
  // if (dateFilter) {
  // baseQueryset.gte("date", dateFilter);
  // }
  return await result;
}

export async function fetchReservations(props) {
  return await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .eq("dive_shop_id", props.diveShopId)
    .order("date", { ascending: false })
    .range(props.rangeInitial, props.rangeEnd);
}

export async function deleteReservation(reservationId) {
  return await supabase
    .from("reservations")
    .delete()
    .match({ id: reservationId })
    .select();
}

export async function updateReservation(props) {
  return await supabase
    .from("reservations")
    .update(props.values)
    .eq("id", props.reservationId)
    .eq("dive_shop_id", props.dive_shop_id)
    .select();
}
export async function createReservation({ values, diveShopId }) {
  return await supabase
    .from("reservations")
    .insert({ ...values, dive_shop_id: diveShopId })
    .select();
}
