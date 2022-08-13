import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jssciplbktcfzvelizfx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export default createClient(supabaseUrl, supabaseKey);
