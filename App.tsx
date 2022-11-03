import { NativeBaseProvider } from "native-base";
import React from "react";
import { Home } from "./src/screens/Home";
import { Transactions } from "./src/screens/Transactions";
import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Transactions />
    </NativeBaseProvider>
  );
}
