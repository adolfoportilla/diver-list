import React from "react";
import Dashboard from "../components/admin_real/shared/Dashboard";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

// Example: https://github.com/vercel/nextjs-subscription-payments
// Current Issue: https://github.com/supabase/auth-helpers/issues/281

export default function Admin() {
  return <div>Hello world</div>;
  // return <Dashboard />;
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
});
