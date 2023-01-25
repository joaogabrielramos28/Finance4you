import { Box, Heading, Text, useTheme, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Easing } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useAuth } from "../../../../context/Auth/AuthContext";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";

interface ITotal {
  outcome: {
    amount: number;
    formatted: string;
  };
}

export const SharedCircularChart = () => {
  const { colors } = useTheme();
  const { transactionsByPeriod } = useTransactions();
  const { sharedUserNameList } = useAuth();

  const [total, setTotal] = useState<ITotal>({} as ITotal);

  const spends = transactionsByPeriod.filter((item) => item.type === "outcome");

  const totalSpends = spends.reduce((acc, transaction) => {
    return acc + Number(transaction.amountWithoutMask) / 100;
  }, 0);

  const sharedSpends =
    transactionsByPeriod.filter(
      (item) =>
        item.type === "outcome" &&
        item.responsible === sharedUserNameList[0].name
    ) || [];

  useEffect(() => {
    const outcome = sharedSpends.reduce((acc, transaction) => {
      return acc + Number(transaction.amountWithoutMask) / 100;
    }, 0);

    setTotal({
      outcome: {
        amount: outcome,
        formatted: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(outcome),
      },
    });
  }, [transactionsByPeriod]);

  return (
    <Box position={"relative"}>
      <AnimatedCircularProgress
        duration={1500}
        easing={Easing.in(Easing.ease)}
        size={220}
        width={15}
        backgroundWidth={5}
        fill={(total?.outcome?.amount / totalSpends) * 100 || 0}
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
              {sharedUserNameList[0].name} gastou
              {"\n"} de{" "}
              {new Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(totalSpends)}
            </Text>
          </VStack>
        )}
      />
    </Box>
  );
};
