import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

// TODO:
// Instead of having a button to click signing with google, instead:
// 1. Ask the user for an email
// 2. Verify that the email exists.
// -- 2.a If email exists, show sign-in with Google
// -- 2.b If email does not exists, warn user, and show signup.
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });
  const router = useRouter();
  const user = useUser();
  const { supabaseClient } = useSessionContext();

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "localhost:3000/admin" },
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  // Redirect user if already logged in.
  if (user) {
    router.replace("/admin");
  }

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            <span>DiverList</span>
          </div>
          <div className="flex flex-col space-y-4">
            {message.content && (
              <div
                className={`${
                  message.type === "error" ? "text-pink-500" : "text-green-500"
                } border ${
                  message.type === "error"
                    ? "border-pink-500"
                    : "border-green-500"
                } p-3`}
              >
                {message.content}
              </div>
            )}
            <Button
              variant="outlined"
              onClick={() => handleOAuthSignIn("google")}
            >
              Sign In with Google
            </Button>

            <span className="pt-1 text-center text-sm">
              <span className="text-zinc-200">Don't have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                  Sign up.
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    );

  return <div className="m-6">{loading && <CircularProgress />}</div>;
};

export default SignIn;
