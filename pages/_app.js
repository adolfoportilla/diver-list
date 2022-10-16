import "../styles/globals.css";
import "../styles/calendar.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { MyUserContextProvider } from "../utils/useUser";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MyUserContextProvider>
        <Component {...pageProps} />
      </MyUserContextProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
