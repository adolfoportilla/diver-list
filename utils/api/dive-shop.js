import { supabase } from "../supabase";

export async function fetchDiveShop({
  urlHash = null,
  select = "*",
  email = null,
}) {
  let queryset = supabase.from("dive-shop").select(select).single();

  if (urlHash) {
    queryset = queryset.eq("url_hash", urlHash);
  }
  if (email) {
    queryset = queryset.eq("email", email);
  }

  return await queryset;
}

export async function createDiveShop({ values }) {
  return await supabase.from("dive-shop").insert(values);
}
