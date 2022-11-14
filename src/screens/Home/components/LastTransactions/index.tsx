import React from "react";
import { Box, FlatList, Heading } from "native-base";
import { Transaction } from "../../../../components/Transaction";
import { useCreateTransaction } from "../../../../context/CreateTransactionContext";

export const LastTransactions = () => {
  const { transactionsByPeriod } = useCreateTransaction();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box padding={"32px"} flex={1}>
      <Heading color={"grayBrand.300"}>Ultimas movimentações</Heading>
      <FlatList
        marginTop={"24px"}
        data={orderedTransactions.slice(0, 5)}
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
  );
};
