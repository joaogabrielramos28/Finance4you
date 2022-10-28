import React from "react";
import { Box, Divider, FlatList, Heading, VStack } from "native-base";
import { Transaction } from "../../../../components/Transaction";

export const LastTransactions = () => {
  return (
    <Box padding={"32px"} flex={1}>
      <Heading color={"grayBrand.300"}>Ultimas movimentações</Heading>
      <FlatList
        marginTop={"24px"}
        data={[0, 1, 2, 3]}
        renderItem={(item) => (
          <Box marginTop={4}>
            <Transaction type="Enter" />
          </Box>
        )}
        keyExtractor={(item) => String(item)}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
