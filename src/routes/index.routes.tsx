import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@context/Auth/AuthContext";
import { SignIn } from "@screens/index";
import { HomeStackRoutes } from "./stack.routes";

export const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user?.id ? <HomeStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
