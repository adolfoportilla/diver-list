import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import Logo from "../components/Logo";
import { updateUserName } from "../utils/supabase";

// OAuth: https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth
// Example: https://github.com/vercel/nextjs-subscription-payments

const SignUp = () => {
  const { supabaseClient } = useSessionContext();
  const [newUser, setNewUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });
  const router = useRouter();
  const user = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});
    const {
      error,
      data: { user: createdUser },
    } = await supabaseClient.auth.signUp({
      email,
      // password,
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    } else {
      if (createdUser) {
        await updateUserName(createdUser, name);
        setNewUser(createdUser);
      } else {
        setMessage({
          type: "note",
          content: "Check your email for the confirmation link.",
        });
      }
    }
    setLoading(false);
  };
  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "/admin" },
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (newUser || user) {
      router.replace("/admin");
    }
  }, [newUser, user]);
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>

        <Button
          variant="slim"
          type="submit"
          disabled={loading}
          onClick={() => handleOAuthSignIn("google")}
        >
          <span>Google</span>
          <span className="ml-2">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
