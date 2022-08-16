import { createClient } from "@supabase/supabase-js";

let client = {};

if (process.env.NODE_ENV === "production") {
  const supabaseUrl = "https://jssciplbktcfzvelizfx.supabase.co";
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

  client = createClient(supabaseUrl, supabaseKey);
}

export default client;
