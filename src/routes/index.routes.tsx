import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { SignIn } from "../screens";
import { TabsRoutes } from "./tabs.routes";

export const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user?.id ? <TabsRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
