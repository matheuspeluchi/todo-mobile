import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../services/database/respository";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    const { user, token } = await authenticate(email, password);
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      setSession("xxx");
      A;
    }
  };
  const signOut = async () => {
    setSession(null);
  };
  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
