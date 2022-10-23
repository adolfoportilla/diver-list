import { useEffect, useState, createContext, useContext } from "react";
import {
  useUser as useSupaUser,
  useSessionContext,
} from "@supabase/auth-helpers-react";

export const UserContext = createContext(undefined);

export const MyUserContextProvider = (props) => {
  // const {
  //   session,
  //   error,
  //   isLoading: isLoadingUser,
  //   supabaseClient: supabase,
  // } = useSessionContext();
  const user = "";
  const accessToken = null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [diveShop, setDiveShop] = useState(null);

  const getDiveShop = (email) =>
    supabase.from("dive-shop").select("*").eq("email", email).single();

  useEffect(() => {
    // if (user && !isLoadingData && !diveShop) {
    //   setIsLoadingData(true);
    //   // getDiveShop(user.email)
    //   //   .then((results) => {
    //   //     console.log(results, "here");
    //   //     if (results.data) {
    //   //       setDiveShop(results.data);
    //   //     }
    //   //     setIsLoadingData(false);
    //   //   })
    //   //   .catch((error) => {
    //   //     // TODO(adolfo): figure out what to do when this thing errors out, probably log out?
    //   //     console.log("error", error);
    //   //   });
    // } else if (!user && !isLoadingUser && !isLoadingData) {
    //   setDiveShop(null);
    // }
  }, [user]);

  const value = {
    accessToken,
    user,
    diveShop,
    isLoading: false || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
