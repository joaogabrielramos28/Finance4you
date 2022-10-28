import { NativeBaseProvider } from "native-base";
import React from "react";
import { Home } from "./src/screens/Home";
import { SignIn } from "./src/screens/SignIn";
import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Home />
    </NativeBaseProvider>
  );
}
