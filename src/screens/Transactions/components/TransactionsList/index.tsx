import { Box, FlatList, Heading, VStack } from "native-base";
import React from "react";
import { Transaction } from "../../../../components/Transaction";
import { useCreateTransaction } from "../../../../context/CreateTransactionContext";

export const TransactionsList = () => {
  const { transactionsByPeriod } = useCreateTransaction();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
          data={orderedTransactions}
          renderItem={({ item }) => (
            <Box marginTop={4}>
              <Transaction {...item} />
            </Box>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
