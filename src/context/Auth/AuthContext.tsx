import React, { ReactNode, useContext, useEffect, useState } from "react";
import { appleAuth } from "@invertase/react-native-apple-authentication";

import auth from "@react-native-firebase/auth";
import { IAuthContext, IUser, SharedUserList } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../helpers/types";
import {
  getItemFromAsyncStorage,
  setItemWhenDataIsBoolean,
} from "../../helpers/AsyncStorage";

const AuthContext = React.createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAccountShared, setHasAccountShared] = useState(false);
  const [sharedUserNameList, setSharedUserNameList] = useState<
    SharedUserList[]
  >([]);

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

        auth().signInWithCredential(
          auth.AppleAuthProvider.credential(
            appleAuthRequestResponse.identityToken,
            appleAuthRequestResponse.nonce
          )
        );

        setUser(userLogged);

        await AsyncStorage.setItem(
          AsyncStorageKeys.USER_STORAGE_KEY,
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

    await AsyncStorage.removeItem(AsyncStorageKeys.USER_STORAGE_KEY);
  }

  const changeUserSharedList = async (userList: SharedUserList[]) => {
    setSharedUserNameList(userList);
  };

  const changeHasAccountShared = async (hasAccountShared: boolean) => {
    setHasAccountShared(hasAccountShared);
    setItemWhenDataIsBoolean(AsyncStorageKeys.ACCOUNT_SHARED, hasAccountShared);
  };

  useEffect(() => {
    async function loadUserStorageData() {
      const response = await AsyncStorage.getItem(
        AsyncStorageKeys.USER_STORAGE_KEY
      );
      const data = response ? JSON.parse(response) : {};

      setUser(data);
    }
    loadUserStorageData();
  }, []);

  useEffect(() => {
    const loadAccountShared = async () => {
      const response = await getItemFromAsyncStorage(
        AsyncStorageKeys.ACCOUNT_SHARED
      );

      setHasAccountShared(response);
    };
    loadAccountShared();
  }, []);

  useEffect(() => {
    const loadSharedUserNameList = async () => {
      const response = await getItemFromAsyncStorage(
        AsyncStorageKeys.SHARED_USER_LIST
      );

      setSharedUserNameList(response);
    };

    loadSharedUserNameList();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginWithApple,
        user,
        loading,
        signOut,
        changeUserSharedList,
        hasAccountShared,
        sharedUserNameList,
        changeHasAccountShared,
      }}
    >
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
