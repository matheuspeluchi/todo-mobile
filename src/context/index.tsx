import React, { useState } from "react";

import { authenticate, logout } from "../services/userService";
import { UserProps } from "../types";
import { useStorageState } from "./hooks/storageState";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  user: string | null;
  session?: string | null;
  isLoading: boolean;
  isUserLoading: boolean;
}>({
  signIn: () => Promise.resolve(false),
  signOut: () => Promise.resolve(),
  user: null,
  session: null,
  isLoading: false,
  isUserLoading: false,
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
  const [[isUserLoading, user], setUser] = useStorageState("user");

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const { user: loggedUser, token } = await authenticate(email, password);
    if (loggedUser) {
      setUser(JSON.stringify(loggedUser));
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
    <AuthContext.Provider
      value={{ signIn, signOut, user, session, isLoading, isUserLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
