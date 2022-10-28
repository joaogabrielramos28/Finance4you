import { NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "./src/styles/theme/defaultTheme";

export default function App() {
  return <NativeBaseProvider theme={theme}></NativeBaseProvider>;
}
