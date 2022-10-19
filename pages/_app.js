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
import { MySizeContextProvider } from "../utils/useSize";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {/* <MySizeContextProvider> */}
      <MyUserContextProvider>
        <Component {...pageProps} />
      </MyUserContextProvider>
      {/* </MySizeContextProvider> */}
    </SessionContextProvider>
  );
}

export default MyApp;
