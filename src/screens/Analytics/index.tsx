import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Box, Heading, useTheme, VStack, ScrollView } from "native-base";
import { useTransactions } from "../../context/Transactions/TransactionsContext";
import { PieChart } from "./components/PieChart";
import { LineChart } from "./components/LineChart";

export const Analytics = () => {
  const { actualPeriod } = useTransactions();

  return (
    <ScrollView flex={1} bg={"background"}>
      <Box safeAreaY>
        <Heading textAlign={"center"} color={"grayBrand.200"}>
          {format(actualPeriod, "MMMM/yyyy", { locale: ptBR })}
        </Heading>
        <VStack space={8}>
          <PieChart />
          <Heading textAlign={"center"} color={"grayBrand.200"}>
            Gráfico trimestral
          </Heading>
          <LineChart />
        </VStack>
      </Box>
    </ScrollView>
  );
};
