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
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const isReservationPage = router.pathname.includes("reservation");

  return isReservationPage ? (
    <Component {...pageProps} />
  ) : (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MySizeContextProvider>
        <MyUserContextProvider>
          <Component {...pageProps} />
        </MyUserContextProvider>
      </MySizeContextProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
