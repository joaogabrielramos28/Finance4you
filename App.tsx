import { NativeBaseProvider } from "native-base";
import React from "react";
import { SignIn } from "./src/screens/SignIn";
import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SignIn />
    </NativeBaseProvider>
  );
}
