import { supabase } from "../supabase";

export async function updateUserName(user, name) {
  await supabase
    .from("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
}
