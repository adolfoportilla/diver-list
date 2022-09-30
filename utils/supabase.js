import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PAGE_SIZE = 20;

export async function fetchCalendar() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: true })
    .limit(PAGE_SIZE);

  return { data, error };
}

export default supabase;
