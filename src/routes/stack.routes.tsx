import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  CreateTransaction,
  FilterTransactions,
  Transactions,
} from "../screens";

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
      <Screen name="FilterTransactions" component={FilterTransactions} />
    </Navigator>
  );
};
