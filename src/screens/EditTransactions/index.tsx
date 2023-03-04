import { Header } from "@components/Header";
import { Layout } from "@components/Layout";
import { MaskInput } from "@components/MaskInput";
import {
  HStack,
  VStack,
  Button as NativeBaseButton,
  useTheme,
  Text,
  Heading,
  TextArea,
  Box,
  Select as NativeBaseSelect,
} from "native-base";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react-native";
import React from "react";
import { ITransactionDetailsScreenProps } from "src/@types/navigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "@components/Button";
import { categories } from "@data/category";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { Select } from "@components/Select";
import { Masks } from "react-native-mask-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "@helpers/types";
import { ITransaction } from "@context/Transactions/types";
import { format } from "date-fns";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTransactions } from "@context/Transactions/TransactionsContext";

export const EditTransactions = () => {
  const { goBack, dispatch } = useNavigation();
  const { params } = useRoute();
  const { getTransactions } = useTransactions();

  const transaction = params as ITransactionDetailsScreenProps;

  const { colors } = useTheme();

  const {
    id,
    type,
    amount,
    date,
    description,
    category,
    subCategory,
    amountWithoutMask,
  } = transaction;

  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      amount: amount,
      amountWithoutMask: amountWithoutMask,
      category: category,
      subCategory: subCategory,
      date: new Date(date),
      type: type,
      description: description,
    },
  });

  const watchType = watch("type");

  const categoryWatch = watch("category");

  const subCategories = categories.find(
    (item) => item.name === categoryWatch
  )?.subCategories;

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      dateFormatted: format(new Date(data.date), "dd/MM/yyyy"),
    };
    const response = await AsyncStorage.getItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE
    );
    const transactions = response ? JSON.parse(response) : [];

    const newTransactions = transactions.map((item: ITransaction) => {
      if (item.id === id) {
        return payload;
      }
      return item;
    });

    await AsyncStorage.setItem(
      AsyncStorageKeys.TRANSACTION_KEY_STORAGE,
      JSON.stringify(newTransactions)
    );

    getTransactions();
    dispatch(StackActions.popToTop());
    reset();
  };

  return (
    <Layout hasScrollView>
      <Header onBack={goBack} title={"Editar transação"} />

      <VStack p={4} space={6}>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              label="Valor"
              value={value}
              bold
              mask={Masks.BRL_CURRENCY}
              onChangeText={(masked, unmasked) => {
                onChange(masked);
                setValue("amountWithoutMask", unmasked);
              }}
            />
          )}
        />

        <Box>
          <Text color={"grayBrand.300"} fontSize={"lg"} bold mb={2}>
            Categoria
          </Text>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Select
                p={"12px"}
                fontSize="md"
                onValueChange={(value) => {
                  onChange(value);
                  setValue("subCategory", "");
                }}
                selectedValue={value}
              >
                {categories.map((category) => (
                  <NativeBaseSelect.Item
                    key={category.id}
                    label={category.name}
                    value={category.name}
                  />
                ))}
              </Select>
            )}
          />
        </Box>

        <Box>
          <Text fontSize={"lg"} color={"grayBrand.300"} mt={4} marginBottom={2}>
            Subcategoria
          </Text>
          <Controller
            control={control}
            name="subCategory"
            render={({ field: { onChange, value } }) => (
              <Select
                _disabled={{
                  bg: "zinc.600",
                }}
                isDisabled={!subCategories}
                p={"12px"}
                fontSize="md"
                onValueChange={onChange}
                selectedValue={value}
              >
                {subCategories?.map((subCategory) => (
                  <NativeBaseSelect.Item
                    key={subCategory.id}
                    label={subCategory.name}
                    value={subCategory.name}
                  />
                ))}
              </Select>
            )}
          />
        </Box>
        <Box>
          <Text color={"grayBrand.300"} fontSize={"lg"} bold my={2}>
            Tipo de transação
          </Text>

          <HStack w={"100%"} space={"16px"} justifyContent={"space-around"}>
            <NativeBaseButton
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              borderWidth={watchType === "income" ? 2 : 0}
              onPress={() => setValue("type", "income")}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleUp color={colors.greenBrand[500]} />

                <Text color={"grayBrand.300"}>Entrada</Text>
              </HStack>
            </NativeBaseButton>

            <NativeBaseButton
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              onPress={() => setValue("type", "outcome")}
              borderWidth={watchType === "outcome" ? 2 : 0}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleDown color={colors.redBrand[500]} />
                <Text color={"grayBrand.300"}>Saída</Text>
              </HStack>
            </NativeBaseButton>
          </HStack>
        </Box>

        <Box>
          <Text color={"grayBrand.300"} fontSize={"lg"} bold>
            Data da transação
          </Text>

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                accentColor={colors.violetBrand[400]}
                maximumDate={new Date()}
                themeVariant={"dark"}
                value={value}
                mode={"date"}
                locale={"pt-Br"}
                onChange={(event, date) => {
                  onChange(date);
                }}
              />
            )}
          />
        </Box>

        <Box>
          <Heading
            color={"grayBrand.300"}
            size={"sm"}
            mb={4}
            alignItems={"center"}
          >
            Observação
          </Heading>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                autoCompleteType={"off"}
                padding={"12px"}
                value={value}
                color={"grayBrand.200"}
                _focus={{
                  borderColor: "violetBrand.700",
                  backgroundColor: "transparent",
                }}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </Box>
        <Button mt={12} isDisabled={!isValid} onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </VStack>
    </Layout>
  );
};
