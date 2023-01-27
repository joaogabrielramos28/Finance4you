import { ITransaction } from "@context/Transactions/types";
import { useTheme } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { PieChart as PieChartNativeKit } from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";
import { ITotalByCategory } from "./types";

export const PieChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const { transactionsByPeriod } = useTransactions();

  const chartConfig: ChartConfig = {
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const categoryColors = {
    Educação: colors.blue[500],
    Saúde: colors.greenBrand[500],
    Lazer: colors.yellow[500],
    Automóvel: colors.violetBrand[700],
    Moradia: colors.primary[500],
    Contas: colors.orange[500],
    Alimentação: colors.redBrand[500],
    Compras: colors.pink[500],
  };

  const spend = transactionsByPeriod.filter(
    (transaction) => transaction.type === "outcome"
  );

  const totalByCategory: ITotalByCategory[] = [];

  spend.map((transaction: ITransaction) => {
    if (
      totalByCategory.some(
        (item: ITotalByCategory) => item.name === transaction.category
      )
    ) {
      totalByCategory.map((item: any) => {
        if (item.category === transaction.category) {
          item.total += Number(transaction.amountWithoutMask) / 100;
        }
      });
    } else {
      totalByCategory.push({
        name: transaction.category,
        amount: Number(transaction.amountWithoutMask) / 100,
        color:
          categoryColors[transaction.category as keyof typeof categoryColors],
        legendFontColor:
          categoryColors[transaction.category as keyof typeof categoryColors],
        legendFontSize: 15,
      });
    }
  });
  return (
    <>
      <PieChartNativeKit
        data={totalByCategory}
        width={screenWidth}
        height={240}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />
    </>
  );
};
