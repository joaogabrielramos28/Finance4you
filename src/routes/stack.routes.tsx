import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "@screens/index";
import { ScheduleCreate } from "@screens/Home/screens/ScheduleCreate";
import { ScheduleEdit } from "@screens/Home/screens/ScheduleEdit";

const { Navigator, Screen } = createStackNavigator();

export const HomeStackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="ScheduleCreate" component={ScheduleCreate} />
      <Screen name="ScheduleEdit" component={ScheduleEdit} />
    </Navigator>
  );
};
