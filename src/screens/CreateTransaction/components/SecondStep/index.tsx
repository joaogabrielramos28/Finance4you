import React, { useState } from "react";
import { Box, Button, FlatList, Heading, Image, VStack } from "native-base";

import StepTwo from "../../../../assets/step2.png";
import { FormButton } from "../FormButton";
import { categories } from "../../../../data/category";
import { useFormContext } from "react-hook-form";
import { useTransactions } from "../../../../context/TransactionsContext";

export const SecondStep = () => {
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
          Selecione a Subcategoria
        </Heading>
        <Image source={StepTwo} marginTop={"8px"} alt={""} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <FlatList
            data={selectedCategory.subCategories}
            height={"360px"}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <FormButton
                onPress={() => handleAddSubCategory(item.name)}
                variant={index % 2 === 0 ? "primary" : "secondary"}
                name={item.name}
                selected={subcategory === item.name}
                icon={selectedCategory.icon}
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
    </Box>
  );
};
