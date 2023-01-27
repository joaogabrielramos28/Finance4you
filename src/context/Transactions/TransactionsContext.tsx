import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMonths, subMonths } from "date-fns";

import { AsyncStorageKeys } from "@helpers/types";
import { ICreateTransactionContext, ITransaction } from "./types";

const TransactionsContext = createContext({} as ICreateTransactionContext);

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [actualPeriod, setActualPeriod] = useState(new Date());
  const [creditCardStyle, setCreditCardStyle] = useState<
    "purple" | "pink" | "blue"
  >("purple");

  const [filterTransactions, setFilterTransactions] = useState({
    category: "all",
    amount: 10000,
    date: new Date(),
    responsible: "",
    hasDateFilter: "no",
    hasResponsibleFilter: "no",
  });

  const handleSetFilterTransactions = (data: {
    category: string;
    amount: number;
    date: Date;
    responsible: string;
    hasDateFilter: string;
    hasResponsibleFilter: string;
  }) => {
    setFilterTransactions({
      category: data.category,
      amount: data.amount,
      date: data.date,
      hasDateFilter: data.hasDateFilter,
      hasResponsibleFilter: data.hasResponsibleFilter,
      responsible: data.responsible,
    });
  };

  const resetFilterTransactions = () => {
    setFilterTransactions({
      category: "all",
      amount: 10000,
      date: new Date(),
      responsible: "",
      hasDateFilter: "no",
      hasResponsibleFilter: "no",
    });
  };

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const prevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const createTransaction = async (transaction: ITransaction) => {
    const response = await AsyncStorage.getItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE
    );
    const data = response ? JSON.parse(response) : [];

    await AsyncStorage.setItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE,
      JSON.stringify([...data, transaction])
    );
    setTransactions([...data, transaction]);
    setStep(0);
  };

  const deleteTransaction = async (id: string) => {
    const response = await AsyncStorage.getItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE
    );
    const data = response ? JSON.parse(response) : [];

    const newData = data.filter((item: ITransaction) => item.id !== id);

    await AsyncStorage.setItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE,
      JSON.stringify(newData)
    );
    setTransactions(newData);
  };

  const handleChangePeriod = (action: "next" | "prev") => {
    if (action === "next") {
      setActualPeriod(addMonths(actualPeriod, 1));
    } else {
      setActualPeriod(subMonths(actualPeriod, 1));
    }
  };

  const transactionsByPeriod = transactions.filter(
    (item) =>
      new Date(item.date).getMonth() === actualPeriod.getMonth() &&
      new Date(item.date).getFullYear() === actualPeriod.getFullYear()
  );

  const changeCreditCard = async (creditCard: "purple" | "pink" | "blue") => {
    await AsyncStorage.setItem(
      AsyncStorageKeys.CREDITCARD_KEY_STORAGE,
      JSON.stringify(creditCard)
    );
    setCreditCardStyle(creditCard);
  };

  useEffect(() => {
    async function loadTransactions() {
      const response = await AsyncStorage.getItem(
        AsyncStorageKeys.TRANSACTION_KEY_STORAGE
      );
      const data = response ? JSON.parse(response) : [];
      setTransactions(data);
    }
    loadTransactions();
  }, []);

  useEffect(() => {
    async function loadCreditCard() {
      const response = await AsyncStorage.getItem(
        AsyncStorageKeys.CREDITCARD_KEY_STORAGE
      );
      const data = response ? JSON.parse(response) : 0;
      setCreditCardStyle(data);
    }

    loadCreditCard();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        nextStep,
        prevStep,
        step,
        createTransaction,
        transactions,
        actualPeriod,
        handleChangePeriod,
        transactionsByPeriod,
        changeCreditCard,
        creditCardStyle,
        filterTransactions,
        handleSetFilterTransactions,
        resetFilterTransactions,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => {
  const context = React.useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a CreateTransactionProvider"
    );
  }
  return context;
};

export { TransactionsProvider, useTransactions };
