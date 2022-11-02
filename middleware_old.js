import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";

export const middleware = withMiddlewareAuth({ redirectTo: "/signin" });

export const config = {
  matcher: ["/admin/:path*"],
};
