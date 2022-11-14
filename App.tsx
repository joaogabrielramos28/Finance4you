import { NativeBaseProvider } from "native-base";
import React from "react";
import { TransactionsProvider } from "./src//context/Transactions/TransactionsContext";
import { Routes } from "./src/routes/index.routes";

import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <TransactionsProvider>
        <Routes />
      </TransactionsProvider>
    </NativeBaseProvider>
  );
}
