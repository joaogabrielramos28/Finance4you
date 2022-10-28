import { Box, useTheme } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart as LinearChartComponent } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

import { getMonthsName } from "../../../../utils/formatMonth";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

export const LineChart = () => {
  const getLastThreeMonths = () => {
    const actualMonth = new Date().getMonth() + 1;
    const prevMonth = new Date().getMonth();
    const lastMonthOfQuarter = new Date().getMonth() - 1;

    return getMonthsName([lastMonthOfQuarter, prevMonth, actualMonth]);
  };

  const { colors } = useTheme();
  const chartConfig: AbstractChartConfig = {
    backgroundColor: colors.zinc[800],
    backgroundGradientFrom: colors.zinc[800],
    backgroundGradientTo: colors.zinc[800],
    color: (opacity = 1) => `rgba(209, 213, 219, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
  };
  const width = Dimensions.get("screen").width - 5;

  const CHART_DATA: LineChartData = {
    labels: getLastThreeMonths(),
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(139,92, 246, ${opacity})`, // optional
        strokeWidth: 2, // optional,
      },
    ],
  };

  return (
    <Box shadow={4}>
      <LinearChartComponent
        data={CHART_DATA}
        width={width}
        height={220}
        chartConfig={chartConfig}
        withHorizontalLines={false}
      />
    </Box>
  );
};
