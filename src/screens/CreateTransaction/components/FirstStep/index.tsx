import React, { useState } from "react";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";

import StepOne from "../../../../assets/step1.png";
import { FormButton } from "../FormButton";
import { categories } from "../../../../data/category";
import { useFormContext } from "react-hook-form";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../../../..//context/Transactions/TransactionsContext";

export const FirstStep = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [category, setCategory] = useState(getValues("category"));

  const { nextStep } = useTransactions();

  const handleAddCategory = (category: string) => {
    setCategory(category);
    setValue("category", category);
    setValue("subCategory", "");
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <VStack alignItems={"center"} marginTop={"8px"}>
      <Heading fontSize={"2xl"} color={"grayBrand.200"}>
        Selecione a categoria
      </Heading>
      <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
        <FlatList
          data={categories}
          h={"360px"}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FormButton
              onPress={() => handleAddCategory(item.name)}
              variant={index % 2 === 0 ? "primary" : "secondary"}
              icon={item.icon}
              name={item.name}
              selected={category === item.name}
            />
          )}
        />
        <Button
          isDisabled={!getValues("category")}
          onPress={nextStep}
          marginTop={"16px"}
          bg={"violetBrand.700"}
          _text={{
            color: "grayBrand.200",
            bold: true,
          }}
        >
          Avançar
        </Button>
        <Button
          onPress={handleGoBack}
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
        {errors.category ? (
          <Text color={"red.500"}>errors.category.message</Text>
        ) : null}
      </VStack>
    </VStack>
  );
};
