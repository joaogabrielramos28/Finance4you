import React, { ReactNode, useContext, useEffect, useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-auth-session/providers/google";

import { IAuthContext, IUser } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = React.createContext({} as IAuthContext);

const USER_STORAGE_KEY = "@finance4you:user";
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const loginWithApple = async () => {
    try {
      setLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(userLogged)
        );
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };

  async function signOut() {
    setUser({} as IUser);

    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const response = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const data = response ? JSON.parse(response) : {};

      setUser(data);
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ loginWithApple, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
