import React, { useEffect, useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { ITransaction } from "@context/Transactions/types";
import {
  getItemFromAsyncStorage,
  setItemWhenDataIsOneValue,
} from "@helpers/AsyncStorage";
import { AsyncStorageKeys } from "@helpers/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, FlatList, Heading, Text, VStack } from "native-base";

import { isFirstDayOfMonth, formatDistanceToNow } from "date-fns";

import { Item } from "./components/Item";
import { ptBR } from "date-fns/locale";
import { Layout } from "@components/Layout";

export const RecurrentTransactionsList = () => {
  const { goBack, navigate } = useNavigation();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [dateForRecurrence, setDateForRecurrence] = useState<Date>(new Date());

  const getTransactionsFromAsync = async () => {
    const transactions = await getItemFromAsyncStorage(
      AsyncStorageKeys.RECURRENT_TRANSACTIONS
    );
    setTransactions(transactions);
  };

  const getRecurrenceTime = async () => {
    const recurrenceTime = await getItemFromAsyncStorage(
      AsyncStorageKeys.RECURRENT_DATE
    );

    setDateForRecurrence(recurrenceTime[0]);

    return recurrenceTime;
  };

  const setRecurrenceTimeFirstTime = async () => {
    const asyncDate = await getRecurrenceTime();

    if (asyncDate[0] !== undefined) {
      return;
    }
    const date = new Date();

    const isFirstDay = isFirstDayOfMonth(date);

    if (isFirstDay) {
      await setItemWhenDataIsOneValue(AsyncStorageKeys.RECURRENT_DATE, date);
    } else {
      await setItemWhenDataIsOneValue(
        AsyncStorageKeys.RECURRENT_DATE,
        new Date(date.getFullYear(), date.getMonth() + 1, 1)
      );
    }
  };

  useEffect(() => {
    setRecurrenceTimeFirstTime();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        await getTransactionsFromAsync();
        await getRecurrenceTime();
      }
      loadData();
      return () => {
        setTransactions([]);
        setDateForRecurrence(new Date());
      };
    }, [])
  );

  const handleGoToCreateRecurrentTransaction = () => {
    navigate("RecurrentTransactionsCreate");
  };

  const interval = formatDistanceToNow(new Date(dateForRecurrence), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Layout justifyContent={"space-between"}>
      <Box>
        <Header title="Transações recorrentes" onBack={goBack} />
        <VStack justifyContent={"space-between"} p={4} space={2}>
          <Heading color={"grayBrand.300"}>
            Data para a próxima recorrência{" "}
            <Text color={"violet.700"}>{interval}</Text>
          </Heading>
          <Text color={"grayBrand.300"} fontSize={"md"} mt={2}>
            Será liberado o botão para adicionar as transações recorrentes no
            primeiro dia de cada mês, na tela de transações.
          </Text>
        </VStack>

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
    </Layout>
  );
};
