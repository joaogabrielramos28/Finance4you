import { NativeBaseProvider } from "native-base";
import React from "react";
import { CreateTransactionProvider } from "./src/context/CreateTransactionContext";
import { Routes } from "./src/routes/index.routes";

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
