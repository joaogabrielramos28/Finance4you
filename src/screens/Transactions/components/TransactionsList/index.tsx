import { Button } from "@components/Button";
import { ITransaction } from "@context/Transactions/types";
import {
  getItemFromAsyncStorage,
  setItemToAsyncStorage,
  setItemWhenDataIsOneValue,
} from "@helpers/AsyncStorage";
import { AsyncStorageKeys } from "@helpers/types";
import { addMonths, format } from "date-fns";
import { Spinner, useToast } from "native-base";
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
import { ArrowFatLinesLeft, Info } from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { Transaction } from "@components/Transaction";
import { useAuth } from "@context/Auth/AuthContext";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const TransactionsList = () => {
  const { user } = useAuth();
  const toast = useToast();
  const {
    transactionsByPeriod,
    filterTransactions,
    getTransactions,
    transactions,
  } = useTransactions();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [loadingRecurrence, setLoadingRecurrence] = useState(false);
  const [canActiveRecurrence, setCanActiveRecurrence] = useState(false);

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
    )
    .filter((transaction) => {
      if (filterTransactions.hasDateFilter === "yes") {
        const date = new Date(transaction.date);
        const filterDate = filterTransactions.date;
        return (
          date.getDate() === filterDate.getDate() &&
          date.getMonth() === filterDate.getMonth() &&
          date.getFullYear() === filterDate.getFullYear()
        );
      }
      return true;
    })
    .filter((transaction) => {
      if (filterTransactions.hasResponsibleFilter === "yes") {
        if (filterTransactions.responsible === user.name) {
          return (
            !transaction.responsible || transaction.responsible === user.name
          );
        }
        return transaction.responsible === filterTransactions.responsible;
      }
      return true;
    });

  const id = "test-toast";

  const getRecurrenceDateFromAsync = async () => {
    return await getItemFromAsyncStorage(AsyncStorageKeys.RECURRENT_DATE);
  };

  const checkIfCanActiveRecurrenceTransactions = async () => {
    const recurrenceDate = await getRecurrenceDateFromAsync();
    if (recurrenceDate[0] !== undefined) {
      setCanActiveRecurrence(
        new Date().getTime() > new Date(recurrenceDate[0]).getTime()
      );
    } else {
      setCanActiveRecurrence(false);
    }
  };

  const getRecurrenceTransactionsFromAsync = async () => {
    return await getItemFromAsyncStorage(
      AsyncStorageKeys.RECURRENT_TRANSACTIONS
    );
  };

  const handleAddRecurrenceTransactions = async () => {
    const transactionsRecurrence = await getRecurrenceTransactionsFromAsync();
    const recurrenceDate = await getRecurrenceDateFromAsync();

    if (transactionsRecurrence) {
      setLoadingRecurrence(true);
      const newTransactionsWithIdAndNewDate = transactionsRecurrence.map(
        (transaction: ITransaction, index: number) => {
          return {
            ...transaction,
            id: new Date().getTime() + (index + 1),
            date: new Date(recurrenceDate),
            dateFormatted: format(new Date(recurrenceDate), "dd/MM/yyyy"),
          };
        }
      );

      await AsyncStorage.setItem(
        AsyncStorageKeys.TRANSACTION_KEY_STORAGE,
        JSON.stringify([...newTransactionsWithIdAndNewDate, ...transactions])
      );

      const newRecurrenceDate = addMonths(new Date(recurrenceDate[0]), 1);

      setItemWhenDataIsOneValue(
        AsyncStorageKeys.RECURRENT_DATE,
        newRecurrenceDate
      );
    }
  };

  useEffect(() => {
    async function loadData() {
      await checkIfCanActiveRecurrenceTransactions();
    }
    loadData();
  }, []);

  useEffect(() => {
    getTransactions();
    setLoadingRecurrence(false);
  }, [transactions]);

  return (
    <VStack marginTop={4} paddingX={"32px"}>
      {canActiveRecurrence ? (
        <Button onPress={handleAddRecurrenceTransactions} my={4}>
          Adicionar transações recorrentes
        </Button>
      ) : null}
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
        {loadingRecurrence ? <Spinner size={"sm"} color="violet.700" /> : null}

        <FlatList
          contentContainerStyle={{
            paddingBottom: 86,
          }}
          marginTop={"24px"}
          data={filteredTransactions}
          renderItem={({ item }) => (
            <Animated.View
              layout={Layout}
              entering={FadeIn}
              exiting={FadeOut}
              style={{
                marginTop: 16,
              }}
            >
              <Transaction {...item} />
            </Animated.View>
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
