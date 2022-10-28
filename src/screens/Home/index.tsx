import { Box, Circle } from "native-base";
import React from "react";

import { CircularChart } from "./components/CircularChart";
import { LastTransactions } from "./components/LastTransactions";
import { LineChart } from "./components/LineChart";

export const Home = () => {
  return (
    <Box flex={1} bg={"background"} safeAreaTop alignItems={"center"}>
      <CircularChart />
      <LineChart />
      <LastTransactions />
    </Box>
  );
};
