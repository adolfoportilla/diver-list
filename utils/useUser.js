import { useEffect, useState, createContext, useContext } from "react";
import {
  useUser as useSupaUser,
  useSessionContext,
} from "@supabase/auth-helpers-react";

export const UserContext = createContext(undefined);

export const MyUserContextProvider = (props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [diveShop, setDiveShop] = useState(null);

  useEffect(() => {
    const getDiveShop = async (email) => {
      const data = await supabase
        .from("dive-shop")
        .select("*")
        .eq("email", email)
        .single();
      setDiveShop(data);
      setIsLoadingData(false);
    };
    if (user && !isLoadingData && !diveShop) {
      setIsLoadingData(true);
      getDiveShop(user.email);
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setDiveShop(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    diveShop,
    isLoading: isLoadingUser || isLoadingData,
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
