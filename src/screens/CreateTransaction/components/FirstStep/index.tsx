import React from "react";
import { Box, Button, FlatList, Heading, Image, VStack } from "native-base";

import StepOne from "../../../../assets/step1.png";
import { FormButton } from "../FormButton";
import { categories } from "../../../../data/category";

export const FirstStep = () => {
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
        <Image source={StepOne} marginTop={"8px"} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <FormButton
                variant={index % 2 === 0 ? "primary" : "secondary"}
                icon={item.icon}
                key={item.id}
                name={item.name}
                selected={false}
              />
            )}
          />
          <Button
            marginTop={"16px"}
            bg={"violetBrand.700"}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
          >
            Avançar
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
