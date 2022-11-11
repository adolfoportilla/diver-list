import Dashboard from "../components/admin_real/shared/Dashboard";
import ReservationsContextProvider from "../components/shared/ReservationsContextProvider";

// Example: https://github.com/vercel/nextjs-subscription-payments
// Current Issue: https://github.com/supabase/auth-helpers/issues/281

export default function Admin() {
  return (
    <ReservationsContextProvider>
      <Dashboard />
    </ReservationsContextProvider>
  );
}
