import React, { useState } from "react";
import {
  Box,
  Button,
  FlatList,
  Heading,
  Image,
  Text,
  VStack,
} from "native-base";

import StepOne from "../../../../assets/step1.png";
import { FormButton } from "../FormButton";
import { categories } from "../../../../data/category";
import { useFormContext } from "react-hook-form";
import { useCreateTransaction } from "../../context/CreateTransactionContext";

export const FirstStep = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [category, setCategory] = useState(getValues("category"));

  const { nextStep } = useCreateTransaction();

  const handleAddCategory = (category: string) => {
    setCategory(category);
    setValue("category", category);
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
          Selecione a categoria
        </Heading>
        <Image source={StepOne} marginTop={"8px"} alt={""} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <FlatList
            data={categories}
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
          {errors.category ? (
            <Text color={"red.500"}>errors.category.message</Text>
          ) : null}
        </VStack>
      </VStack>
    </Box>
  );
};
