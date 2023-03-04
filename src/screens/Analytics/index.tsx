import React from "react";
import { Box, Heading, VStack, ScrollView } from "native-base";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useTransactions } from "@context/Transactions/TransactionsContext";
import { PieChart } from "./components/PieChart";
import { LineChart } from "./components/LineChart";
import { Layout } from "@components/Layout";

export const Analytics = () => {
  const { actualPeriod } = useTransactions();

  return (
    <Layout hasScrollView>
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
    </Layout>
  );
};
