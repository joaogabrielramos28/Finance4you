import React from "react";
import { Box, FlatList, Heading } from "native-base";
import { Transaction } from "../../../../components/Transaction";
import { useCreateTransaction } from "../../../../context/CreateTransactionContext";

export const LastTransactions = () => {
  const { transactions } = useCreateTransaction();
  const orderedTransactions = transactions.sort(
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
