import { addMonths, subMonths } from "date-fns";
import { Box, Circle, Heading, Text, VStack } from "native-base";
import React, { useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";

import { CircularChart } from "./components/CircularChart";
import { LastTransactions } from "./components/LastTransactions";
import { MonthSelect } from "./components/MonthSelect";

export const Home = () => {
  return (
    <VStack
      flex={1}
      bg={"background"}
      safeAreaTop
      alignItems={"center"}
      space={4}
    >
      <Heading color={"grayBrand.200"}>Resumo de gastos</Heading>
      <MonthSelect />
      <CircularChart />

      <LastTransactions />
    </VStack>
  );
};
