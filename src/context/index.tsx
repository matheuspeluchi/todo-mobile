import React, { useEffect } from "react";

import { auth, firestore } from "@/config/firebaseConfig";
import {
  GoogleSignin,
  User,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { signOut as logout, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { updateUser } from "../services/userService";
import { AuthProps, LoginType, UserProps } from "../types";
import { useStorageState } from "./hooks/storageState";

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

export const useSession = () => {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
};

const SessionProvider = (props: React.PropsWithChildren) => {
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
      const { user: loggedUser, idToken } = await signInGoogle();
      const user: UserProps = {
        id: loggedUser.id,
        email: loggedUser.email,
        name: loggedUser.name!,
        avatarUrl: loggedUser.photo!,
      };
      await updateUser(user);
      setUser(JSON.stringify(user));
      setSession(idToken);

      return true;
    }
    return false;
  };

  const signOut = async () => {
    await logout(auth);
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    setSession(null);
  };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo: User = await GoogleSignin.signIn();
      return userInfo;
    } catch (error: any) {
      console.log("Error", error.code);
      throw error.message;
    }
  };

  async function authenticate(
    email: string,
    password: string
  ): Promise<AuthProps> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const ref = doc(firestore, "users", user.uid);
      const savedUser = await getDoc(ref);
      const userData = savedUser.data()!;
      const token = await user.getIdToken();
      return {
        user: {
          id: savedUser.id,
          email: userData.email,
          name: userData.name,
          avatarUrl: userData.avatarUrl,
        },
        token,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      scopes: ["profile", "email"],
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, session, isLoading, isUserLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default SessionProvider;
