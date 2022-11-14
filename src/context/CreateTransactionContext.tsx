import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMonths, subMonths } from "date-fns";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICreateTransactionContext, ITransaction } from "./types";

const CreateTransactionContext = createContext({} as ICreateTransactionContext);

const TRANSACTION_KEY_STORAGE = "@finance4you:transactions";
const CREDITCARD_KEY_STORAGE = "@finance4you:creditcards";

const CreateTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [actualPeriod, setActualPeriod] = useState(new Date());

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const prevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const createTransaction = async (transaction: ITransaction) => {
    const response = await AsyncStorage.getItem(TRANSACTION_KEY_STORAGE);
    const data = response ? JSON.parse(response) : [];

    await AsyncStorage.setItem(
      TRANSACTION_KEY_STORAGE,
      JSON.stringify([...data, transaction])
    );
    setTransactions([...data, transaction]);

    setStep(1);
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

  useEffect(() => {
    async function loadTransactions() {
      const response = await AsyncStorage.getItem(TRANSACTION_KEY_STORAGE);
      const data = response ? JSON.parse(response) : [];
      setTransactions(data);
    }
    loadTransactions();
  }, []);

  return (
    <CreateTransactionContext.Provider
      value={{
        nextStep,
        prevStep,
        step,
        createTransaction,
        transactions,
        actualPeriod,
        handleChangePeriod,
        transactionsByPeriod,
      }}
    >
      {children}
    </CreateTransactionContext.Provider>
  );
};

const useCreateTransaction = () => {
  const context = React.useContext(CreateTransactionContext);
  if (context === undefined) {
    throw new Error(
      "useCreateTransaction must be used within a CreateTransactionProvider"
    );
  }
  return context;
};

export { CreateTransactionProvider, useCreateTransaction };
