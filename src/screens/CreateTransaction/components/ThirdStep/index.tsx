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
  TextArea,
  ScrollView,
} from "native-base";
import StepThree from "../../../../assets/step3.png";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Info,
} from "phosphor-react-native";
import { useFormContext } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";

export const ThirdStep = () => {
  const { colors } = useTheme();
  const { createTransaction, prevStep } = useTransactions();
  const { setValue, getValues, reset } = useFormContext();

  const [type, setType] = useState<"income" | "outcome">(getValues("type"));
  const [amount, setAmount] = useState(getValues("amount"));
  const [date, setDate] = useState(getValues("date") || new Date());
  const [description, setDescription] = useState(getValues("description"));

  const handleCreateTransaction = () => {
    const amount = getValues("amount");
    const category = getValues("category");
    const subCategory = getValues("subCategory");
    const dateFormatted = format(date, "dd/MM/yyyy");
    const description = getValues("description");

    const currencyFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
    const payload = {
      id: String(new Date().getTime()),
      amountFormatted: currencyFormatted,
      amount: Number(amount),
      category,
      subCategory,
      dateFormatted,
      date,
      type,
      description,
    };
    createTransaction(payload);
    reset();
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setValue("date", currentDate);
  };

  const handleSelectTransactionType = (type: "income" | "outcome") => {
    setType(type);
    setValue("type", type);
  };

  const handleChangeAmount = (amount: string) => {
    setAmount(amount);
    setValue("amount", amount);
  };

  const handleChangeDescription = (description: string) => {
    setDescription(description);
    setValue("description", description);
  };

  return (
    <ScrollView flex={1} bg={"background"}>
      <VStack alignItems={"center"} marginTop={"8px"} safeAreaY>
        <Heading fontSize={"2xl"} color={"grayBrand.200"}>
          Detalhes da transação
        </Heading>
        <Image source={StepThree} marginTop={"8px"} alt={""} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <Heading color={"grayBrand.300"} size={"sm"}>
            Valor
          </Heading>
          <Input
            keyboardType="numeric"
            padding={"12px"}
            InputLeftElement={<CurrencyDollar color={colors.grayBrand[200]} />}
            value={amount}
            onChangeText={handleChangeAmount}
            color={"grayBrand.200"}
            _focus={{
              borderColor: "violetBrand.700",
              backgroundColor: "transparent",
            }}
          />

          <Heading color={"grayBrand.300"} size={"sm"}>
            Tipo de transação
          </Heading>

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
          <Heading color={"grayBrand.300"} size={"sm"}>
            Data da transação
          </Heading>

          <DateTimePicker
            accentColor={colors.violetBrand[400]}
            maximumDate={new Date()}
            themeVariant={"dark"}
            value={date}
            mode={"date"}
            locale={"pt-Br"}
            onChange={handleDateChange}
          />
          <HStack alignItems={"center"} space={2}>
            <Info color={colors.grayBrand[200]} size={20} />
            <Heading color={"grayBrand.300"} size={"sm"} alignItems={"center"}>
              Observação
            </Heading>
          </HStack>

          <TextArea
            autoCompleteType={"off"}
            padding={"12px"}
            value={description}
            onChangeText={handleChangeDescription}
            color={"grayBrand.200"}
            _focus={{
              borderColor: "violetBrand.700",
              backgroundColor: "transparent",
            }}
          />

          <Button
            onPress={handleCreateTransaction}
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
    </ScrollView>
  );
};
