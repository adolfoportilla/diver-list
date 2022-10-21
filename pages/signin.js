import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useUser,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import { getURL } from "../utils/helpers";

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
  // const { supabaseClient } = useSessionContext();
  const supabaseClient = useSupabaseClient();

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL("/admin") },
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };
  // Redirect user if already logged in.
  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [user]);

  if (!user)
    return (
      <div className="h-full">
        <div className="flex flex-col items-center">
          <div className="mt-24">
            <h1 className="text-3xl sm:text-4xl">Welcome to DiverList!</h1>
          </div>
          <div className="flex flex-col items-center mt-4 sm:mt-8 space-y-4">
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
              className=""
              variant="outlined"
              onClick={() => handleOAuthSignIn("google")}
            >
              Sign In with Google
            </Button>

            <span className="pt-1 flex text-center text-sm">
              <span className="text-zinc-500 font-light">{`Don't have an account?`}</span>
              <div className="ml-2">
                <Link href="/signup" className="ml-4">
                  <span className="text-accent-9 font-bold hover:underline cursor-pointer">
                    Sign up.
                  </span>
                </Link>
              </div>
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-6 h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <CircularProgress color="primary" />
        <span className="italic mt-2 font-light color">
          Hang tight, signin in
        </span>
      </div>
    </div>
  );
};

export default SignIn;
