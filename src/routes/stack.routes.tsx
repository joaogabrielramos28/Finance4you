import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  CreateTransaction,
  FilterTransactions,
  Home,
  TransactionDetails,
  Transactions,
} from "../screens";

const { Navigator, Screen } = createStackNavigator();

export const TransactionStackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Transactions" component={Transactions} />
      <Screen name="CreateTransaction" component={CreateTransaction} />
      <Screen name="FilterTransactions" component={FilterTransactions} />
      <Screen name="TransactionDetails" component={TransactionDetails} />
    </Navigator>
  );
};

export const HomeStackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeStack" component={Home} />
      <Screen name="TransactionDetails" component={TransactionDetails} />
    </Navigator>
  );
};
