import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { ThirdStep } from "./components/ThirdStep";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FirstStepSchemaValidation,
  SecondStepSchemaValidation,
  ThirdStepSchemaValidation,
} from "./validation/formValidation";
import { useCreateTransaction } from "./context/CreateTransactionContext";
export const CreateTransaction = () => {
  const { step } = useCreateTransaction();

  const schemaValidationByStep =
    step === 1
      ? FirstStepSchemaValidation
      : step === 2
      ? SecondStepSchemaValidation
      : ThirdStepSchemaValidation;
  const CreateTransactionForm = useForm<FormData>({
    resolver: yupResolver(schemaValidationByStep),
  });
  return (
    <FormProvider {...CreateTransactionForm}>
      {step === 1 && <FirstStep />}
      {step === 2 && <SecondStep />}
      {step === 3 && <ThirdStep />}
    </FormProvider>
  );
};
