import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import React from "react";
import { Home, Transactions } from "../screens";

import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StackRoutes } from "./stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabsRoutes = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: `${colors.violetBrand[400]}`,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          borderTopColor: "transparent",

          backgroundColor: colors.background,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Transações"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="trending-up" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Analytics"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  );
};
