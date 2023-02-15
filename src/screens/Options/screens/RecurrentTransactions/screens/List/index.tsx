import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { ITransaction } from "@context/Transactions/types";
import { getItemFromAsyncStorage } from "@helpers/AsyncStorage";
import { AsyncStorageKeys } from "@helpers/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, FlatList, Text, VStack } from "native-base";
import React, { useEffect } from "react";

import { Item } from "./components/Item";

export const RecurrentTransactionsList = () => {
  const { goBack, navigate } = useNavigation();
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);

  const getTransactionsFromAsync = async () => {
    const transactions = await getItemFromAsyncStorage(
      AsyncStorageKeys.RECURRENT_TRANSACTIONS
    );
    setTransactions(transactions);
  };

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        await getTransactionsFromAsync();
      }
      loadData();

      return () => {
        setTransactions([]);
      };
    }, [])
  );

  const handleGoToCreateRecurrentTransaction = () => {
    navigate("RecurrentTransactionsCreate");
  };

  return (
    <Box flex={1} bg={"background"} safeAreaY justifyContent={"space-between"}>
      <Box>
        <Header title="Transações recorrentes" onBack={goBack} />
        <VStack padding={4} justifyContent={"space-between"}>
          <FlatList
            data={transactions}
            renderItem={({ item }) => <Item {...(item as ITransaction)} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Box flex={1} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize={"lg"} color="gray.100" bold>
                  Nenhuma transação recorrente encontrada
                </Text>
              </Box>
            }
          />
        </VStack>
      </Box>
      <Box alignItems={"center"} padding={4}>
        <Button w={"100%"} onPress={handleGoToCreateRecurrentTransaction}>
          Criar Transação recorrente
        </Button>
      </Box>
    </Box>
  );
};
