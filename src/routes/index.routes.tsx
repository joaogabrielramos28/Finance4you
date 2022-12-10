import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { SignIn } from "../screens";
import { TransactionStackRoutes } from "./stack.routes";

export const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user?.id ? <TransactionStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
