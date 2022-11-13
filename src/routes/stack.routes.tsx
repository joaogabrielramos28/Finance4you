import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateTransaction, Transactions } from "../screens";
import { CreateTransactionProvider } from "../screens/CreateTransaction/context/CreateTransactionContext";

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Transactions" component={Transactions} />

      <Screen name="CreateTransaction" component={CreateTransaction} />
    </Navigator>
  );
};
