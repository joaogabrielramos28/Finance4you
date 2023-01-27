import React, { useState } from "react";
import { Button, FlatList, VStack } from "native-base";
import { useFormContext } from "react-hook-form";

import { FormButton } from "../FormButton";
import { categories } from "@data/category";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import { IStepProps } from "../../types";

export const SecondStep = ({ maxH }: IStepProps) => {
  const { setValue, getValues } = useFormContext();
  const { nextStep, prevStep } = useTransactions();
  const [subcategory, setSubCategory] = useState(getValues("subCategory"));
  const category = getValues("category");
  const selectedCategory = categories.find((item) => item.name === category);

  const handleAddSubCategory = (subcategory: string) => {
    setSubCategory(subcategory);
    setValue("subCategory", subcategory);
  };

  return (
    <VStack alignItems={"center"} marginTop={"8px"}>
      <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
        <FlatList
          data={selectedCategory?.subCategories}
          maxH={maxH}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FormButton
              onPress={() => handleAddSubCategory(item.name)}
              variant={index % 2 === 0 ? "primary" : "secondary"}
              name={item.name}
              selected={subcategory === item.name}
              icon={selectedCategory?.icon}
            />
          )}
        />

        <Button
          isDisabled={!getValues("subCategory")}
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
  );
};
