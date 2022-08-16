import { createClient } from "@supabase/supabase-js";

let client = {};

if (
  process.env.NODE_ENV === "production" ||
  ["production", "preview"].includes(process.env.REACT_APP_VERCEL_ENV)
) {
  const supabaseUrl = "https://jssciplbktcfzvelizfx.supabase.co";
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

  client = createClient(supabaseUrl, supabaseKey);
}

export default client;
