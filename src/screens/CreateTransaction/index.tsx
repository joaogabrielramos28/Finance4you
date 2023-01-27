import React from "react";
import { Box, Heading, ScrollView, useTheme, Factory } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StepIndicator from "react-native-step-indicator";
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

export const CreateTransaction = () => {
  const { step } = useTransactions();
  const { colors } = useTheme();

  const StepIndicatorFactory = Factory(StepIndicator);
  const schemaValidationByStep =
    step === 1
      ? FirstStepSchemaValidation
      : step === 2
      ? SecondStepSchemaValidation
      : ThirdStepSchemaValidation;
  const CreateTransactionForm = useForm<FormData>({
    resolver: yupResolver(schemaValidationByStep),
  });

  const labels = ["Categoria", "Subcategoria", "Detalhes"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.violetBrand[400],
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.violetBrand[700],
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: colors.violetBrand[700],
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: colors.violetBrand[700],
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.violetBrand[700],
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: colors.violetBrand[700],
  };

  const { height } = useWindowDimensions();

  const isMd = height > 700;

  const maxH = isMd ? "360px" : "280px";
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
          <Box mt={4}>
            <StepIndicatorFactory
              customStyles={customStyles}
              currentPosition={step}
              labels={labels}
              stepCount={3}
            />
          </Box>

          {step === 0 && <FirstStep maxH={maxH} />}
          {step === 1 && <SecondStep maxH={maxH} />}
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
              <StepIndicatorFactory
                customStyles={customStyles}
                currentPosition={step}
                labels={labels}
                stepCount={3}
              />
            </Box>
            <ThirdStep />
          </ScrollView>
        </Box>
      )}
    </FormProvider>
  );
};
