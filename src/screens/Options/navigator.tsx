import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Options } from ".";
import { ScheduleCreate } from "./screens/ScheduleCreate";

const navigator = createStackNavigator();

export const OptionsNavigator = () => {
  return (
    <navigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <navigator.Screen name="Options" component={Options} />
      <navigator.Screen name="ScheduleCreate" component={ScheduleCreate} />
    </navigator.Navigator>
  );
};
