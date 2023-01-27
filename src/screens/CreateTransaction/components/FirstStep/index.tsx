import React, { useState } from "react";
import { FlatList, Text, VStack } from "native-base";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { FormButton } from "../FormButton";
import { categories } from "@data/category";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import { IStepProps } from "../../types";
import { Button } from "@components/Button";

export const FirstStep = ({ maxH }: IStepProps) => {
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
      <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
        <FlatList
          data={categories}
          maxHeight={maxH}
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
        <Button isDisabled={!getValues("category")} onPress={nextStep}>
          Avançar
        </Button>
        <Button onPress={handleGoBack} variant="outline" marginTop={"16px"}>
          Voltar
        </Button>
        {errors.category ? (
          <Text color={"red.500"}>errors.category.message</Text>
        ) : null}
      </VStack>
    </VStack>
  );
};
