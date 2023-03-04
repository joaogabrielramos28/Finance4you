import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RecurrentTransactionsCreate } from "./screens/Create";
import { RecurrentTransactionsList } from "./screens/List";

const { Navigator, Screen } = createStackNavigator();

export const RecurrentTransactionsNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="RecurrentTransactionsList"
        component={RecurrentTransactionsList}
        options={{ headerShown: false }}
      />
      <Screen
        name="RecurrentTransactionsCreate"
        component={RecurrentTransactionsCreate}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
