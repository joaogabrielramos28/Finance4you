import React, { useState } from "react";
import { Dimensions } from "react-native";
import { format, subMonths } from "date-fns";
import { Text } from "native-base";
import { LineChart as LineChartNativeKit } from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

import { useTransactions } from "@context/Transactions/TransactionsContext";

export const LineChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const [clickedData, setClickedData] = useState(0);

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

  const totalSpendActualMonth = totalSpend
    .filter(
      (transaction) =>
        format(new Date(transaction.date), "MM-yyyy") ===
        format(actualMonth, "MM-yyyy")
    )
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amountWithoutMask) / 100;
    }, 0);
  const totalSpendPreviousMonth = totalSpend
    .filter(
      (transaction) =>
        format(new Date(transaction.date), "MM-yyyy") ===
        format(sub1Month, "MM-yyyy")
    )
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amountWithoutMask) / 100;
    }, 0);
  const totalSpendPrevious2Month = totalSpend
    .filter(
      (transaction) =>
        format(new Date(transaction.date), "MM-yyyy") ===
        format(sub2Month, "MM-yyyy")
    )
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amountWithoutMask) / 100;
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
          totalSpendPrevious2Month,
          totalSpendPreviousMonth,
          totalSpendActualMonth,
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
