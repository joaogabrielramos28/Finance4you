import { NativeBaseProvider } from "native-base";
import React, { ReactNode } from "react";
import { theme } from "../styles/theme/defaultTheme";
import { AuthProvider } from "./Auth/AuthContext";
import { TransactionsProvider } from "./Transactions/TransactionsContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <TransactionsProvider>{children}</TransactionsProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
};
