import React, { ReactNode, useContext, useEffect, useState } from "react";
import { appleAuth } from "@invertase/react-native-apple-authentication";

import { IAuthContext, IUser } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = React.createContext({} as IAuthContext);

const USER_STORAGE_KEY = "@finance4you:user";
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  async function loginWithApple() {
    try {
      setLoading(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const name = appleAuthRequestResponse.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userLogged = {
          id: String(appleAuthRequestResponse.user),
          email: appleAuthRequestResponse.email!,
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
  }

  // const loginWithApple = async () => {
  //   try {
  //     setLoading(true);
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });

  //     if (credential) {
  //       const name = credential.fullName!.givenName!;
  //       const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
  //       const userLogged = {
  //         id: String(credential.user),
  //         email: credential.email!,
  //         name,
  //         photo,
  //       };
  //       setUser(userLogged);
  //       await AsyncStorage.setItem(
  //         USER_STORAGE_KEY,
  //         JSON.stringify(userLogged)
  //       );
  //       setLoading(false);
  //     }
  //   } catch (error: any) {
  //     setLoading(false);
  //     throw new Error(error);
  //   }
  // };

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
