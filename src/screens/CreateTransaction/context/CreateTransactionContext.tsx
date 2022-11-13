import React, { createContext, ReactNode, useState } from "react";
import { ICreateTransactionContext, ITransaction } from "./types";

const CreateTransactionContext = createContext({} as ICreateTransactionContext);

const CreateTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const prevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const createTransaction = (transaction: ITransaction) => {
    console.log(transaction);
  };

  return (
    <CreateTransactionContext.Provider
      value={{ nextStep, prevStep, step, createTransaction }}
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
