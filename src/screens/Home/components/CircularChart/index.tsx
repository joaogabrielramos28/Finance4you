import { Box, Heading, Text, useTheme, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTransactions } from "../../../../context/TransactionsContext";

interface ITotal {
  income: {
    amount: number;
    formatted: string;
  };
  outcome: {
    amount: number;
    formatted: string;
  };
  percentage: number;
}

export const CircularChart = () => {
  const { colors } = useTheme();
  const { transactionsByPeriod } = useTransactions();

  const [total, setTotal] = useState<ITotal>({} as ITotal);

  const spends =
    transactionsByPeriod.filter((item) => item.type === "outcome") || [];
  const received =
    transactionsByPeriod.filter((item) => item.type === "income") || [];

  useEffect(() => {
    const income = received.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const outcome = spends.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const percentage = income > 0 ? (outcome / income) * 100 : 0;

    setTotal({
      income: {
        amount: income,
        formatted: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(income),
      },
      outcome: {
        amount: outcome,
        formatted: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(outcome),
      },
      percentage,
    });
  }, [transactionsByPeriod]);

  return (
    <Box position={"relative"}>
      <AnimatedCircularProgress
        size={220}
        width={15}
        backgroundWidth={5}
        fill={total.percentage || 0}
        tintColor={colors.violetBrand[400]}
        tintColorSecondary={colors.violetBrand[700]}
        backgroundColor="#3d5875"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
        children={() => (
          <VStack alignItems={"center"} marginBottom={6}>
            <Heading color={"grayBrand.300"}>
              {total?.outcome?.formatted}
            </Heading>
            <Text color={"grayBrand.400"}>
              gastos de {total?.income?.formatted}
            </Text>
          </VStack>
        )}
      />
    </Box>
  );
};
