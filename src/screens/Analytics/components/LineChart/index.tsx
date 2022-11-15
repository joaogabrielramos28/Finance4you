import { format, subMonths } from "date-fns";
import { Box, Text, useTheme } from "native-base";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { LineChart as LineChartNativeKit } from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";
export const LineChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const [clickedData, setClickedData] = useState(null);
  const { transactions } = useTransactions();

  const chartConfig: ChartConfig = {
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const totalSpend = transactions.filter(
    (transaction) => transaction.type === "outcome"
  );

  const sub1Month = subMonths(new Date(), 1);
  const sub2Month = subMonths(new Date(), 2);
  const actualMonth = new Date();

  const actualMonthTransactions = totalSpend.reduce((acc, transaction) => {
    if (
      actualMonth.getMonth() === new Date(transaction.date).getMonth() &&
      actualMonth.getFullYear() === new Date(transaction.date).getFullYear()
    ) {
      return (acc = acc + transaction.amount);
    }
    return 0;
  }, 0);

  const sub1MonthTransactions = totalSpend.reduce((acc, transaction) => {
    if (
      sub1Month.getMonth() === new Date(transaction.date).getMonth() &&
      sub1Month.getFullYear() === new Date(transaction.date).getFullYear()
    ) {
      return (acc = acc + transaction.amount);
    }
    return 0;
  }, 0);

  const sub2MonthTransactions = totalSpend.reduce((acc, transaction) => {
    if (
      sub2Month.getMonth() === new Date(transaction.date).getMonth() &&
      sub2Month.getFullYear() === new Date(transaction.date).getFullYear()
    ) {
      return (acc = acc + transaction.amount);
    }
    return 0;
  }, 0);

  const lineData = {
    labels: [
      format(sub2Month, "MM/yyyy"),
      format(sub1Month, "MM/yyyy"),
      format(actualMonth, "MM/yyyy"),
    ],
    datasets: [
      {
        data: [
          sub2MonthTransactions,
          sub1MonthTransactions,
          actualMonthTransactions,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <>
      <Text textAlign={"center"} mb={4} color={"grayBrand.300"}>
        Total Gasto:{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(clickedData)}
      </Text>

      <LineChartNativeKit
        data={lineData}
        width={screenWidth}
        height={300}
        yAxisLabel="R$"
        chartConfig={chartConfig}
        yLabelsOffset={0}
        bezier
        segments={4}
        transparent
        onDataPointClick={(value) => setClickedData(value.value)}
      />
    </>
  );
};
