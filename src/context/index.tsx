import React, { useState } from "react";

import { authenticate, logout } from "../services/database/userRespository";
import { UserProps } from "../types";
import { useStorageState } from "./hooks/storageState";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  user: UserProps | null | undefined;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(false),
  signOut: () => Promise.resolve(),
  user: null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<UserProps>();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const { user: loggedUser, token } = await authenticate(email, password);
    if (loggedUser) {
      setUser(loggedUser);
      setSession(token);
      return true;
    }
    return false;
  };
  const signOut = async () => {
    await logout();
    setSession(null);
  };
  return (
    <AuthContext.Provider value={{ signIn, signOut, user, session, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
