import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Options } from ".";
import { AccountConfig } from "./screens/AccountConfig";
import { ScheduleCreate } from "./screens/ScheduleCreate";
import { ScheduleList } from "./screens/ScheduleList";

const navigator = createStackNavigator();

export const OptionsNavigator = () => {
  return (
    <navigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <navigator.Screen name="Options" component={Options} />
      <navigator.Screen name="AccountConfig" component={AccountConfig} />
      <navigator.Screen name="ScheduleCreate" component={ScheduleCreate} />
      <navigator.Screen name="ScheduleList" component={ScheduleList} />
    </navigator.Navigator>
  );
};
