import { NativeBaseProvider } from "native-base";
import React, { ReactNode } from "react";
import { theme } from "../styles/theme/defaultTheme";
import { AuthProvider } from "./Auth/AuthContext";
import { TransactionsProvider } from "./Transactions/TransactionsContext";
import { HoldMenuProvider } from "react-native-hold-menu";
import { Feather } from "@expo/vector-icons";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
      <HoldMenuProvider theme="dark" iconComponent={Feather}>
        <AuthProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </AuthProvider>
      </HoldMenuProvider>
    </NativeBaseProvider>
  );
};
