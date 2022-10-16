import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header(props) {
  const supabaseClient = useSupabaseClient();

  const router = useRouter();
  return (
    <div className="h-full justify-between	flex flex-row bg-white border border-slate-300">
      <div className="ml-3 py-2">
        <span className="text-xl font-normal text-sky-700">DiverList</span>
      </div>
      <div className="flex flex-row align-items-center space-x-1 mr-2">
        {props.rightChildren ? props.rightChildren : null}
        <IconButton
          aria-label="logout"
          className="text-gray-600"
          onClick={async () => {
            const { error, data } = await supabaseClient.auth.signOut();
            console.log("error", error);
            console.log("data", data);
            router.push("/signin");
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
}
