import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const updateUserName = async (user, name) => {
  await supabase
    .from("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
};

export default supabase;
