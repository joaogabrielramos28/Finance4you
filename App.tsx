import { NativeBaseProvider } from "native-base";
import React from "react";
import { CreateTransaction } from "./src/screens/CreateTransaction";
import { Home } from "./src/screens/Home";
import { Transactions } from "./src/screens/Transactions";
import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <CreateTransaction />
    </NativeBaseProvider>
  );
}
