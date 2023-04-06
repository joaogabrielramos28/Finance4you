import React, { useState } from "react";
import { Box, Heading, ScrollView } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useWindowDimensions } from "react-native";

import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { ThirdStep } from "./components/ThirdStep";
import {
  FirstStepSchemaValidation,
  SecondStepSchemaValidation,
  ThirdStepSchemaValidation,
} from "./validation/formValidation";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import { StepIndicator } from "./components/StepIndicator";

export const CreateTransaction = () => {
  const [step, setStep] = useState(0);

  const schemaValidationByStep =
    step === 1
      ? FirstStepSchemaValidation
      : step === 2
      ? SecondStepSchemaValidation
      : ThirdStepSchemaValidation;
  const CreateTransactionForm = useForm<FormData>({
    resolver: yupResolver(schemaValidationByStep),
  });

  const { height } = useWindowDimensions();

  const isMd = height > 700;

  const maxH = isMd ? "360px" : "280px";

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const prevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const resetStep = () => {
    setStep(0);
  };

  return (
    <FormProvider {...CreateTransactionForm}>
      {step !== 2 ? (
        <Box flex={1} bg={"background"} safeAreaY>
          <Heading
            fontSize={"2xl"}
            color={"grayBrand.200"}
            textAlign={"center"}
          >
            {step === 0
              ? "Selecione a categoria"
              : step === 1
              ? "Selecione a subcategoria"
              : "Detalhes da transação"}
          </Heading>
          <Box mt={4}></Box>

          {step === 0 ? <FirstStep nextStep={nextStep} maxH={maxH} /> : null}
          {step === 1 ? (
            <SecondStep nextStep={nextStep} prevStep={prevStep} maxH={maxH} />
          ) : null}
        </Box>
      ) : (
        <Box flex={1} bg={"background"} safeAreaY>
          <ScrollView flex={1} bg={"background"}>
            <Heading
              fontSize={"2xl"}
              color={"grayBrand.200"}
              textAlign={"center"}
            >
              Detalhes da transação
            </Heading>
            <Box mt={4}>
              <StepIndicator step={step} />
            </Box>
            <ThirdStep prevStep={prevStep} resetStep={resetStep} />
          </ScrollView>
        </Box>
      )}
    </FormProvider>
  );
};
