import Dashboard from "../components/admin_real/shared/Dashboard";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });

// Example: https://github.com/vercel/nextjs-subscription-payments
// Current Issue: https://github.com/supabase/auth-helpers/issues/281

export default function Admin() {
  return <Dashboard />;
}
