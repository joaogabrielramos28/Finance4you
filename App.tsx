import { StatusBar } from "native-base";
import React, { useEffect, useState } from "react";
import { AppProvider } from "./src/context";
import { Routes } from "./src/routes/index.routes";
import SplashScreen from "react-native-splash-screen";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { addMinutes } from "date-fns";

export default function App() {
  const [permissions, setPermissions] = useState<0 | 2 | 1 | 3 | undefined>(
    undefined
  );

  useEffect(() => {
    PushNotificationIOS.checkPermissions((permission) => {
      setPermissions(permission.authorizationStatus);
    });

    if (permissions !== 2) {
      PushNotificationIOS.requestPermissions()
        .then((permissions) => {
          console.log("permissão concedida");
        })
        .catch((error) => {
          console.log(error);
        });
    }

  
  }, []);

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
