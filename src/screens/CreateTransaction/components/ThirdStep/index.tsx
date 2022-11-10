import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  VStack,
  useTheme,
  HStack,
  Text,
} from "native-base";
import StepThree from "../../../../assets/step3.png";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Money,
} from "phosphor-react-native";
import { useCreateTransaction } from "../../context/CreateTransactionContext";
import { useFormContext } from "react-hook-form";

export const ThirdStep = () => {
  const { colors } = useTheme();
  const { createTransaction, prevStep } = useCreateTransaction();
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [type, setType] = useState<"income" | "outcome">(getValues("type"));
  const [amount, setAmount] = useState(getValues("amount"));

  const handleCreateTransaction = () => {
    const category = getValues("category");
    const subCategory = getValues("subCategory");
  };

  const handleSelectTransactionType = (type: "income" | "outcome") => {
    setType(type);
    setValue("type", type);
  };

  const handleChangeAmount = (amount: string) => {
    setAmount(amount);
    setValue("amount", amount);
  };

  return (
    <Box flex={1} bg={"background"}>
      <Box
        w={"100%"}
        bg={"background"}
        shadow={8}
        safeAreaY={6}
        paddingY={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading color={"grayBrand.300"}>App</Heading>
      </Box>

      <VStack alignItems={"center"} marginTop={"8px"}>
        <Heading fontSize={"2xl"} color={"grayBrand.200"}>
          Selecione o valor
        </Heading>
        <Image source={StepThree} marginTop={"8px"} alt={""} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <Input
            padding={"12px"}
            InputLeftElement={<CurrencyDollar color={colors.grayBrand[200]} />}
            value={amount}
            onChangeText={handleChangeAmount}
            color={"grayBrand.200"}
          />

          <HStack w={"100%"} space={"16px"} justifyContent={"space-between"}>
            <Button
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              borderWidth={type === "income" ? 2 : 0}
              onPress={() => handleSelectTransactionType("income")}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleUp color={colors.greenBrand[500]} />

                <Text color={"grayBrand.300"}>Entrada</Text>
              </HStack>
            </Button>

            <Button
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              onPress={() => handleSelectTransactionType("outcome")}
              borderWidth={type === "outcome" ? 2 : 0}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleDown color={colors.redBrand[500]} />
                <Text color={"grayBrand.300"}>Saída</Text>
              </HStack>
            </Button>
          </HStack>
          <Button
            isDisabled={!getValues("amount") || !getValues("type")}
            marginTop={"16px"}
            bg={"violetBrand.700"}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
          >
            Criar transação
          </Button>
          <Button
            onPress={prevStep}
            marginTop={"16px"}
            bg={"transparent"}
            borderColor={"violetBrand.700"}
            borderWidth={1}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
          >
            Voltar
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
