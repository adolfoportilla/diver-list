import React from "react";
import Dashboard from "../components/admin_real/shared/Dashboard";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

// Example: https://github.com/vercel/nextjs-subscription-payments
// Current Issue: https://github.com/supabase/auth-helpers/issues/281

export default function Admin({ user, customProps }) {
  // return <Dashboard />;

  return (
    <div className="flex flex-col justify-center align-center">
      <span>Hello world</span>
    </div>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(ctx, supabase) {
    console.log("here");
    return { props: { email: "testing" } };
  },
});
