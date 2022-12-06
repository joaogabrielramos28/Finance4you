import { StatusBar } from "native-base";
import React, { useEffect } from "react";
import { AppProvider } from "./src/context";
import { Routes } from "./src/routes/index.routes";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" animated showHideTransition="fade" />
      <Routes />
    </AppProvider>
  );
}
