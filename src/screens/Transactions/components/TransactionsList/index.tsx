import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useToast } from "native-base";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Toast,
  useTheme,
  VStack,
} from "native-base";
import { Info } from "phosphor-react-native";
import React, { useEffect } from "react";
import { Transaction } from "../../../../components/Transaction";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";

export const TransactionsList = () => {
  const toast = useToast();
  const { transactionsByPeriod, filterTransactions } = useTransactions();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const { colors } = useTheme();

  const filteredTransactions = orderedTransactions
    .filter(
      (transaction) =>
        filterTransactions.category === "all" ||
        transaction.category === filterTransactions.category
    )
    .filter(
      (transaction) =>
        filterTransactions.amount === 0 ||
        Number(transaction.amountWithoutMask) / 100 <= filterTransactions.amount
    );

  const id = "test-toast";

  return (
    <VStack marginTop={4} paddingX={"32px"}>
      <HStack alignItems={"center"} space={0}>
        <Heading fontSize={"xl"} color={"grayBrand.300"}>
          Lista de transações
        </Heading>

        <IconButton
          size={"md"}
          icon={<Info color={colors.grayBrand[200]} size={24} />}
          onPress={() => {
            if (!toast.isActive(id)) {
              Toast.show({
                id,
                placement: "bottom",
                render: () => (
                  <Box
                    bg="violetBrand.500"
                    px="2"
                    py="1"
                    rounded="sm"
                    mb={5}
                    _text={{
                      color: "grayBrand.100",
                    }}
                  >
                    Deslize pro lado para apagar a transação
                  </Box>
                ),
              });
            }
          }}
        />
      </HStack>

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
