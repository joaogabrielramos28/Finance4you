import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Box, FlatList, Heading, useTheme, VStack } from "native-base";
import React from "react";
import { Transaction } from "../../../../components/Transaction";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";

export const TransactionsList = () => {
  const { transactionsByPeriod, filterTransactions } = useTransactions();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredTransactions = orderedTransactions
    .filter(
      (transaction) =>
        filterTransactions.category === "all" ||
        transaction.category === filterTransactions.category
    )
    .filter(
      (transaction) =>
        filterTransactions.amount === 0 ||
        transaction.amount <= filterTransactions.amount
    );

  return (
    <VStack marginTop={4} paddingX={"32px"}>
      <Heading fontSize={"xl"} color={"grayBrand.300"}>
        Lista de transações
      </Heading>

      <Box safeAreaBottom>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 86,
          }}
          marginTop={"24px"}
          data={filteredTransactions}
          renderItem={({ item }) => (
            <Box marginTop={4}>
              <Transaction {...item} />
            </Box>
          )}
          ListEmptyComponent={
            <Box flex={1} alignItems={"center"}>
              <Heading color={"grayBrand.400"} size={"md"}>
                Nenhuma movimentação
              </Heading>
            </Box>
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
