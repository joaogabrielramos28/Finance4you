import { Box, FlatList, Heading, VStack } from "native-base";
import React from "react";
import { Transaction } from "../../../../components/Transaction";

export const TransactionsList = () => {
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
          data={[0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
          renderItem={(item) => (
            <Box marginTop={4}>
              <Transaction type="Enter" />
            </Box>
          )}
          keyExtractor={(item) => String(item)}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
