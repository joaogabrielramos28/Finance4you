import React from "react";
import {
  VStack,
  Select as NativeBaseSelect,
  Text,
  Box,
  useTheme,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Masks } from "react-native-mask-input";
import DateTimePicker from "@react-native-community/datetimepicker";

import { validationSchema } from "./validation";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MaskInput } from "@components/MaskInput";
import { Select } from "@components/Select";

import { categories } from "@data/category";
import { setItemToAsyncStorage } from "@helpers/AsyncStorage";
import { AsyncStorageKeys } from "@helpers/types";
import { format } from "date-fns";
import { Layout } from "@components/Layout";

export const RecurrentTransactionsCreate = () => {
  const { goBack, navigate } = useNavigation();
  const { colors } = useTheme();

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
      name: "",
      amount: "",
      amountWithoutMask: "",
      category: "",
      subCategory: "",
      date: new Date(),
    },
  });

  const category = watch("category");

  const subCategories = categories.find(
    (item) => item.name === category
  )?.subCategories;

  const onSubmit = async (data: any) => {
    const payload = {
      id: new Date().getTime(),
      ...data,
      description: data.name || "",
      type: "outcome",
      dateFormatted: format(new Date(data.date), "dd/MM/yyyy"),
    };

    await setItemToAsyncStorage(
      AsyncStorageKeys.RECURRENT_TRANSACTIONS,
      payload
    );
    navigate("RecurrentTransactionsList");
    reset();
  };

  return (
    <Layout>
      <Header onBack={goBack} title="Criar transação recorrente" />

      <VStack p={4}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              p={"12px"}
              placeholder="Ex: Aluguel"
              label="Nome da transação recorrente"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              label="Valor"
              value={value}
              onChangeText={(masked, unmasked) => {
                onChange(masked);
                setValue("amountWithoutMask", unmasked);
              }}
              mask={Masks.BRL_CURRENCY}
            />
          )}
        />

        <Text fontSize={"lg"} color={"grayBrand.300"} mt={4} marginBottom={2}>
          Categoria
        </Text>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Select
              p={"12px"}
              fontSize="md"
              onValueChange={onChange}
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
        {!category ? (
          <Text color={"redBrand.500"}>Preencha categoria!</Text>
        ) : null}
        <Text fontSize={"lg"} color={"grayBrand.300"} mt={4} marginBottom={2}>
          Data
        </Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              minimumDate={new Date()}
              accentColor={colors.violetBrand[400]}
              themeVariant={"dark"}
              value={value}
              mode={"date"}
              locale={"pt-Br"}
              onChange={(e, date) => onChange(date)}
            />
          )}
        />
      </VStack>
      <Box p={4}>
        <Button isDisabled={!isValid} onPress={handleSubmit(onSubmit)}>
          Criar
        </Button>
      </Box>
    </Layout>
  );
};
