import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  CreateTransaction,
  FilterTransactions,
  TransactionDetails,
} from "@screens/index";
import { ExportTransactions } from "@screens/Transactions/screens/ExportTransactions";
import { TabsRoutes } from "./tabs.routes";
import { EditTransactions } from "@screens/EditTransactions";

const { Navigator, Screen } = createStackNavigator();

export const TransactionStackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Transactions" component={TabsRoutes} />
      <Screen name="CreateTransaction" component={CreateTransaction} />
      <Screen name="FilterTransactions" component={FilterTransactions} />
      <Screen name="TransactionDetails" component={TransactionDetails} />
      <Screen name="EditTransaction" component={EditTransactions} />
      <Screen name="ExportTransactions" component={ExportTransactions} />
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
      <Screen name="HomeStack" component={TabsRoutes} />
      <Screen name="TransactionDetails" component={TransactionDetails} />
      <Screen name="EditTransaction" component={EditTransactions} />
    </Navigator>
  );
};
