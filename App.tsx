import { NativeBaseProvider } from "native-base";
import React from "react";
import { Routes } from "./src/routes/index.routes";
import { CreateTransactionProvider } from "./src/screens/CreateTransaction/context/CreateTransactionContext";

import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <CreateTransactionProvider>
        <Routes />
      </CreateTransactionProvider>
    </NativeBaseProvider>
  );
}
