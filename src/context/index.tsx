import React, { useState } from "react";

import { authenticate, logout, signInGoogle } from "../services/userService";
import { LoginType, UserProps } from "../types";
import { useStorageState } from "./hooks/storageState";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import { User } from "firebase/auth";

const AuthContext = React.createContext<{
  signIn: (
    type: LoginType,
    email?: string,
    password?: string
  ) => Promise<boolean>;
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

  const signIn = async (
    type: LoginType,
    email?: string,
    password?: string
  ): Promise<boolean> => {
    if (type === LoginType.USER_AND_PASSWORD) {
      const { user: loggedUser, token } = await authenticate(email!, password!);
      if (loggedUser) {
        setUser(JSON.stringify(loggedUser));
        setSession(token);
        return true;
      }
      return false;
    }
    if (type === LoginType.GOOGLE) {
      const userInfo = await signInGoogle();
      const { user: loggedUser, idToken } = userInfo!;
      const user = {
        id: loggedUser.id,
        email: loggedUser.email,
        name: loggedUser.name,
        avatarUrl: loggedUser.photo,
      };
      setUser(JSON.stringify(user));
      setSession(idToken);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await logout();
    await GoogleSignin.signOut();
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
